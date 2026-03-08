import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center px-6 py-8 md:px-12">
      <h1>ABOUT US</h1>
      <p className="text-base md:text-lg text-balance">
        Let&apos;s Give Back CLG is a community-driven social enterprise founded
        in Co. Monaghan, and growing across Ireland&apos;s counties and border
        regions. Our mission is simple: to bring people together through
        hands-on projects that build skills, confidence, and connection. We
        transform homes, gardens, and community spaces for individuals and
        families facing difficult times. Every renovation builds confidence,
        teamwork, and pride, so that we can create visible change for those who
        need it most.
      </p>
      <h2 className="mt-8">Teaching Life Skills Through Simple Jobs</h2>
      <p className="text-base md:text-lg text-balance">
        Our work spans Community Renovation Projects, Skills &amp; Training
        Workshops, a Mobile Food &amp; Coffee Truck, Youth &amp; Inclusion
        Projects, Community Partnerships, and Recovery &amp; Wellbeing Through
        Action. None of it happens without people, so we&apos;re always looking
        for volunteers who want to roll up their sleeves and get involved.
        Financial donations are gratefully received through our website or
        directly, but giving back doesn&apos;t have to mean money. Leftover
        timber, paint, tools, and other materials are just as valuable to us, so
        if you have something sitting unused, we&apos;ll put it to good use.
      </p>
    </div>
  );
}
