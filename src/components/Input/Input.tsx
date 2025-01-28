'use client';

import { ReactNode, useState } from 'react';

import classConcat from '@/utils/classConcat';
import { Check, CircleFill, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

interface inputGroupProps {
    className?: string,
    icon?: ReactNode,
    label?: string,
    labelInside?: boolean,
    htmlFor?: string,
    children?: ReactNode
}

interface inputProps {
    disabled?: boolean,
    type?: React.HTMLInputTypeAttribute | "textarea" | "option",
    id?: string,
    name?: string,
    onChange?: any,
    pattern?: string,
    minLength?: number,
    accept?: string,
    value?: string,
    className?: string,
    icon?: ReactNode,
    placeholder?: string,
    label?: string,
    children?: ReactNode,
}

const inputStyle = `
    p-2 lg:p-4 h-auto
    bg-transparent
    rounded-xl
    outline-4 outline-none outline-offset-0 outline-purple-700/0 focus:outline-purple-700/50
    transition duration-500
`;

function InputGroup(props: inputGroupProps) {
    return (
        <div className="flex flex-col">
            {
                props.label && !props.labelInside ?
                    <label htmlFor={props.htmlFor} className="ml-2 font-bold">
                        {props.label}
                    </label> : <></>
            }
            <div className={classConcat(
                props.className || "",
                `
                m-1
                relative
                flex flex-nowrap items-stretch flex-1
                w-auto h-auto
                box-border
                rounded-xl border-2 border-solid border-zinc-400 dark:border-zinc-700
                hover:shadow-2xl focus:shadow-2xl
                hover:shadow-zinc-950/20 focus:shadow-zinc-950/20
                dark:hover:shadow-zinc-200/20 dark:focus:shadow-zinc-200/20
                transition duration-500
                `
            )}>
                <div className="flex gap-2 items-center p-2 lg:p-4">
                    {
                        props.icon ?
                            <div>
                                {props.icon}
                            </div> : <></>
                    }
                    {
                        props.label && props.labelInside ?
                            <label htmlFor={props.htmlFor} className="ml-2 font-bold">
                                {props.label}
                            </label> : <></>
                    }
                </div>
                {props.children}
            </div>
        </div>
    );
}

function Input(props: inputProps) {
    const [showPassword, setShowPassword] = useState(false);

    switch (props.type) {
        case "textarea":
            return (
                <InputGroup htmlFor={props.id} className="flex-col" icon={props.icon} label={props.label}>
                    <textarea
                        className={inputStyle}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                    />
                </InputGroup>
            );
            break;

        case "checkbox":
            return (
                <div className='flex items-center gap-2'>
                    <input
                        className="
                            appearance-none
                            relative peer
                            shrink-0
                            m-1
                            w-6 h-6
                            border-2 border-solid rounded-lg
                            bg-transparent
                            border-zinc-400 dark:border-zinc-700
                            hover:shadow-2xl focus:shadow-2xl
                            hover:shadow-zinc-950/20 focus:shadow-zinc-950/20
                            dark:hover:shadow-zinc-200/20 dark:focus:shadow-zinc-200/20
                            hover:bg-zinc-400 dark:hover:bg-zinc-700
                            checked:bg-purple-800 checked:border-purple-950 hover:checked:bg-purple-950
                        "
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                        disabled={props.disabled}
                    />
                    <Check className='absolute w-6 h-6 m-[6px] self-center hidden peer-checked:block pointer-events-none' />
                    {
                        props.icon ?
                            <div>
                                {props.icon}
                            </div> : <></>
                    }
                    {
                        props.label ?
                            <label htmlFor={props.id} className="pointer-events-none">
                                {props.label}
                            </label> : <></>
                    }
                </div>
            );
            break;

        case "radio":
            return (
                <div className='flex items-center gap-2'>
                    <input
                        className="
                            appearance-none
                            relative peer
                            shrink-0
                            m-1
                            w-6 h-6
                            border-2 border-solid rounded-full
                            bg-transparent
                            border-zinc-400 dark:border-zinc-700
                            hover:shadow-2xl focus:shadow-2xl
                            hover:shadow-zinc-950/20 focus:shadow-zinc-950/20
                            dark:hover:shadow-zinc-200/20 dark:focus:shadow-zinc-200/20
                            hover:bg-zinc-400 dark:hover:bg-zinc-700
                            checked:bg-purple-800 checked:border-purple-950 hover:checked:bg-purple-950
                        "
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                        disabled={props.disabled}
                    />
                    <CircleFill className='absolute w-3 h-3 m-[12px] self-center hidden peer-checked:block pointer-events-none' />
                    {
                        props.icon ?
                            <div>
                                {props.icon}
                            </div> : <></>
                    }
                    {
                        props.label ?
                            <label htmlFor={props.id} className="pointer-events-none">
                                {props.label}
                            </label> : <></>
                    }
                </div>
            );
            break;

        case "range":
            return (
                <InputGroup htmlFor={props.id} icon={props.icon} label={props.label}>
                    <div>
                        <input
                            className={inputStyle}
                            type={props.type}
                            id={props.id}
                            name={props.name}
                            value={props.value}
                            onChange={props.onChange}
                            disabled={props.disabled}
                        />
                    </div>
                </InputGroup>
            );
            break;

        case "option":
            return (
                <InputGroup htmlFor={props.id} icon={props.icon} label={props.label}>
                    <select className={classConcat(inputStyle, "w-full")} id={props.id} name={props.name} value={props.value} onChange={props.onChange}>
                        {props.children}
                    </select>
                </InputGroup>
            );
            break;

        case "password":
            return (
                <InputGroup htmlFor={props.id} className={props.className} icon={props.icon} label={props.label}>
                    <input
                        className={classConcat(inputStyle, "w-full")}
                        type={showPassword ? "text" : "password"}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        pattern={props.pattern}
                        minLength={props.minLength}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                    />
                    <button className="p-4 hover:opacity-50 transition duration-500" type='button' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeFill /> : <EyeSlashFill />}
                    </button>
                </InputGroup>
            );
            break;

        default:
            return (
                <InputGroup htmlFor={props.id} className={props.className} icon={props.icon} label={props.label}>
                    <input
                        className={classConcat(inputStyle, "w-full")}
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        pattern={props.pattern}
                        accept={props.accept}
                        minLength={props.minLength}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                    />
                </InputGroup>
            );
            break;
    }
}

export { Input, InputGroup };