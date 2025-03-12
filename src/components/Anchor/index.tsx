import { AnchorHTMLAttributes } from "react";

export default function Anchor({ className = "text-indigo-500 hover:text-indigo-700 transition duration-500", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            className={className}
            {...props}
        >
            {props.children}
        </a>
    );
}