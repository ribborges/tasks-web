import TaskList from "@/components/TaskList";
import { Blanckspace } from "@/components/Separator";

export default function DashboardPage() {
    return (
        <div className="box-border h-full w-full p-4 overflow-auto">
            <TaskList />
            <Blanckspace className="lg:hidden" space={68} />
        </div>
    );
}