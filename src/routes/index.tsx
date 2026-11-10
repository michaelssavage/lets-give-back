import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { Fireworks } from "@/components/fireworks";
import { PhotoPrint } from "@/components/photo-print";
import { FACEBOOK_URL, REVOLUT_URL, SITE_URL } from "@/utils/constants";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, ArrowUpRightIcon, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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

const WORKSHOP_PHOTOS = [
  {
    src: "/projects/bailieborough-bench-team.jpg",
    alt: "A facilitator and a young person assembling bench frames outdoors",
    caption: "From a pile of timber...",
    rotate: "-rotate-2",
  },
  {
    src: "/projects/cootehill-drilling.jpg",
    alt: "A young person drilling a timber box with guidance from a facilitator",
    caption: "Learning the drill, Cootehill",
    rotate: "rotate-1",
  },
  {
    src: "/projects/cootehill-bird-table.jpg",
    alt: "A finished handmade timber bird table on a desk",
    caption: "One finished bird table",
    rotate: "-rotate-1",
  },
  {
    src: "/projects/cootehill-kit-box.jpg",
    alt: "A young person and facilitator building a large timber storage box",
    caption: "His own idea: a football kit box",
    rotate: "rotate-2",
  },
  {
    src: "/projects/bailieborough-bench-legs.jpg",
    alt: "A young person squaring up timber bench legs",
    caption: "Measure twice, cut once",
    rotate: "-rotate-2",
  },
];

const WAYS_TO_HELP = [
  {
    title: "Volunteer",
    text: "Come along to a build day. Helping out can mean measuring, sanding, painting, driving the van or making the tea. You don't need any experience.",
    cta: "Volunteer",
    reason: "volunteer",
  },
  {
    title: "Suggest a project",
    text: "Do you run a school, youth club, day service or care home? Tell us what you'd like built or repaired, and who'll be building it with us.",
    cta: "Suggest a project",
    reason: "project",
  },
  {
    title: "Donate materials",
    text: "We use timber offcuts, pallets, leftover paint, plants and working tools. Let us know what you have.",
    cta: "Offer materials",
    reason: "materials",
  },
  {
    title: "Fund a programme",
    text: "CMETB funds our youth workshops with Foróige in Cavan. If your organisation could fund a programme in your area, we'd like to hear from you.",
    cta: "Get in touch",
    reason: "partner",
  },
] as const;

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
              to="/"
              hash="get-involved"
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

        <div className=" flex flex-col items-center justify-center gap-4 max-w-4xl rounded-sm p-6 md:p-12 border relative z-10 my-12 md:my-24 mx-6 bg-background">
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

      <section
        aria-labelledby="workshop-heading"
        className="bg-light-green px-6 py-12 md:px-12 overflow-hidden"
      >
        <div className="px-6 md:px-12 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2
              id="workshop-heading"
              className="text-3xl md:text-4xl font-bold"
            >
              Recent builds
            </h2>
            <p className="text-lg mt-2 max-w-2xl">
              Bird boxes in Cootehill and a garden bench in Bailieborough, built
              with young people from Foróige.
            </p>
          </div>
          <Anchor
            href={FACEBOOK_URL}
            isExternal
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "w-fit group shrink-0 text-nowrap",
            })}
          >
            More on Facebook
            <ArrowUpRightIcon className="shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </Anchor>
        </div>

        <ul className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pt-4 pb-8 [scrollbar-width:thin]">
          {WORKSHOP_PHOTOS.map((photo, i) => (
            <motion.li
              key={photo.src}
              className="snap-center shrink-0 w-56 sm:w-64 lg:w-72"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
            >
              <PhotoPrint
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                taped={i % 2 === 0}
                className={`${photo.rotate} hover:rotate-0 transition-transform duration-200`}
              />
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="bg-light-orange px-6 py-12 md:px-12 min-h-[60vh] grid place-items-center">
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
              className="border border-black grid place-items-center text-lg sm:text-xl rounded-sm py-2 sm:py-4 px-4 sm:px-6 bg-white font-bold text-center hover:-rotate-2 transition-transform duration-200"
            >
              {group}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-card px-6 py-12 md:px-12 min-h-[60vh]">
        <h2 className="text-3xl md:text-4xl font-bold text-left w-fit">
          Projects in Action
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
          <div className="flex flex-col sm:flex-row gap-x-4 w-full overflow-hidden rounded-sm border border-black">
            <div className="aspect-video w-full overflow-hidden flex-1 p-8 bg-light-green">
              <img
                src="/assets/plant.jpg"
                alt="Project 1"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="py-6 px-8 flex flex-col gap-1 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mt-3">
                Garden & Outdoor Space
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

          <div className="flex flex-col-reverse sm:flex-row gap-x-4 w-full overflow-hidden rounded-sm border border-black">
            <div className="py-6 sm:py-6 px-4 sm:px-8 flex flex-col gap-1 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mt-3">
                Outdoor Games
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
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="get-involved"
        aria-labelledby="get-involved-heading"
        className="bg-white px-6 py-12 md:px-12 scroll-mt-24"
      >
        <h2
          id="get-involved-heading"
          className="text-3xl md:text-4xl font-bold"
        >
          Get involved
        </h2>
        <p className="text-lg mt-2 mb-10 max-w-2xl text-balance">
          We run on volunteers, donated materials and local funding. Pick
          whichever suits you and we&apos;ll get back to you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WAYS_TO_HELP.map((way, i) => (
            <motion.div
              key={way.reason}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: (i % 3) * 0.1,
              }}
              className="bg-card flex flex-col gap-3 rounded-sm border border-black p-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold">{way.title}</h3>
              <p className="flex-1">{way.text}</p>
              <Link
                to="/contact"
                search={{ reason: way.reason }}
                className={buttonStyles({
                  variant: "outline",
                  size: "sm",
                  className: "w-fit group flex items-center gap-1 bg-white",
                })}
              >
                {way.cta}
                <ArrowRightIcon className="shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="bg-card flex flex-col gap-3 rounded-sm border border-black p-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">Donate</h3>
            <p className="flex-1">
              Donations pay for the timber, screws, paint and tools that go into
              community projects. You can donate through Revolut.
            </p>
            <Anchor
              href={REVOLUT_URL}
              isExternal
              className={buttonStyles({
                variant: "primary",
                size: "sm",
                className: "w-fit group",
              })}
            >
              Donate on Revolut
              <ArrowUpRightIcon className="shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </Anchor>
          </motion.div>

          <motion.img
            src="/projects/bailieborough-bench-build.jpg"
            alt="A young person from Foróige assembling a timber bench frame with a Let's Give Back facilitator in Bailieborough"
            loading="lazy"
            className="w-full h-full max-h-72 object-cover object-[50%_70%] rounded-sm border border-black"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </section>
    </div>
  );
}
