import type { Metadata } from "next";
import { Poppins } from 'next/font/google';

import "@/styles/global.css";
import ModalProvider from "@/providers/Modal";

const poppins = Poppins({ weight: ["300", "400", "500", "700"], subsets: ["latin"], display: "swap", adjustFontFallback: false });

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
            <body className={`text-zinc-950 dark:text-zinc-100 ${poppins.className}`}>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </body>
        </html>
    );
}