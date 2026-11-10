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
        <div className="flex-1 flex flex-col gap-4">
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

        <div className="flex-1 overflow-hidden rounded-sm">
          <img
            src="/assets/timber.jpg"
            alt="Skill building through painting"
            className="rounded-sm object-contain h-auto w-full hover:scale-115 transition-transform duration-200"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-2 text-left text-3xl md:text-4xl font-bold">
        Our Vision
      </h2>
      <p className="text-base md:text-lg text-justify">
        A community where generations are connected, where young people and
        older adults support one another, and where everyone feels valued,
        included, and part of something meaningful.
      </p>
      <h2 className="mt-8 mb-2 text-left text-3xl md:text-4xl font-bold">
        Our Mission
      </h2>
      <p className="text-base md:text-lg text-justify mb-4">
        To create opportunities for people across all ages and abilities to come
        together through structured, person-centred projects that promote
        inclusion, skill development, and wellbeing. We aim to reduce isolation,
        empower participation, and build stronger communities through
        meaningful, shared experiences. Starting from Monaghan, Ireland.
      </p>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d598049.9775066919!2d-7.603985724579202!3d54.160012524398496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48609f42f90be0fb%3A0xd600e0191225b84f!2sMonaghan%2C%20Co.%20Monaghan%2C%20Ireland!5e0!3m2!1sen!2ses!4v1773012139180!5m2!1sen!2ses"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Monaghan, Ireland"
      />

      <p className="text-base md:text-lg text-justify mt-8 mb-2">
        Sounds good? Let&apos;s give back!
      </p>
      <Anchor
        href={REVOLUT_URL}
        className={buttonStyles({
          variant: "secondary",
          className: "w-fit",
        })}
        isExternal
      >
        <RevolutIcon size={24} className="fill-white shrink-0" />
        Revolut
      </Anchor>
    </div>
  );
}
