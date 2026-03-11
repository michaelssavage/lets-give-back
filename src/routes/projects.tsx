import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { FacebookIcon } from "@/components/icons/facebook.icon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center min-h-[60vh] grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-4 mx-4">
        <h1 className="font-bold">PROJECTS - COMING SOON</h1>

        <span className="text-lg md:text-xl flex items-center flex-col md:flex-row gap-2">
          Follow us on our socials for updates:
          <Anchor
            href="https://www.facebook.com/people/Lets-Give-Back/61573558281380/"
            className={buttonStyles({
              variant: "secondary",
              className: "inline-flex items-center gap-2",
            })}
            isExternal
          >
            <FacebookIcon size={24} className="fill-white shrink-0" />
            Facebook
          </Anchor>
        </span>
      </div>
    </div>
  );
}
