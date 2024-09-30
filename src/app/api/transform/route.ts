import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { auth } from '@/auth';
import sharp from 'sharp'; // Use sharp for image processing, like getting resolution
import { $Enums } from '@prisma/client';

export const POST = async (req: NextRequest) => {
  try {
    // Get the authenticated session
    const session = await auth();

    // Parse the incoming form data for the file
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    // Check if file exists
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert the Blob to a Buffer for further processing
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get image dimensions (resolution) using sharp
    const { width, height } = await sharp(buffer).metadata();

    // Validate if width and height are undefined or invalid
    if (!width || !height) {
      return NextResponse.json({ error: 'Invalid image dimensions' }, { status: 400 });
    }

    // Get the 'Zoom-Level' header and assign it to the upscaleFactor variable
    const zoomLevelHeader = req.headers.get('Zoom-Level');
    const upscaleFactor = zoomLevelHeader ? parseInt(zoomLevelHeader, 10) : 2;  // Default to 2 if header is missing

    // Validate the upscaleFactor based on user type (free or pro)
    const allowedUpscaleFactors = [2, 4]; // Default allowed for free users
    let isProUser = false;
    let maxAllowedResolution = 4000; // Default for free users

    if (session && session.user && session.user.id) {
      // User is authenticated, check their plan
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Check if user is Pro
      isProUser = user.plan === $Enums.UserPlan.PRO;

      // Allow upscaleFactor 8 for Pro users and increase max resolution
      if (isProUser) {
        allowedUpscaleFactors.push(8);
        maxAllowedResolution = 16000; // Limit for Pro users
      }
    }

    // Ensure the upscaleFactor is allowed
    if (!allowedUpscaleFactors.includes(upscaleFactor)) {
      return NextResponse.json({ error: 'Invalid upscale factor for your plan' }, { status: 403 });
    }

    // Check if the image resolution exceeds the allowed resolution based on the user's plan
    if (width > maxAllowedResolution || height > maxAllowedResolution) {
      return NextResponse.json({
        error: `Image resolution exceeds the allowed limit for your plan. Maximum allowed resolution is ${maxAllowedResolution}x${maxAllowedResolution}px.`,
      }, { status: 403 });
    }

    // Convert to Base64 after validation
    const base64Image = buffer.toString('base64');

    // Send the request to the external Python API with the correct upscale factor
    const response = await axios.post(
      `${process.env.AI_API_URL}/transform`,
      {
        userId: session?.user?.id || 'anonymous', // Use anonymous if unauthenticated
        transformationType: 'upscale',
        upscale_factor: upscaleFactor,  // Use the dynamic upscaleFactor
        imageData: base64Image,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.AI_API_KEY,
        },
      }
    );

    // Decrement credits if user is authenticated and free (not pro)
    if (response.status === 200 && session && session.user && !isProUser) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });
    }

    // Send the transformed data back to the client
    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
