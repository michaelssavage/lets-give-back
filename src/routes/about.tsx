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
      <h1>ABOUT US</h1>
      <p className="text-base md:text-lg text-justify">
        Let&apos;s Give Back CLG is a community-driven social enterprise founded
        in Co. Monaghan, and growing across Ireland&apos;s counties and border
        regions. Our mission is to bring people together through hands-on
        projects that build{" "}
        <span className="font-bold">skills, confidence, and connection.</span>{" "}
        We transform homes, gardens, and community spaces for individuals and
        families facing difficult times. Every renovation builds confidence,
        teamwork, and pride, so that we can create visible change for those who
        need it most.
      </p>
      <h3 className="mt-8 mb-4">Teaching Life Skills Through Simple Jobs</h3>
      <p className="text-base md:text-lg text-justify">
        Our work spans Community Renovation Projects, Skills &amp; Training
        Workshops,{" "}
        <Anchor
          href="https://www.facebook.com/permalink.php?story_fbid=pfbid02QSCFhWX77hLe4xDNSahRag2wNTWQz6v2CbvTRdMoNGrdB7GYkT6wfpVPrjNtDfg2l&id=61573558281380"
          className="inline-flex decoration-5 underline decoration-primary-orange hover:decoration-dark-orange"
          isExternal
        >
          a Mobile Food &amp; Coffee Truck
        </Anchor>
        , Youth &amp; Inclusion Projects, Community Partnerships, and Recovery
        &amp; Wellbeing Through Action. <br />
        <br /> None of it happens without people, so we&apos;re always looking
        for volunteers who want to roll up their sleeves and get involved.
        Financial donations are gratefully received through our Revolut account,
        but giving back doesn&apos;t have to mean money. Leftover timber, paint,
        tools, and other materials are just as valuable to us, so if you have
        something sitting unused, we&apos;ll put it to good use!
      </p>

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
