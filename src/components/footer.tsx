import { Anchor } from "@/components/anchor";
import { FacebookIcon } from "@/components/icons/facebook.icon";
import { WhatsappIcon } from "@/components/icons/whatsapp.icon";
import { EMAIL_ADDRESS, FACEBOOK_URL, PHONE_NUMBER } from "@/utils/constants";
import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="px-4 pt-8 pb-4 bg-primary-orange text-white">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 mx-8">
        <img
          src="/logo-orange.png"
          alt="Let's Give Back"
          className="size-16 md:size-32 hover:rotate-12 transition-transform duration-200"
        />

        <div className="text-center md:text-left">
          <p className="text-4xl font-bold">Let&apos;s Give Back CLG</p>
          <p>Based in Co. Monaghan, Ireland.</p>

          <p className="text-2xl font-bold mt-8 mb-4">Get In Touch</p>
          <div className="flex flex-col md:flex-row items-center md:items-start flex-wrap gap-4">
            <Anchor
              href={`https://wa.me/${PHONE_NUMBER}`}
              className="hover:text-light-orange hover:[&>svg]:fill-light-orange"
              isExternal
            >
              <WhatsappIcon size={24} className="fill-white" />
              WhatsApp
            </Anchor>
            <Anchor
              href={`tel:${PHONE_NUMBER}`}
              className="hover:text-light-orange hover:[&>svg]:fill-light-orange"
              isExternal
            >
              <Phone size={24} className="fill-white" />
              {PHONE_NUMBER}
            </Anchor>
            <Anchor
              href={FACEBOOK_URL}
              className="hover:text-light-orange hover:[&>svg]:fill-light-orange"
              isExternal
            >
              <FacebookIcon size={24} className="fill-white" />
              Facebook
            </Anchor>
            <Anchor
              href={`mailto:${EMAIL_ADDRESS}`}
              className="hover:text-light-orange hover:[&>svg]:stroke-light-orange"
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
