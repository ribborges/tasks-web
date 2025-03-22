import clsx from "clsx";
import { XLg } from "react-bootstrap-icons";

interface ToastProps {
    closeBtn: () => void,
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info',
    visible: boolean,
}

export default function Toast(props: ToastProps) {
    return (
        <div className="fixed z-50 flex items-end justify-center w-full h-full pointer-events-none">
            <div
                className={clsx(
                    `
                        m-6 overflow-hidden
                        p-4
                        border border-solid rounded-xl
                        transition duration-500
                    `,
                    props.visible ? 'opacity-100 pointer-events-auto' : 'opacity-0',
                    props.type === 'success' ? 'border-green-800' :
                        props.type === 'error' ? 'border-red-800' :
                            props.type === 'warning' ? 'border-yellow-800' :
                                props.type === 'info' ? 'border-blue-800' :
                                    "border-zinc-300 dark:border-zinc-800",
                    props.type === 'success' ? 'bg-green-600' :
                        props.type === 'error' ? 'bg-red-600' :
                            props.type === 'warning' ? 'bg-yellow-600' :
                                props.type === 'info' ? 'bg-blue-600' :
                                    "bg-zinc-200 dark:bg-zinc-900"
                )}
            >
                <div className={clsx(
                    "w-full h-full flex justify-between items-center gap-4",
                    props.type === 'info' ? 'text-blue-200' :
                        props.type === 'success' ? 'text-green-200' :
                            props.type === 'error' ? 'text-red-200' :
                                props.type === 'warning' ? 'text-yellow-200' :
                                    "text-zinc-800 dark:text-zinc-200"
                )}>
                    <span className="cursor-default">
                        {props.message}
                    </span>
                    <button
                        className="hover:opacity-50 transition duration-500 cursor-pointer"
                        type="button"
                        onClick={() => props.closeBtn()}
                    >
                        <XLg />
                    </button>
                </div>
            </div>
        </div>
    )
}