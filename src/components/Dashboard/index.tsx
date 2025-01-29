import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="flex-1 flex overflow-hidden flex-col-reverse lg:flex-row">
                <Navbar />
                <div className="flex-1 bg-zinc-200 dark:bg-zinc-900 border border-solid border-zinc-300 dark:border-zinc-800 rounded-xl m-0.5 lg:m-1 overflow-hidden">

                </div>
            </div>
        </div>
    );
}