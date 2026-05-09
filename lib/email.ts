import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend || !process.env.EMAIL_FROM) return;
  await resend.emails.send({ from: process.env.EMAIL_FROM, to, subject, html });
}
