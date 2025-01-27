import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-1 flex">
                <Sidebar />
                <div className="flex-1 bg-zinc-900 border border-solid border-zinc-800 rounded-xl m-1">

                </div>
            </div>
        </div>
    );
}