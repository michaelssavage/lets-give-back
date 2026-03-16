import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { RevolutIcon } from "@/components/icons/revolut.icon";
import { REVOLUT_URL } from "@/utils/constants";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center px-6 py-8 md:px-12 md:pb-16 max-w-5xl mx-auto">
      <h1>SERVICES</h1>

      <p className="mt-4 mb-8 text-center text-base md:text-lg leading-8">
        Donate to our mission or get in touch with us:{""}
        <Anchor
          href="/contact"
          className={buttonStyles({
            size: "sm",
            className: "inline-flex items-center gap-2 w-fit ml-2 max-h-10",
          })}
        >
          <MessageCircle className="size-4 shrink-0" />
          Contact Us
        </Anchor>{" "}
        <Anchor
          href={REVOLUT_URL}
          className={buttonStyles({
            size: "sm",
            variant: "secondary",
            className: "inline-flex items-center gap-2 w-fit ml-2 max-h-10",
          })}
          isExternal
        >
          <RevolutIcon className="size-4 fill-white shrink-0" />
          Revolut
        </Anchor>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        {/* 1. */}
        <div className="order-1 md:col-span-2 rounded-2xl overflow-hidden h-full">
          <img
            src="/services/banner.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. */}
        <div className="order-2 border border-black card-shadow rounded-2xl p-4 h-full flex flex-col justify-center">
          <p>
            We operate a community pricing model, meaning reduced rates are
            available for services working with elderly or vulnerable people.
          </p>
        </div>

        {/* 3. */}
        <div className="order-4 md:order-3 border border-black card-shadow rounded-2xl p-4 h-full flex flex-col justify-center">
          <p>
            Sometimes its just the human connection that matters. If you have an
            elderly family member who may be feeling isolated, feel free to get
            in touch. Even a small job can provide a bit of company,
            conversation, and a friendly face, which can make a huge difference.
          </p>
        </div>

        {/* 4. */}
        <div className="order-3 md:order-4 md:col-span-2 rounded-2xl overflow-hidden h-full">
          <img
            src="/services/earth.jpg"
            alt="Earth"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 5. */}
        <div className="order-5 md:col-span-2 rounded-2xl overflow-hidden h-full">
          <img
            src="/services/door.jpg"
            alt="Door"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 6. */}
        <div className="order-6 border border-black card-shadow rounded-2xl p-4 h-full flex flex-col justify-center">
          <p>
            We&apos;re interested in working with young person residential care
            settings, where appropriate, by involving young people in light
            maintenance and DIY projects (supervised).
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Anchor
          href="/projects"
          className={buttonStyles({
            variant: "secondary",
            className: "w-fit",
          })}
        >
          View our projects
        </Anchor>
      </div>
    </div>
  );
}
