import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import clsx from "clsx";
import { Noto_Sans } from 'next/font/google';

import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";

import "@/styles/global.css";

const notoSans = Noto_Sans({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false
});

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
            <body className={clsx("bg-white dark:bg-black text-zinc-950 dark:text-zinc-100", notoSans.className)}>
                <ModalProvider>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </ModalProvider>
                <Analytics />
            </body>
        </html>
    );
}