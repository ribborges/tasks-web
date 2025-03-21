import Anchor from "@/components/Anchor";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="
                text-xs
                flex items-center justify-center
                bg-zinc-200/50 dark:bg-zinc-900/50
                border border-solid rounded-4xl border-zinc-300/50 dark:border-zinc-800/50
                p-4 md:p-6 lg:p-8 m-4
            "
        >
            <p className="text-center text-xs md:text-sm lg:text-base">
                {`Developed by: `}
                <Anchor href='https://www.linkedin.com/in/ribborges/' target={'_blank'}>Richard de Carvalho Borges</Anchor>
                {` with `}
                <Anchor href='https://nextjs.org/' target={'_blank'}>Next.js</Anchor>{`, `}
                <Anchor href='https://zustand-demo.pmnd.rs/' target={'_blank'}>Zustand</Anchor>{`, `}
                <Anchor href="https://www.typescriptlang.org/" target={'_blank'}>TypeScript</Anchor>
                {` and `}
                <Anchor href='https://tailwindcss.com/' target={'_blank'}>TailwindCSS</Anchor>
                {` | `}
                {currentYear}
            </p>
        </footer>
    );
}