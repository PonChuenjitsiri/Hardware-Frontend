import { Card } from "./Card";


export default function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
    return (
        <Card>
            <div className="space-y-1">
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-2xl font-semibold">{value}</div>
                {hint && <div className="text-xs text-gray-400">{hint}</div>}
            </div>
        </Card>
    );
}