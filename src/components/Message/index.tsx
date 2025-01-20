'use client';

import { useEffect, useState } from "react";
import { XLg } from "react-bootstrap-icons";

import classConcat from "@/utils/classConcat";

interface MessageProps {
    message: string;
    type: "error" | "success" | "info" | "warning";
}

export default function Message({ message, type }: MessageProps) {
    const [show, setShow] = useState(false);

    const onClose = () => {
        message = "";
        setShow(false);
    };

    useEffect(() => {
        if (message && message !== "") {
            setShow(true);
        }
    }, [message]);

    return (
        <div className={classConcat(
            "p-4 rounded-md border-2 border-solid gap-2",
            type === "error" ? "border-red-700 bg-red-500" :
                type === "success" ? "border-green-700 bg-green-500" :
                    type === "info" ? "border-blue-700 bg-blue-500" :
                        type === "warning" ? "border-yellow-700 bg-yellow-500" :
                            "border-gray-600 bg-gray-500",
            show ? "flex" : "hidden"
        )}>
            <span className="flex-1">{message}</span>
            <button className="rounded-full p-1 hover:bg-white/50 transition duration-500" type="button" onClick={onClose}><XLg /></button>
        </div>
    );
}