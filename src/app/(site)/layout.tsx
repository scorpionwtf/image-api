import { auth } from "@/auth";
import { Navbar } from "@/components/site/navbar";
import { prisma } from "@/lib/db";
import { $Enums } from "@prisma/client";

export default async function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {   
    const session = await auth(); // Or getSession from next-auth
    let isProUser = false; // Change 'const' to 'let' to allow reassignment

    if (session?.user?.id) {
        try {
            // Fetch user information from the database
            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
            });

            // Check if the user plan is 'PRO'
            isProUser = user?.plan === $Enums.UserPlan.PRO; // No 'const' here
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle the error as needed, such as redirecting or showing a message
        }
    }

    return (
        <>
            <Navbar session={session} isProUser={isProUser} />
            {children}
        </>
    );
}

