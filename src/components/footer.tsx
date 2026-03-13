import { Anchor } from "@/components/anchor";
import { FacebookIcon } from "@/components/icons/facebook.icon";
import { RevolutIcon } from "@/components/icons/revolut.icon";
import { WhatsappIcon } from "@/components/icons/whatsapp.icon";
import {
  EMAIL_ADDRESS,
  FACEBOOK_URL,
  MONAGHAN_MAP_LINK,
  PHONE_NUMBER,
  REVOLUT_URL,
} from "@/utils/constants";
import { CopyIcon, Mail, MousePointerClick, Phone } from "lucide-react";
import type { MouseEvent } from "react";
import toast from "react-hot-toast";

export const Footer = () => {
  const copyEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    toast.success("Email copied to clipboard");
  };

  return (
    <footer className="px-4 pt-10 pb-6 bg-primary-orange text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-16 mb-8 mx-2 md:mx-8">
        <div className="flex flex-col lg:flex-row flex-wrap mx-auto md:mx-0 items-center gap-4">
          <img
            src="/logo-orange.png"
            alt="Let's Give Back"
            className="size-24 md:size-28 hover:rotate-12 transition-transform duration-200"
          />

          <div className="text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold flex flex-col">
              <span className="whitespace-nowrap">Let&apos;s Give</span>
              <span className="whitespace-nowrap">Back CLG</span>
            </p>

            <p className="whitespace-nowrap">
              &copy; {new Date().getFullYear()} Let&apos;s Give Back
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[max-content_max-content] mx-auto md:mx-0 md:items-start flex-wrap gap-y-4 gap-x-8">
          <Anchor href={FACEBOOK_URL} className="hover:underline" isExternal>
            <FacebookIcon size={24} className="fill-white shrink-0" />
            Facebook
          </Anchor>

          <Anchor
            href={`mailto:${EMAIL_ADDRESS}`}
            className="group hover:underline overflow-hidden"
            isExternal
          >
            <Mail size={24} className="shrink-0" />
            {EMAIL_ADDRESS}

            <button
              onClick={copyEmail}
              title="Copy email to clipboard"
              className="hidden group-hover:flex items-center no-underline hover:no-underline"
            >
              <CopyIcon className="size-6 shrink-0 stroke-light-orange" />
              <MousePointerClick className="size-5 shrink-0 stroke-light-orange" />
            </button>
          </Anchor>

          <Anchor href={REVOLUT_URL} className="hover:underline" isExternal>
            <RevolutIcon size={24} className="fill-white shrink-0" />
            Revolut
          </Anchor>

          <Anchor
            href={`tel:${PHONE_NUMBER}`}
            className="hover:underline"
            isExternal
          >
            <Phone size={24} className="stroke-white shrink-0" />
            {PHONE_NUMBER.replace("+353 ", "0")}
          </Anchor>

          <Anchor
            href={`https://wa.me/${PHONE_NUMBER}`}
            className="hover:underline"
            isExternal
          >
            <WhatsappIcon size={24} className="fill-white shrink-0" />
            WhatsApp
          </Anchor>
        </div>

        <div className="hidden md:flex flex-col justify-end items-end ml-auto">
          <img
            src="/qr-code.png"
            alt="Revolut"
            className="size-16 md:size-24 rounded-lg"
          />
          <p className="text-sm text-white whitespace-nowrap">Scan to donate</p>
        </div>
      </div>

      <hr className="my-6" />

      <p>
        Based in{" "}
        <Anchor
          href={MONAGHAN_MAP_LINK}
          isExternal
          className="hover:text-black hover:[&>svg]:stroke-black inline-flex gap-1 items-baseline"
        >
          Co. Monaghan
        </Anchor>
        , Ireland.
      </p>
    </footer>
  );
};
