import AnimBackground from "@/components/AnimBackground";
import Footer from "@/components/Footer";

export default function AuthPage({ children }: { children?: React.ReactNode }) {
    return (
        <div className="
                h-screen w-screen
                flex justify-between items-center flex-col
                box-border
            ">
            <AnimBackground />
            <div className="
                relative
                overflow-hidden
                flex flex-col gap-2
                w-10/12 md:w-8/12 lg:w-4/12
                bg-zinc-400 bg-opacity-50 dark:bg-zinc-800 dark:bg-opacity-50
                border border-solid border-zinc-500 border-opacity-50 dark:border-zinc-700 dark:border-opacity-50
                p-4 m-4 lg:p-8 lg:m-8
                rounded-2xl
                shadow-xl shadow-black/10 dark:shadow-white/10
            ">
                {children}
            </div>
            <Footer />
        </div>
    );
}