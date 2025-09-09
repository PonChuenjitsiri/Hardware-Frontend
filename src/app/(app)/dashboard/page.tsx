import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";


export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <Section
                title="Overview"
                actions={<Button variant="secondary">Download report</Button>}
            >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Stat label="Orders" value={128} hint="Last 24 hours" />
                    <Stat label="Revenue" value="$18,420" hint="Last 24 hours" />
                    <Stat label="Pending" value={23} />
                    <Stat label="Inventory alerts" value={5} />
                </div>
            </Section>


            <Section title="Quick actions" actions={<Button>New order</Button>}>
                <Card>
                    <CardContent>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="secondary">Import CSV</Button>
                            <Button variant="secondary">Add product</Button>
                            <Button variant="ghost">Manage users</Button>
                        </div>
                    </CardContent>
                </Card>
            </Section>


            <Section title="Recent activity">
                <Table
                    title="Latest orders"
                    columns={["Order #", "Customer", "Total", "Status"]}
                    rows={[
                        ["SO-1045", "Acme Inc.", "$1,240", "Shipped"],
                        ["SO-1044", "Globex", "$980", "Processing"],
                        ["SO-1043", "Wayne", "$4,210", "Pending"],
                    ]}
                />
            </Section>
        </div>
    );
}