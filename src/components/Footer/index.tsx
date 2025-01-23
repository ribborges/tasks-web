export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="
            flex items-center justify-center
            bg-zinc-400 bg-opacity-50 dark:bg-zinc-800 dark:bg-opacity-50
            border border-solid border-zinc-500 border-opacity-50 dark:border-zinc-700 dark:border-opacity-50
            rounded-lg
            p-4 md:p-8 lg:p-10 m-5
            hover:scale-95
            transition duration-500
        ">
            <p className="text-center text-xs md:text-sm lg:text-base">
                {`Developed by: `}
                <a href='https://www.linkedin.com/in/ribborges/' target={'_blank'}>Richard de Carvalho Borges</a>
                {` with `}
                <a href='https://nextjs.org/' target={'_blank'}>Next.js</a>{`, `}
                <a href='https://zustand-demo.pmnd.rs/' target={'_blank'}>Zustand</a>{`, `}
                <a href="https://www.typescriptlang.org/" target={'_blank'}>TypeScript</a>
                {` with `}
                <a href='https://tailwindcss.com/' target={'_blank'}>TailwindCSS</a>
                {` | `}
                {currentYear}
            </p>
        </footer>
    );
}