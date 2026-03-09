import { Anchor } from "@/components/anchor";
import { FacebookIcon } from "@/components/icons/facebook.icon";
import { WhatsappIcon } from "@/components/icons/whatsapp.icon";
import {
  EMAIL_ADDRESS,
  FACEBOOK_URL,
  MONAGHAN_MAP_LINK,
  PHONE_NUMBER,
} from "@/utils/constants";
import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="px-4 pt-8 pb-4 bg-primary-orange text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 mx-2 md:mx-8">
        <div className="flex flex-col md:flex-row mx-auto md:mx-0 items-center gap-4">
          <img
            src="/logo-orange.png"
            alt="Let's Give Back"
            className="size-16 md:size-32 hover:rotate-12 transition-transform duration-200"
          />

          <div className="text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold">
              Let&apos;s Give Back CLG
            </p>
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
          </div>
        </div>

        <div className="flex flex-col items-center mx-auto md:mx-0 md:items-start flex-wrap gap-2">
          <p className="text-2xl font-bold">Get In Touch</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <Anchor
              href={`https://wa.me/${PHONE_NUMBER}`}
              className="hover:text-black hover:[&>svg]:fill-black"
              isExternal
            >
              <WhatsappIcon size={24} className="fill-white" />
              WhatsApp
            </Anchor>
            <Anchor
              href={`tel:${PHONE_NUMBER}`}
              className="hover:text-black hover:[&>svg]:stroke-black"
              isExternal
            >
              <Phone size={24} className="stroke-white" />
              {PHONE_NUMBER}
            </Anchor>
            <Anchor
              href={FACEBOOK_URL}
              className="hover:text-black hover:[&>svg]:fill-black"
              isExternal
            >
              <FacebookIcon size={24} className="fill-white" />
              Facebook
            </Anchor>
            <Anchor
              href={`mailto:${EMAIL_ADDRESS}`}
              className="hover:text-black hover:[&>svg]:stroke-black"
              isExternal
            >
              <Mail size={24} />
              Email
            </Anchor>
          </div>
        </div>
      </div>

      <p className="text-end">
        &copy; {new Date().getFullYear()} Let&apos;s Give Back
      </p>
    </footer>
  );
};
