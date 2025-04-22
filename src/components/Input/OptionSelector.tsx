import { ReactNode, useState } from "react";
import { clsx } from 'clsx';

import { InputGroup } from "./Input";

interface OptionSelectorProps {
    icon?: ReactNode;
    label?: string;
    id?: string;
    name?: string;
    options?: {
        label?: string;
        value: string;
        children?: ReactNode;
    }[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface OptionItemProps {
    id?: string;
    label?: string;
    value: string;
    children?: ReactNode;
    isSelected?: boolean;
    onClick?: (value: string) => void;
}

function OptionSelector({
    icon,
    id,
    name,
    label,
    options,
    value,
    onChange,
}: OptionSelectorProps) {
    const [state, setState] = useState<any>();

    const handleOptionSelect = (newValue: string) => {
        value = newValue;
        setState(newValue);

        if (onChange) {
            const event = {
                currentTarget: {
                    name: name,
                    value: newValue
                }
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            onChange(event);
        }
    }

    return (
        <InputGroup label={label} icon={icon} className="flex flex-col overflow-hidden">
            <div id={id} role="option-selector" className="flex flex-row gap-4 p-4 overflow-scroll">
                {
                    options?.map((option) => (
                        <OptionItem
                            key={option.value}
                            id={option.value}
                            label={option.label}
                            value={option.value}
                            children={option.children}
                            isSelected={option.value == state}
                            onClick={handleOptionSelect}
                        />
                    ))
                }
            </div>
            {/* Hidden input for form submission */}
            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={state || ''}
                />
            )}
        </InputGroup>
    );
}

function OptionItem({ id, label, value, children, isSelected, onClick }: OptionItemProps) {
    return (
        <div
            id={id}
            role="option"
            className={clsx(
                `
                    flex flex-col items-center gap-2
                    p-6
                    rounded-lg border border-solid
                    hover:opacity-50
                    transition duration-500
                    cursor-pointer
                `,
                isSelected ? "border-indigo-600 bg-indigo-600/50" : "border-zinc-200 dark:border-zinc-800"
            )}
            onClick={() => {
                onClick && onClick(value)
            }}
        >
            {children}
            {label && <span className="text-sm">{label}</span>}
        </div>
    );
}

export default OptionSelector;