import {
  getServicesFn,
  type Service,
  type ServiceImage,
  type ServiceText,
} from "@/api/services.api";
import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { RevolutIcon } from "@/components/icons/revolut.icon";
import { REVOLUT_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { env } from "process";

export const Route = createFileRoute("/services")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Services" },
      { property: "og:title", content: "Services" },
      { name: "description", content: "Services" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Services" },
      { property: "og:image", content: "/services/banner.jpg" },
      { property: "twitter:image", content: "/services/banner.jpg" },
      { property: "og:url", content: `${env.SITE_URL}/services` },
    ],
  }),
});

const servicePairs = (items: Array<Service>) => {
  const pairs: [(typeof items)[0], (typeof items)[0]][] = [];
  for (let i = 0; i < items.length; i += 2) {
    const a = items[i];
    const b = items[i + 1];
    if (a && b) pairs.push([a, b]);
  }
  return pairs;
};

function RouteComponent() {
  const {
    data: services = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServicesFn,
  });

  if (!isLoading && error) {
    return <div>Error loading services</div>;
  }

  return (
    <div className="min-h-screen text-center px-6 py-8 md:px-12 md:pb-16 max-w-5xl mx-auto">
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

      <div className="flex flex-col gap-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            Loading services...
          </div>
        ) : (
          servicePairs(services).map(([first, second], pairIndex) => {
            const imageFirst = pairIndex % 2 === 0;
            const imageItem = imageFirst
              ? (first as ServiceImage)
              : (second as ServiceImage);

            const textItem = imageFirst
              ? (second as ServiceText)
              : (first as ServiceText);

            const imageBlock = (
              <div
                className={`md:col-span-2 rounded-2xl overflow-hidden h-full ${
                  !imageFirst ? "md:order-2" : "md:order-1"
                }`}
              >
                <img
                  src={imageItem.image}
                  alt={imageItem.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            );

            const textBlock = (
              <div
                className={`border border-black card-shadow rounded-2xl p-4 h-full flex flex-col justify-center ${
                  !imageFirst ? "md:order-1" : "md:order-2"
                }`}
              >
                <p>{textItem.description}</p>
              </div>
            );

            return (
              <div
                key={`${first.id}-${second.id}`}
                className="grid grid-cols-1 md:grid-cols-3 items-center gap-8"
              >
                {imageBlock}
                {textBlock}
              </div>
            );
          })
        )}
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
