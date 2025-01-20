import type { Metadata } from "next";
import { Ubuntu } from 'next/font/google';

import UserProvider from "@/providers/UserProvider";

import "@/styles/global.css";

const ubuntu = Ubuntu({ weight: ["300", "400", "500", "700"], subsets: ["latin"], display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
    title: "Tasks App",
    description: "Create and manage your tasks"
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`text-zinc-950 dark:text-zinc-100 ${ubuntu.className}`}>
                <UserProvider>
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}