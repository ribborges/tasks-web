import { PersonFill } from "react-bootstrap-icons";

import classConcat from "@/utils/classConcat";
import Loading from "@/components/Loading";

interface ProfilePicProps {
    className?: string;
    alt?: string;
    src?: string;
    loading?: boolean;
}

export default function ProfilePic({ className = "h-10 w-10", alt, src, loading = true }: ProfilePicProps) {
    return (
        <div className={classConcat(
            `
                flex items-center justify-center
                overflow-hidden
                border-2 border-solid rounded-full
                bg-zinc-300 dark:bg-zinc-800
                border-zinc-400 dark:border-zinc-700
            `, className
        )}>
            {
                loading ?
                    <Loading /> :
                    src ?
                        <img
                            src={src}
                            alt={alt}
                        /> :
                        <PersonFill className="h-4/6 w-4/6 text-zinc-500" />
            }
        </div>
    );
}