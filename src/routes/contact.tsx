import {
  contactFormSchema,
  sendContactEmail,
  type ContactFormData,
} from "@/api/send-email.api";
import { Anchor } from "@/components/anchor";
import { PhoneInput } from "@/components/form/PhoneInput";
import { TextInput } from "@/components/form/TextInput";
import { PHONE_NUMBER } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent, type SubmitEvent } from "react";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

function RouteComponent() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: () => sendContactEmail({ data: form }),
  });

  const handleChange =
    (field: keyof ContactFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutate();
  };

  if (isSuccess) {
    return (
      <section className="min-h-[70vh] grid place-items-center px-6">
        <div className="text-center flex flex-col items-center gap-4 max-w-md">
          <h1 className="text-4xl font-bold">Message sent!</h1>
          <p className="text-lg text-secondary">
            Thanks for getting in touch. We&apos;ll get back to you as soon as
            we can.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] flex flex-col-reverse md:flex-row gap-8 px-6 md:px-12 py-12">
      <div className="flex flex-col gap-4 mt-8">
        <h1 className="text-4xl font-bold text-center md:text-left">
          Let&apos;s Build Something Meaningful Together
        </h1>
        <p className="text-secondary mb-4 text-center md:text-left">
          Have a project in mind or want to learn more? Fill in the form and
          we&apos;ll get back to you. Or give us a text on{" "}
          <Anchor
            href="https://wa.me/353874376999"
            className="underline decoration-primary-orange underline-offset-4 decoration-5 hover:text-primary-orange inline-flex items-baseline"
            isExternal
          >
            WhatsApp
          </Anchor>
          {", "}
          or call us at{" "}
          <Anchor
            href={`tel:${PHONE_NUMBER}`}
            className="underline decoration-primary-orange underline-offset-4 decoration-5 hover:text-primary-orange inline-flex items-baseline"
            isExternal
          >
            {PHONE_NUMBER}
          </Anchor>{" "}
          if you prefer.
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d598049.9775066919!2d-7.603985724579202!3d54.160012524398496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48609f42f90be0fb%3A0xd600e0191225b84f!2sMonaghan%2C%20Co.%20Monaghan%2C%20Ireland!5e0!3m2!1sen!2ses!4v1773012139180!5m2!1sen!2ses"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Monaghan, Ireland"
        />
      </div>

      <div className="mx-auto md:mx-0 w-full max-w-xl flex flex-col gap-8 bg-white card-shadow rounded-2xl p-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Get in touch</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextInput
            id="name"
            name="name"
            label="Name"
            value={form.name}
            placeholder="Your name"
            required
            onChange={handleChange("name")}
          />
          <TextInput
            id="email"
            name="email"
            label="Email"
            type="email"
            value={form.email}
            placeholder="you@example.com"
            required
            onChange={handleChange("email")}
          />
          <PhoneInput
            id="phone"
            name="phone"
            label="Phone (optional)"
            placeholder="+353 ..."
            value={form.phone}
            onChange={(value, _isValid) => {
              setForm((prev) => ({ ...prev, phone: value }));
            }}
          />
          <TextInput
            id="message"
            name="message"
            label="Message"
            type="textarea"
            value={form.message}
            placeholder="Tell us about your project or how we can help..."
            required
            onChange={handleChange("message")}
          />

          {isError && (
            <p className="text-sm text-red-600">
              Something went wrong. Please try again or email us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary-orange text-white font-semibold rounded-xl py-3 px-6 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send message"}
          </button>

          <p className="text-sm text-secondary text-center">
            We&apos;ll only use your details to respond to your message.
          </p>
        </form>
      </div>
    </section>
  );
}
