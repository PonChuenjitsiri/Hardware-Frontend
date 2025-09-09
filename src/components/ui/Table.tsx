import { Card, CardHeader } from "./Card";


export default function Table({ title, columns, rows }: { title: string; columns: string[]; rows: Array<(string | number)[]> }) {
    return (
        <Card>
            <CardHeader title={title} />
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-500">
                            {columns.map((c) => (
                                <th key={c} className="px-3 py-2 font-medium">{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i} className="border-t">
                                {r.map((cell, j) => (
                                    <td key={j} className="px-3 py-2">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}