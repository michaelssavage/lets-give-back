import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

const services = [
  {
    title: "Community Projects",
    description: "Bringing people together through hands-on projects",
  },
  {
    title: "Mobile Coffee Truck",
    description: "Serving coffee and community",
  },
  {
    title: "Community Gardens",
    description: "Transforming spaces into thriving green areas",
  },
  {
    title: "Youth Engagement",
    description: "Creating positive activities for young people",
  },
  {
    title: "Mental Health Support",
    description:
      "Providing resources and support for individuals facing mental health challenges",
  },
  {
    title: "Addiction Recovery",
    description: "Supporting those recovering from addiction",
  },
  {
    title: "Elderly Support",
    description:
      "Creating opportunities for social engagement and support for the elderly",
  },
];

function App() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <section className="flex flex-col items-center justify-center gap-4 [&_p]:text-lg">
        <h1 className="mb-4">
          Building Skills,{" "}
          <span className="text-primary">Building Community</span>
        </h1>
        <p>
          Let&apos;s Give Back is a community-focused organisation with a
          primary mission to support key groups such as youth, individuals
          facing mental health challenges, those recovering from addiction, and
          the elderly.
        </p>

        <p>
          We bring people together through hands-on projects that build skills,
          confidence, and connection. Local hands. National impact. Shared
          community pride.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 md:gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-center gap-2"
          >
            <h2 className="text-lg text-foreground">{service.title}</h2>
            <p className="text-muted-foreground text-sm">
              {service.description}
            </p>
          </div>
        ))}

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex items-center justify-center">
          <h2 className="text-2xl font-bold text-foreground text-center">
            Local hands. National impact. Shared community pride.
          </h2>
        </div>
      </section>
    </div>
  );
}
