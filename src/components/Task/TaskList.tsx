import { TaskCard } from "./";
import { Loading } from "@/components/Loading";
import { TaskSchema } from "@/types/task";

export default function TaskList({ tasks }: { tasks: TaskSchema[] }) {
    return (
        !tasks ? <Loading /> :
            <div className="flex flex-col w-full gap-2">
                {
                    tasks.map((task, index) => (
                        <TaskCard key={index} taskID={task.id} />
                    ))
                }
            </div>
    );
}