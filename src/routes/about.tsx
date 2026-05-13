import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { RevolutIcon } from "@/components/icons/revolut.icon";
import { REVOLUT_URL, SITE_URL } from "@/utils/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "About Us" },
      { property: "og:title", content: "About Us" },
      { name: "description", content: "About Us" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "About Us" },
      { property: "og:image", content: "/services/banner.jpg" },
      { property: "twitter:image", content: "/services/banner.jpg" },
      { property: "og:url", content: `${SITE_URL}/about` },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="text-center px-6 py-8 md:px-12 md:pb-16 max-w-5xl mx-auto">
      <h1>About Us</h1>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <div className="flex-2 flex flex-col gap-4">
          <p className="text-base md:text-lg text-justify">
            Let&apos;s Give Back was founded by a social care professional,
            Mark, and he is supported by a team of qualified social care
            practitioners with over 10 years&apos; experience supporting
            individuals in residential and community settings, with a strong
            focus on person-centred practice and meaningful engagement.
          </p>
          <p className="text-lg md:text-xl text-left font-bold">
            How We Work Safely
          </p>

          <p className="text-base md:text-lg text-left">
            All of our projects are delivered in partnership with services, with
            appropriate supervision and support, following safeguarding and risk
            assessment procedures, and in line with best practice in social
            care.
          </p>
        </div>

        <div className="flex-1">
          <img
            src="/assets/timber.jpg"
            alt="Skill building through painting"
            width={500}
            height={500}
            className="rounded-2xl object-contain w-full h-auto"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-2 text-left">Our Vision</h2>
      <p className="text-base md:text-lg text-justify">
        A community where generations are connected, where young people and
        older adults support one another, and where everyone feels valued,
        included, and part of something meaningful.
      </p>
      <h2 className="mt-8 mb-2 text-left">Our Mission</h2>
      <p className="text-base md:text-lg text-justify">
        To create opportunities for people across all ages and abilities to come
        together through structured, person-centred projects that promote
        inclusion, skill development, and wellbeing. We aim to reduce isolation,
        empower participation, and build stronger communities through
        meaningful, shared experiences.
      </p>

      <img
        src="/assets/painting.jpg"
        alt="Skill building through painting"
        width={1000}
        height={1000}
        className="mt-8 rounded-2xl"
      />

      <Anchor
        href={REVOLUT_URL}
        className={buttonStyles({
          variant: "secondary",
          className: "mt-8 w-fit",
        })}
        isExternal
      >
        <RevolutIcon size={24} className="fill-white shrink-0" />
        Revolut
      </Anchor>
    </div>
  );
}
