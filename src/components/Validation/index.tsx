export default function Validation({ error }: { error: Array<string> | string | undefined }) {
    if (error) return (
        <span className="text-red-500">{error}</span>
    );
    else return null;
}