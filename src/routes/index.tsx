import { buttonStyles } from "@/components/button/button.styles";
import { Card } from "@/components/card";
import { HeartIcon } from "@/components/icons/heart.icon";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, Handshake, Share2, Sprout } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import toast from "react-hot-toast";

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
  "/tools/hammer.svg",
  "/tools/paint-roller.svg",
  "/tools/shovel.svg",
  "/tools/wrench.svg",
  "/tools/hand-saw.svg",
  "/tools/screwdriver.svg",
];

const row2 = [
  "/tools/axe.svg",
  "/tools/cordless-drill.svg",
  "/tools/flashlight.svg",
  "/tools/flower-pot.svg",
  "/tools/pliers.svg",
  "/tools/tools.svg",
];

function App() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Start both rows offset left so content always fills both sides
  const x1 = useTransform(scrollYProgress, [0, 1], ["-5%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "-5%"]);

  const badgeRotate = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["-4deg", "0deg"]
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Let's Give Back",
          text: "A community-focused organisation in Co. Monaghan, Ireland",
          url: window.location.href,
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError")
          console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDonate = async () => {
    console.log("Donate");
  };

  return (
    <div>
      <section className="bg-card px-6 py-8 md:px-12 min-h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center justify-center gap-8 max-w-5xl mx-auto mb-8 md:mb-16">
          <h1 className="font-bold text-center text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s Give Back
          </h1>
          <p className="text-lg text-center text-balance leading-[2.5]">
            We are a{" "}
            <motion.span
              style={{ rotate: badgeRotate }}
              whileHover={{ rotate: "0deg", transition: { duration: 0.2 } }}
              className="badge leading-tight"
            >
              community-focused
            </motion.span>{" "}
            organisation with a primary mission to support key groups such as
            youth, individuals facing mental health challenges, those recovering
            from addiction, and the elderly.
          </p>

          <div className="flex flex-col xs:flex-row gap-4 *:text-center">
            <Link
              to="/contact"
              className={buttonStyles({ variant: "primary" })}
            >
              Get in touch
            </Link>
            <Link
              to="/projects"
              className={buttonStyles({ variant: "outline" })}
            >
              See our projects
            </Link>
          </div>
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
                className="flex gap-12 items-center"
              >
                {[...items, ...items, ...items].map((item, j) => (
                  <img
                    key={j}
                    src={item}
                    alt=""
                    className="size-16 md:size-24"
                  />
                ))}
              </motion.div>
            );
          })}
        </div>

        <Card className="relative z-10 my-12 md:my-24 mx-6 bg-light-orange">
          <HeartIcon
            color="var(--color-primary-orange)"
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

          <Link
            to="/services"
            className={buttonStyles({
              variant: "ghost",
              className:
                "flex items-center gap-1 hover:[&_svg]:translate-x-1 text-nowrap text-lg md:text-xl",
            })}
          >
            View our services
            <ArrowRightIcon className="size-6 shrink-0" />
          </Link>
        </Card>
      </section>

      <section className="bg-light-blue px-6 py-8 md:px-12 min-h-[60vh] grid place-items-center">
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

      <section className="relative bg-card px-6 py-8 md:px-12 min-h-[60vh] grid place-items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 [&_h2]:text-3xl md:[&_h2]:text-4xl lg:[&_h2]:text-5xl xl:[&_h2]:text-6xl">
          <div>
            <button
              className="group flex flex-row gap-2 cursor-pointer"
              onClick={handleShare}
            >
              <Share2 className="size-8 md:size-10 group-hover:text-primary-orange" />
              <h2 className="decoration-5 group-hover:underline group-hover:decoration-primary-orange">
                Share
              </h2>
            </button>
            <p className="text-lg md:text-xl">Spread awareness of our work</p>
          </div>

          <div className="md:mt-20">
            <button
              onClick={handleDonate}
              className="group flex flex-row gap-2"
            >
              <Sprout className="size-8 md:size-10 text-primary-green" />
              <h2 className="decoration-5 group-hover:underline group-hover:decoration-primary-green">
                Donate
              </h2>
            </button>
            <p className="text-lg md:text-xl">
              Small contributions go a long way
            </p>
          </div>

          <div>
            <Link
              to="/contact-us"
              className="group flex flex-row gap-2 active:scale-105"
            >
              <Handshake className="size-8 md:size-10 group-hover:text-primary-orange" />
              <h2 className="decoration-5 group-hover:underline group-hover:decoration-primary-orange">
                Volunteer
              </h2>
            </Link>
            <p className="text-lg md:text-xl">Join us in making a difference</p>
          </div>
        </div>
      </section>
    </div>
  );
}
