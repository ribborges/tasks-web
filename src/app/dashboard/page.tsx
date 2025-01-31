import { House } from "react-bootstrap-icons";

import { TaskList } from "@/components/Task";
import { Blanckspace } from "@/components/Separator";

export default function DashboardPage() {
    return (
        <>
            <div className="p-4 border-b border-solid border-b-zinc-500/20">
                <h2 className="flex items-center gap-6"><House /> Tasks</h2>
            </div>
            <div className="box-border w-full p-4 overflow-auto">
                <TaskList />
                <Blanckspace className="lg:hidden" space={68} />
            </div>
        </>
    );
}