import Footer from "@/components/Footer";
import { Spacer } from "@/components/Separator";
import { H3 } from "@/components/Heading";
import Anchor from "@/components/Anchor";

export default function Settings() {
    return (
        <div className="flex flex-1 flex-col justify-between gap-4 p-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <H3>About</H3>
                    <div className="flex items-center gap-4">
                        <img className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" src="/icon.png" alt="Tasks logo" />
                        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-500">Tasks</span>
                    </div>
                    <span>This  is a free and open source project ❤️</span>
                    <span>Backend source: <Anchor href="https://github.com/ribborges/tasks-api" target={'_blank'}>Github</Anchor></span>
                    <span>WebApp source: <Anchor href="https://github.com/ribborges/tasks-web" target={'_blank'}>Github</Anchor></span>
                    <span>Licensed under: <Anchor href="https://www.mozilla.org/en-US/MPL/2.0/" target={'_blank'}>Mozilla Public License v2.0</Anchor></span>
                </div>
            </div>
            <div>
                <Spacer space={0} />
                <Footer />
            </div>
        </div>
    );
}