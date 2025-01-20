export default function AnimBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-zinc-100 dark:bg-black">
                <div className="absolute inset-0 opacity-20">
                    <div className="
                        absolute top-0 -left-1/4 w-1/2 h-1/2
                        bg-gradient-to-br
                        from-black dark:from-zinc-700
                        to-transparent
                        rounded-full blur-3xl
                        animate-blob animate-pulse
                    " />
                    <div className="
                        absolute top-1/2 -right-1/4 w-1/2 h-1/2
                        bg-gradient-to-bl
                        from-zinc-800 dark:from-zinc-500
                        to-transparent
                        rounded-full blur-3xl
                        animate-blob animate-pulse animate-delay-2000
                    " />
                    <div className="
                        absolute -bottom-1/4 left-1/4 w-1/2 h-1/2
                        bg-gradient-to-tr
                        from-zinc-950 dark:from-zinc-600
                        to-transparent
                        rounded-full blur-3xl
                        animate-blob animate-pulse animate-delay-4000
                    " />
                </div>
            </div>
        </div>
    );
}