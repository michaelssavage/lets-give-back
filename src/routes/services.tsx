import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { RevolutIcon } from "@/components/icons/revolut.icon";
import { REVOLUT_URL } from "@/utils/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center min-h-[60vh] grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-4 mx-4">
        <h1 className="font-bold">SERVICES - COMING SOON</h1>

        <span className="text-lg md:text-xl flex items-center flex-col md:flex-row gap-2">
          Donate to our cause:
          <Anchor
            href={REVOLUT_URL}
            className={buttonStyles({
              variant: "secondary",
              className: "inline-flex items-center gap-2",
            })}
            isExternal
          >
            <RevolutIcon size={24} className="fill-white shrink-0" />
            Revolut
          </Anchor>
        </span>
      </div>
    </div>
  );
}
