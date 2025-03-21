import { ArrowRepeat } from "react-bootstrap-icons";

function Loading() {
    return (
        <div className="flex flex-col gap-24 justify-center items-center bg-white dark:bg-black h-screen w-screen z-2">
            <img className="w-28 h-28" src="/icon.png" alt="Tasks logo" />
            <Spinner />
        </div>
    );
}

function Spinner() {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-solid border-zinc-800 dark:border-zinc-200 m-12" />
        </div>
    );
}

export { Loading, Spinner };