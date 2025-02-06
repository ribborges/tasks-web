import { clsx } from 'clsx';

import { addDays, removeDate, removeTime, subtractDays } from "@/utils/formatDate";

interface DateSelectorProps {
    id?: string;
    name?: string;
    label?: string;
    value?: Date;
    locale?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface DateProps {
    year: string;
    month: string;
    day: string;
    weekday: string;
}

export default function DateSelector({ id, name, label, value = new Date(2026, 11, 30), locale = 'en-US', onChange }: DateSelectorProps) {
    const handleChange = (newValue: Date) => {
        value = newValue;

        if (onChange) {
            const event = {
                currentTarget: {
                    name: name,
                    value: newValue.toISOString(),
                    valueAsDate: new Date(newValue)
                }
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            onChange(event);
        }
    };

    return (
        <div id={id} className="flex flex-col items-center gap-2">
            {label ? <label htmlFor={id} className="text-sm">{label}</label> : <></>}
            <div className="flex gap-2">
                <Day
                    onClick={() => handleChange(subtractDays(value, 2))}
                    date={{
                        year: subtractDays(value, 2).toLocaleDateString(locale, { year: 'numeric' }),
                        month: subtractDays(value, 2).toLocaleDateString(locale, { month: 'long' }),
                        day: subtractDays(value, 2).toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: subtractDays(value, 2).toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
                <Day
                    onClick={() => handleChange(subtractDays(value, 1))}
                    date={{
                        year: subtractDays(value, 1).toLocaleDateString(locale, { year: 'numeric' }),
                        month: subtractDays(value, 1).toLocaleDateString(locale, { month: 'long' }),
                        day: subtractDays(value, 1).toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: subtractDays(value, 1).toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
                <Day selected={true}
                    onClick={() => handleChange(value)}
                    date={{
                        year: value.toLocaleDateString(locale, { year: 'numeric' }),
                        month: value.toLocaleDateString(locale, { month: 'long' }),
                        day: value.toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: value.toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
                <Day
                    onClick={() => handleChange(addDays(value, 1))}
                    date={{
                        year: addDays(value, 1).toLocaleDateString(locale, { year: 'numeric' }),
                        month: addDays(value, 1).toLocaleDateString(locale, { month: 'long' }),
                        day: addDays(value, 1).toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: addDays(value, 1).toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
                <Day
                    onClick={() => handleChange(addDays(value, 2))}
                    date={{
                        year: addDays(value, 2).toLocaleDateString(locale, { year: 'numeric' }),
                        month: addDays(value, 2).toLocaleDateString(locale, { month: 'long' }),
                        day: addDays(value, 2).toLocaleDateString(locale, { day: '2-digit' }),
                        weekday: addDays(value, 2).toLocaleDateString(locale, { weekday: 'short' })
                    }}
                />
            </div>
            <input
                className="
                    border-2 border-solid rounded-3xl p-1 text-xs
                    border-zinc-400 dark:border-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-700
                    transition duration-500
                    outline-4 outline-none outline-offset-0 outline-purple-700/0 focus:outline-indigo-500/50
                    cursor-pointer
                "
                onChange={(e) => {
                    if (e.currentTarget.valueAsDate) {
                        handleChange(new Date(removeTime(e.currentTarget.valueAsDate.toISOString()) + 'T' + removeDate(value.toISOString())));
                    }
                }}
                value={removeTime(value.toISOString())}
                type="date"
            />
        </div>
    );
}

function Day({ date, onClick, selected }: { date: DateProps, onClick?: () => void, selected?: boolean }) {
    return (
        <button type="button" className={clsx(
            `
                flex-1 flex flex-col items-center gap-2
                p-4
                rounded-3xl
                transition duration-500
            `, selected ? 'bg-indigo-500' :
            `hover:opacity-50`
        )} onClick={onClick}>
            <div className="text-xs first-letter:uppercase">{date.month}</div>
            <div className="font-bold text-2xl">{date.day}</div>
            <div className="text-xs first-letter:uppercase">{date.weekday}</div>
        </button>
    );
}