import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { INVOLVEMENT_REASON_KEYS, INVOLVEMENT_REASONS } from "@/utils/constants";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email().min(1).max(100),
  phone: z.string().optional(),
  reason: z.enum(INVOLVEMENT_REASON_KEYS).optional(),
  message: z.string().min(1).max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Let's Give Back <noreply@letsgiveback.ie>",
      replyTo: data.email,
      to: "letsgivebackmonaghan@gmail.com",
      subject: data.reason
        ? `${INVOLVEMENT_REASONS[data.reason]}: ${data.name} via letsgiveback.ie`
        : `New message from ${data.name} via letsgiveback.ie`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        data.reason ? `Interested in: ${INVOLVEMENT_REASONS[data.reason]}` : null,
        ``,
        `Message:`,
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return { success: true };
  });
