import { ReactNode, HTMLAttributes } from 'react';

import classConcat from '@/utils/classConcat';

interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "col";
    justify?: "center" | "between" | "around" | "start" | "end" | "evenly" | "stretch";
    items?: "center" | "start" | "end" | "stretch" | "baseline";
    wrap?: "wrap" | "nowrap";
    gap?: string;
    children?: ReactNode;
}

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
    template?: string;
    gap?: string;
    children?: ReactNode;
}

function FlexContainer({
    direction = "row",
    justify = "center",
    items = "center",
    wrap = "wrap",
    gap = "0",
    children,
    ...props
}: FlexContainerProps) {
    return <div className={
        classConcat("flex", props.className || '', `flex-${direction} justify-${justify} items-${items} flex-wrap-${wrap} gap-${gap}`)
    } {...props}>{children}</div>;
}

function GridContainer({
    template = "grid-cols-1 md:grid-cols-2  lg:grid-cols-3",
    gap = "4",
    children,
    ...props
}: GridContainerProps) {
    return <div className={
        classConcat("grid", props.className || '', `gap-${gap}`, template)
    } {...props}>{children}</div>;
}

export { FlexContainer, GridContainer };
export type { FlexContainerProps, GridContainerProps };