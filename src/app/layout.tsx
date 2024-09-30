import type { Metadata } from "next";
import Head from 'next/head';
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/site/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AI Image Upscaler | Upscale Your Images Free Online",
	description: "Upscale your images online for free using the latest AI technology. Fast, secure, and up to 8x resolution!",
	
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="pt-BR">
			<body className={inter.className + ' overflow-x-clip'} suppressHydrationWarning>
				<SessionProvider session={session}>
				
					
						{children}

				</SessionProvider>
			</body>
		</html>
	);
}
