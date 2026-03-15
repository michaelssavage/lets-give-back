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
import { Link } from "@tanstack/react-router";
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
    <footer className="pt-10 pb-6 bg-primary-orange text-white">
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_2fr_1fr] gap-8 mb-8">
        {/* 1 Logo */}
        <div className="flex flex-col items-center gap-4 md:col-span-2 lg:col-span-1">
          <p className="text-3xl md:text-4xl font-bold flex flex-col text-center md:text-left">
            <span className="whitespace-nowrap">Let&apos;s Give</span>
            <span className="whitespace-nowrap">Back CLG</span>
          </p>

          <img
            src="/logo-orange.png"
            alt="Let's Give Back"
            className="size-24 md:size-28 hover:rotate-12 transition-transform duration-200"
          />
        </div>

        {/* 2 Socials */}
        <div className="flex flex-col flex-wrap gap-3 xs:justify-self-center xs:w-75">
          <h4 className="text-lg lg:text-xl font-bold">Socials:</h4>
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
            <span className="hidden xs:inline">{EMAIL_ADDRESS}</span>
            <span className="inline xs:hidden">Email</span>

            <button
              onClick={copyEmail}
              title="Copy email to clipboard"
              className="hidden lg:flex opacity-0 group-hover:opacity-100 items-center no-underline hover:no-underline"
            >
              <CopyIcon className="size-6 shrink-0 stroke-light-orange" />
              <MousePointerClick className="size-5 shrink-0 stroke-light-orange" />
            </button>
          </Anchor>

          <Anchor
            href={`https://wa.me/${PHONE_NUMBER}`}
            className="hover:underline"
            isExternal
          >
            <WhatsappIcon size={24} className="fill-white shrink-0" />
            WhatsApp
          </Anchor>

          <Anchor
            href={`tel:${PHONE_NUMBER}`}
            className="hover:underline"
            isExternal
          >
            <Phone size={24} className="stroke-white shrink-0" />
            {PHONE_NUMBER.replace("+353 ", "0")}
          </Anchor>

          <Anchor href={REVOLUT_URL} className="hover:underline" isExternal>
            <RevolutIcon size={24} className="fill-white shrink-0" />
            Revolut
          </Anchor>
        </div>

        {/* 3 Quick Links */}
        <div className="flex flex-col flex-wrap gap-3 xs:justify-self-center xs:w-75">
          <h4 className="text-lg lg:text-xl font-bold">Quick Links:</h4>
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/projects" className="hover:underline">
            Our Projects
          </Link>
          <Link to="/services" className="hover:underline">
            Our Services
          </Link>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>

        {/* 4 Donate QR Code */}
        <div className="hidden lg:flex flex-col">
          <img
            src="/qr-code.png"
            alt="Revolut"
            className="size-16 md:size-24 rounded-lg"
          />
          <p className="text-sm text-white whitespace-nowrap">Scan to donate</p>
        </div>
      </div>

      <hr className="mx-4 my-6" />

      <div className="px-8 flex flex-row justify-between flex-wrap gap-2">
        <p>
          &copy; {new Date().getFullYear()} Let&apos;s Give Back, based in{" "}
          <Anchor
            href={MONAGHAN_MAP_LINK}
            isExternal
            className="hover:text-black hover:[&>svg]:stroke-black inline-flex gap-1 items-baseline"
          >
            Co. Monaghan
          </Anchor>
          , Ireland.
        </p>

        <Anchor
          href="https://michaelsavage.dev"
          className="hover:text-black"
          isExternal
        >
          Website by Michael Savage
        </Anchor>
      </div>
    </footer>
  );
};
