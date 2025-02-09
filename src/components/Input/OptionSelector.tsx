import { ReactNode } from "react";
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
    const handleOptionSelect = (newValue: string) => {
        value = newValue;

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
                            label={option.label}
                            value={option.value}
                            children={option.children}
                            isSelected={value === option.value}
                            onClick={handleOptionSelect}
                        />
                    ))
                }
            </div>
        </InputGroup>
    );
}

function OptionItem({ label, value, children, isSelected, onClick }: OptionItemProps) {
    return (
        <button
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
            type="button"
            onClick={() => {
                onClick && onClick(value)
            }}
        >
            {children}
            {label && <span className="text-sm">{label}</span>}
        </button>
    );
}

export default OptionSelector;