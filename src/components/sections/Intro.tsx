import Container from "@/components/ui/Container";

const features = [
  { title: "Developer", desc: "speaking date time 9/9/2568 18.30 About Develop" },
  { title: "Inventory", desc: "speaking date time 9/9/2568 18.30 About Develop" },
  { title: "Work orders", desc: "speaking date time 9/9/2568 18.30 About Develop" },
  { title: "Traceability", desc: "speaking date time 9/9/2568 18.30 About Develop" },
];

export default function Intro() {
  return (
    <section id="about" className="py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">What is HardwareLab OhAuoD?</h2>
          <p className="mt-3 text-gray-600">
            P P Cha Ma Char Prasob Karn How to Work Na
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
