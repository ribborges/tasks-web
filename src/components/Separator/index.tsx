import classConcat from "@/utils/classConcat";

interface SeparatorProps {
    space?: number;
    vertical?: boolean;
    className?: string;
}

function Spacer({ space = 120, vertical, className }: SeparatorProps) {
    return <hr
        style={ vertical? { marginRight: `${space / 2}px`, marginLeft: `${space / 2}px` } : { marginTop: `${space / 2}px`, marginBottom: `${space / 2}px` }}
        className={classConcat(
            "box-border border-solid border-zinc-500/50",
            vertical ? "h-full border-r" : "w-full border-t",
            className || ""
        )}/>;
}
2
function Blanckspace({ space = 60, vertical, className }: SeparatorProps) {
    return <hr
        style={ vertical? { width: `${space}px` } : { height: `${space}px` }}
        className={classConcat(
            "border-none",
            className || ""
        )}
    />;
}

export { Spacer, Blanckspace };