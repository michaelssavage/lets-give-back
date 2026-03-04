import { Anchor } from "@/components/anchor";
import { FacebookIcon } from "@/components/icons/facebook.icon";
import { WhatsappIcon } from "@/components/icons/whatsapp.icon";
import { EMAIL_ADDRESS, FACEBOOK_URL, PHONE_NUMBER } from "@/utils/constants";
import { Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="px-4 py-8 bg-primary-blue text-white">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 mx-16">
        <img src="/logo-orange.png" alt="Let's Give Back" className="size-24" />

        <div className="text-center md:text-left">
          <p className="text-2xl font-bold">Let&apos;s Give Back CLG</p>
          <p>Based in Co. Monaghan, Ireland.</p>
        </div>

        <div className="md:ml-auto flex flex-col gap-4 [&>a]:justify-center md:[&>a]:justify-end">
          <Anchor
            href={`https://wa.me/${PHONE_NUMBER}`}
            className="hover:text-primary-orange hover:[&>svg]:fill-primary-orange"
            isExternal
          >
            <WhatsappIcon size={24} className="fill-white" />
            {PHONE_NUMBER}
          </Anchor>

          <Anchor
            href={FACEBOOK_URL}
            className="hover:text-primary-orange hover:[&>svg]:fill-primary-orange"
            isExternal
          >
            <FacebookIcon size={24} className="fill-white" />
            Facebook
          </Anchor>

          <Anchor
            href={`mailto:${EMAIL_ADDRESS}`}
            className="hover:text-primary-orange hover:[&>svg]:stroke-primary-orange"
            isExternal
          >
            <Mail size={24} />
            Email
          </Anchor>
        </div>
      </div>

      <p>&copy; {new Date().getFullYear()} Let&apos;s Give Back</p>
    </footer>
  );
};
