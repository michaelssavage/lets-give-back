import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email().min(1).max(100),
  phone: z.string().optional(),
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
      subject: `New message from ${data.name} via letsgiveback.ie`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        ``,
        `Message:`,
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return { success: true };
  });
