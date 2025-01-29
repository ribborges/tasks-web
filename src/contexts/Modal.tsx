import { createContext, ReactNode } from "react";

export interface ModalProps {
    title?: string,
    content?: ReactNode
}

export interface ModalContextProps {
    show: (props: ModalProps) => void,
    hide: () => void
}

export const defaultValue: ModalContextProps = {
    show: () => {
        throw new Error('showDialog function is not implemented');
    },
    hide: () => {
        throw new Error('hideDialog function is not implemented');
    }
}

const ModalContext = createContext(defaultValue);

export default ModalContext;