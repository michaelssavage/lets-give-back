import { Card } from "@/components/card";
import { HeartIcon } from "@/components/icons/heart.icon";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const Route = createFileRoute("/")({ component: App });

const SUPPORTED_GROUPS = [
  "Elderly residents",
  "Nursing homes",
  "Disability residential services",
  "Community centres",
  "Addiction Services",
  "Young person residential care settings",
];

const row1 = [
  "WASH YARDS",
  "CLEAR GARDENS",
  "CUT BACK HEDGES",
  "PAINT WALLS",
  "FIX FENCES",
];

const row2 = [
  "BUILD SEATING",
  "REPAIR TIMBER",
  "PATCH BOARDS",
  "GENERAL MAINTENANCE",
];

function App() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Adjust values for more/less movement
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div>
      <section className="bg-card px-6 py-12 md:p-12 min-h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center justify-center gap-8 max-w-5xl mx-auto mb-8 md:mb-16">
          <h1 className="font-bold text-center text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s Give Back
          </h1>
          <p className="text-lg text-center text-balance leading-[2.5]">
            We are a{" "}
            <span className="badge leading-tight">community-focused</span>{" "}
            organisation with a primary mission to support key groups such as
            youth, individuals facing mental health challenges, those recovering
            from addiction, and the elderly.
          </p>
        </div>
      </section>

      <section
        ref={ref}
        className="relative overflow-hidden bg-white min-h-[70vh] md:min-h-[80vh] grid place-items-center"
      >
        <div className="absolute inset-0 z-8 flex flex-col justify-center gap-8 opacity-20 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => {
            const items = i % 2 === 0 ? row1 : row2;
            const x = i % 2 === 0 ? x1 : x2;
            return (
              <motion.div
                key={i}
                style={{ x }}
                className="flex gap-12 whitespace-nowrap text-4xl font-bold"
              >
                {[...items, ...items].map((item, j) => (
                  <span key={j}>{item}</span>
                ))}
              </motion.div>
            );
          })}
        </div>

        <Card className="relative z-10 my-12 md:my-24 mx-4">
          <HeartIcon
            color="#F15A29"
            className="absolute -top-4 -right-4 size-12 md:size-16"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Building Skills, Building Community
          </h2>
          <p className="text-lg text-center text-balance">
            At Let&apos;s Give Back CLG, we offer small maintenance and outdoor
            improvement services for people and organisations supporting
            vulnerable members of our community
          </p>
        </Card>
      </section>

      <section className="bg-light-blue p-12 min-h-[60vh] grid place-items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Who do we support?
        </h2>
        <p className="mb-4">(Everyone)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUPPORTED_GROUPS.map((group) => (
            <p
              key={group}
              className="grid place-items-center text-2xl card-shadow rounded-2xl py-4 px-6 bg-white font-bold text-center"
            >
              {group}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
