import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirect({ path }: { path: string }) {
    const router = useRouter();

    useEffect(() => {
        router.push(path);
    }, [path, router]);

    return <main className="w-screen h-screen bg-white dark:bg-black" />;
}