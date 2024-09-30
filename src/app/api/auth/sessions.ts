// pages/api/auth/session.ts
import { auth } from '@/auth';
import { NextApiRequest, NextApiResponse } from 'next';
 // Adjust this import to match your auth configuration

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await auth(req, res);
    if (session) {
      res.status(200).json(session);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
