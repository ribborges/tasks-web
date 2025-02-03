import { Collection } from "react-bootstrap-icons";

import Title from "@/components/Title";

export default function NoCategoryPage() {
    return (
        <>
            <Title>
                <Collection /> Category
            </Title>
            <div className="flex flex-col gap-4 box-border w-full p-4 overflow-auto">
                <span className="text-center text-lg text-gray-500/60">
                    No category selected
                </span>
            </div>
        </>
    );
}