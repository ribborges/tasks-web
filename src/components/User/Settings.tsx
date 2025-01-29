import { MoonStars } from "react-bootstrap-icons";

import Footer from "@/components/Footer";
import { Spacer } from "@/components/Separator";
import { Button, Input } from "@/components/Input";

export default function Settings() {
    return (
        <div className="flex flex-col gap-4">
            <form className="flex flex-col gap-2">
                <Input icon={<MoonStars />} label="Dark theme" type="checkbox" />
                <div className="flex justify-end">
                    <Button type="submit">Save</Button>
                </div>
            </form>
            <Spacer space={0} />
            <div className="flex flex-col gap-2">
                <h3>About</h3>
                <div className="flex items-center gap-4">
                    <img className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" src="/icon.png" alt="Tasks logo" />
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-500">Tasks</h1>
                </div>
                <span>This  is a free and open source project ❤️</span>
                <span>Backend source: <a href="https://github.com/ribborges/tasks-api">Github</a></span>
                <span>WebApp source: <a href="https://github.com/ribborges/tasks-web">Github</a></span>
                <span>Licensed under: <a href="https://www.mozilla.org/en-US/MPL/2.0/">Mozilla Public License v2.0</a></span>
            </div>
            <Spacer space={0} />
            <Footer />
        </div>
    );
}