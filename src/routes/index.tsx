import { Anchor } from "@/components/anchor";
import { Button } from "@/components/button/button";
import { buttonStyles } from "@/components/button/button.styles";
import { Fireworks } from "@/components/fireworks";
import { SITE_URL } from "@/utils/constants";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  Check,
  Handshake,
  Share2,
  Sprout,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [
      { title: "Let's Give Back" },
      { property: "og:title", content: "Let's Give Back" },
      { name: "description", content: "Let's Give Back" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Let's Give Back" },
      { property: "og:image", content: "/services/banner.jpg" },
      { property: "twitter:image", content: "/services/banner.jpg" },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
  }),
});

const SUPPORTED_GROUPS = [
  "People with disabilities",
  "Individuals experiencing mental health and addiction challenges",
  "Young people in schools, community resource centres, and residential services",
  "Older adults in residential care and those living independently at home",
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
    ["-4deg", "0deg"],
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

  return (
    <div>
      <section className="bg-card px-6 py-8 md:px-12 min-h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center justify-center gap-8 max-w-5xl mx-auto mb-8 md:mb-16">
          <motion.h1
            className="font-bold text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Building Skills, Confidence & Community Through Meaningful Projects
          </motion.h1>

          <motion.p
            className="text-lg text-center text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <motion.span
              style={{ rotate: badgeRotate }}
              whileHover={{ rotate: "0deg", transition: { duration: 0.2 } }}
              className="badge leading-tight"
            >
              Supporting people
            </motion.span>{" "}
            with disabilities, individuals experiencing mental health and
            addiction challenges, young people across schools, community and
            residential settings, and older adults in residential care and in
            their own homes.
          </motion.p>

          <motion.div
            className="flex flex-col xs:flex-row gap-4 *:text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            <Link
              to="/contact"
              className={buttonStyles({ variant: "primary" })}
            >
              Get Involved
            </Link>
            <Link
              to="/projects"
              className={buttonStyles({ variant: "outline" })}
            >
              Work With Us
            </Link>
          </motion.div>
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

        <div className="card-shadow flex flex-col items-center justify-center gap-4 max-w-4xl rounded-2xl p-6 md:p-12 border relative z-10 my-12 md:my-24 mx-6 bg-background">
          <div className="absolute -top-4 -right-4">
            <Fireworks />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Let&apos;s Give Back supports people in our communities
          </h2>
          <p className="text-lg text-center text-balance">
            We work alongside individuals and services to create meaningful,
            person-centred projects that build confidence, develop skills, and
            strengthen community connection.
          </p>

          <p className="text-lg text-center text-balance">
            Through an empowering approach, we encourage young people to take
            part in practical, community-based activities that support older
            people living at home, creating opportunities for connection,
            reducing isolation, and building positive relationships across
            generations.
          </p>

          <p className="text-lg text-center text-balance">
            We provide the structure and support needed to ensure all projects
            are safe, purposeful, and meaningful for everyone involved.
          </p>

          <Link
            to="/services"
            className={buttonStyles({
              variant: "ghost",
              className:
                "flex items-center gap-1 group text-nowrap text-lg md:text-xl text-primary-orange",
            })}
          >
            View our services
            <ArrowRightIcon className="size-6 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      <section className="bg-light-orange px-6 py-8 md:px-12 min-h-[60vh] grid place-items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Who do we support?
        </h2>
        <p>(Everyone)</p>
        <p className="mb-4">
          We work with individuals across a range of settings, including:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUPPORTED_GROUPS.map((group) => (
            <p
              key={group}
              className="grid place-items-center text-lg sm:text-xl md:text-2xl card-shadow rounded-2xl py-4 px-6 bg-white font-bold text-center hover:-rotate-2 transition-transform duration-200"
            >
              {group}
            </p>
          ))}
        </div>
      </section>

      <section className="relative bg-white px-6 py-8 md:px-12 min-h-[60vh] grid place-items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 [&_h2]:text-xl md:[&_h2]:text-2xl lg:[&_h2]:text-3xl xl:[&_h2]:text-4xl">
          <motion.div
            className="md:mt-50"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0 }}
          >
            <button
              className="group flex flex-row gap-2 cursor-pointer"
              onClick={handleShare}
            >
              <Share2 className="shrink-0 size-8 md:size-10 group-hover:text-primary-orange" />
              <h2 className="decoration-5 group-hover:underline group-hover:decoration-primary-orange">
                Skill Building
              </h2>
            </button>
            <p className="text-lg md:text-xl mb-2">
              We support people to develop practical life skills through
              hands-on, structured activities that build confidence and
              independence.
            </p>

            <Button
              onClick={handleShare}
              size="sm"
              variant="outline"
              className="group flex items-center gap-1"
            >
              Share
              <ArrowUpRightIcon className="size-6 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          >
            <Anchor
              href="https://revolut.me/letsgiveback"
              className="group flex flex-row gap-2"
              isExternal
            >
              <Sprout className="shrink-0 size-8 md:size-10 text-primary-green" />
              <h2 className="decoration-5 group-hover:underline group-hover:decoration-primary-green">
                Person-Centred Projects
              </h2>
            </Anchor>
            <p className="text-lg md:text-xl mb-2">
              We design and deliver tailored projects based on individual
              interests, supporting meaningful engagement and participation.
            </p>

            <Anchor
              href="https://revolut.me/letsgiveback"
              className={buttonStyles({
                variant: "outline",
                size: "sm",
                className: "w-fit group flex items-center gap-1",
              })}
              isExternal
            >
              Donate
              <ArrowRightIcon className="size-6 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </Anchor>
          </motion.div>

          <motion.div
            className="md:mt-50"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <Link
              to="/contact-us"
              className="group flex flex-row gap-2 active:scale-105"
            >
              <Handshake className="shrink-0 size-8 md:size-10 group-hover:text-primary-orange" />
              <h2 className="decoration-5 group-hover:underline group-hover:decoration-primary-orange">
                Community Connection
              </h2>
            </Link>
            <p className="text-lg md:text-xl mb-2">
              We create opportunities for connection between individuals,
              services, and communities to promote inclusion and reduce
              isolation.
            </p>
            <Link
              to="/contact-us"
              className={buttonStyles({
                variant: "outline",
                size: "sm",
                className: "w-fit group flex items-center gap-1",
              })}
            >
              Get Involved
              <ArrowDownRightIcon className="size-6 shrink-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-card px-6 py-8 md:px-12 min-h-[60vh]">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-left w-fit">
          Projects <span className="text-primary-orange italic">in</span> Action
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-end mt-2 mb-8">
          <p className="text-lg text-left text-balance">
            Real projects, designed with the people they&apos;re for. Each one
            is shaped around individual interests, abilities, and goals.
          </p>

          <Link
            to="/projects"
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className:
                "w-fit group flex items-center gap-1 text-nowrap h-8 sm:h-12",
            })}
          >
            View all projects
            <ArrowUpRightIcon className="size-6 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row gap-x-4 w-full overflow-hidden rounded-2xl border border-black card-shadow">
            <div className="aspect-video w-full overflow-hidden flex-1 p-8 bg-light-green">
              <img
                src="/assets/plant.jpg"
                alt="Project 1"
                className="w-full h-full object-cover card-shadow"
              />
            </div>

            <div className="py-6 px-8 flex flex-col gap-1 flex-1">
              <div className="flex flex-row gap-2 items-center mb-2">
                <h2 className="text-4xl md:text-5xl font-bold text-primary-green">
                  01
                </h2>
                <div className="w-full h-px bg-black" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Garden & Outdoor Space Project
              </h3>

              <p>
                We worked with a resident in a new home setting to design and
                build a personalised garden space, including a bench and
                planting area. This supported independence, routine, and a sense
                of ownership.
              </p>

              <p className="my-2 font-bold">What this supported:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="bg-primary-green fill-white rounded-full p-2 w-fit flex items-center justify-center">
                    <Check className="size-3 stroke-4 shrink-0 text-white rounded-full" />
                  </div>
                  Independence
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-primary-green fill-white rounded-full p-2 w-fit flex items-center justify-center">
                    <Check className="size-3 stroke-4 shrink-0 text-white rounded-full" />
                  </div>
                  Built daily routine
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-primary-green fill-white rounded-full p-2 w-fit flex items-center justify-center">
                    <Check className="size-3 stroke-4 shrink-0 text-white rounded-full" />
                  </div>
                  Sense of ownership
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-x-4 w-full overflow-hidden rounded-2xl border border-black card-shadow">
            <div className="py-6 sm:py-6 px-4 sm:px-8 flex flex-col gap-1 flex-1">
              <div className="flex flex-row gap-2 items-center mb-2">
                <h2 className="text-4xl md:text-5xl font-bold text-primary-orange">
                  02
                </h2>
                <div className="w-full h-px bg-black" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Outdoor Games Project
              </h3>

              <p>
                We introduced flat-pack garden games, supporting service users
                to build, paint, and use them as part of meaningful daily
                activities.
              </p>

              <p className="my-2 font-bold">What this supported:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="bg-primary-orange fill-white rounded-full p-2 w-fit flex items-center justify-center">
                    <Check className="size-3 stroke-4 shrink-0 text-white rounded-full" />
                  </div>
                  Hands-on learning
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-primary-orange fill-white rounded-full p-2 w-fit flex items-center justify-center">
                    <Check className="size-3 stroke-4 shrink-0 text-white rounded-full" />
                  </div>
                  Social interaction
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-primary-orange fill-white rounded-full p-2 w-fit flex items-center justify-center">
                    <Check className="size-3 stroke-4 shrink-0 text-white rounded-full" />
                  </div>
                  Improved mental health
                </li>
              </ul>
            </div>

            <div className="aspect-video w-full overflow-hidden flex-1 p-8 bg-light-orange">
              <img
                src="/assets/checkboard.jpg"
                alt="Project 2"
                className="w-full h-full object-cover card-shadow"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
