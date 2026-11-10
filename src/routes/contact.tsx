import {
  contactFormSchema,
  sendContactEmail,
  type ContactFormData,
} from "@/api/send-email.api";
import { Anchor } from "@/components/anchor";
import { PhoneInput } from "@/components/form/phone-input";
import { TextInput } from "@/components/form/text-input";
import {
  INVOLVEMENT_REASON_KEYS,
  INVOLVEMENT_REASONS,
  PHONE_NUMBER,
  SITE_URL,
} from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { z } from "zod";

const contactSearchSchema = z.object({
  reason: z.enum(INVOLVEMENT_REASON_KEYS).optional().catch(undefined),
});

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
  validateSearch: contactSearchSchema,
  head: () => ({
    meta: [
      { title: "Contact Us" },
      { property: "og:title", content: "Contact Us" },
      { name: "description", content: "Contact Us" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Contact Us" },
      { property: "og:image", content: "/services/banner.jpg" },
      { property: "twitter:image", content: "/services/banner.jpg" },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
  }),
});

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

function RouteComponent() {
  const { reason } = Route.useSearch();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    reason,
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
    <section className="min-h-[70vh] px-6 md:px-12 pt-4 pb-12">
      <div className="mx-auto w-full max-w-2xl flex flex-col gap-4 bg-white border border-black rounded-sm p-8">
        <h1 className="text-4xl font-bold">
          Let&apos;s Build Something Meaningful Together
        </h1>
        <p className="text-secondary mb-4">
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
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-secondary mb-2">
              How would you like to get involved?{" "}
              <span className="font-normal text-secondary">(optional)</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {INVOLVEMENT_REASON_KEYS.map((key) => (
                <label
                  key={key}
                  className="cursor-pointer rounded-full border border-dark-blue px-3 py-1.5 text-sm transition has-checked:bg-dark-blue has-checked:text-white hover:bg-light-blue has-focus-visible:ring-2 has-focus-visible:ring-primary-orange"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={key}
                    checked={form.reason === key}
                    onChange={() => {}}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        reason: prev.reason === key ? undefined : key,
                      }))
                    }
                    className="sr-only"
                  />
                  {INVOLVEMENT_REASONS[key]}
                </label>
              ))}
            </div>
          </fieldset>
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
            className="bg-primary-orange text-white font-semibold rounded-md py-3 px-6 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
