'use client';

import { useState } from "react";
import { Calendar } from "react-bootstrap-icons";

import { TaskList } from "@/components/Task";
import { Blanckspace } from "@/components/Separator";
import Title from "@/components/Title";
import { useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";
import DateSelector from "@/components/Input/DateSelector";
import { removeTime } from "@/utils/formatDate";

export default function CalendarPage() {
    const [date, setDate] = useState(new Date());
    const { tasks } = useTaskStore();

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.valueAsDate) {
            setDate(e.currentTarget.valueAsDate);
        }
    }

    return (
        <>
            <Title>
                <Calendar /> Your calendar
            </Title>
            <div className="flex flex-col gap-4 box-border w-full p-4 overflow-auto">
                <DateSelector locale='en-US' label="Date" onChange={handleDateChange} value={date} />
                <TaskList
                    tasks={
                        tasks.filter(task => task.dueDate && removeTime(task.dueDate) === removeTime(date.toISOString()) && task.status !== "completed")
                    }
                />
                <Collapse title="Completed">
                    <TaskList
                        tasks={
                            tasks.filter(task => task.dueDate && removeTime(task.dueDate) === removeTime(date.toISOString()) && task.status === "completed")
                        }
                    />
                </Collapse>
                <Blanckspace className="lg:hidden" space={68} />
            </div>
        </>
    );
}