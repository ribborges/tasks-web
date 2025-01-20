import type { Metadata } from "next";
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({ weight: ["300", "400", "500", "700"], subsets: ["latin"], display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
    title: "Tasks App",
    description: "Create and manage your tasks"
}

// import "../styles/global.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`text-zinc-950 dark:text-zinc-100 ${ubuntu.className}`}>
                {children}
            </body>
        </html>
    );
}