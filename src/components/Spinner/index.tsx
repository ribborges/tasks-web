import { SlashCircleFill } from "react-bootstrap-icons";

export default function Spinner() {
    return (
        <div className="absolute backdrop-blur-sm flex justify-center items-center h-full w-full z-10">
            <SlashCircleFill className="animate-spin text-4xl text-purple-800" />
        </div>
    );
}