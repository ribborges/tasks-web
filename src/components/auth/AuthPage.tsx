import AnimBackground from "../AnimBackground";

export default function AuthPage({ children }: { children?: React.ReactNode }) {
    return (
        <div className="
                h-screen w-screen
                flex justify-center items-center
            ">
            <AnimBackground />
            <div className="
                relative
                overflow-hidden
                flex flex-col gap-2
                w-11/12 md:w-8/12 lg:w-4/12
                bg-zinc-200 dark:bg-zinc-950
                border border-solid border-zinc-300 dark:border-zinc-900
                p-8
                rounded-2xl
                shadow-xl shadow-black/10 dark:shadow-white/10
            ">
                {children}
            </div>
        </div>
    );
}