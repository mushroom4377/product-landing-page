import nodemailer from "nodemailer";
import type { PreparedOrder } from "@/lib/orderSchema";
import { businessOrderEmail, customerOrderEmail } from "@/lib/emailTemplates";

const requiredEmailEnv = ["BUSINESS_EMAIL", "EMAIL_FROM", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

function requireEmailEnv() {
  const missing = requiredEmailEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing email environment variables: ${missing.join(", ")}`);
  }
}

function createTransporter() {
  requireEmailEnv();

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendOrderEmails(order: PreparedOrder) {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM!;
  const replyTo = process.env.EMAIL_FROM!;
  const brand = process.env.BRAND_NAME || "Himalayan Fresh Eggs";

  await transporter.sendMail({
    from,
    to: process.env.BUSINESS_EMAIL!,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessOrderEmail(order)
  });

  await transporter.sendMail({
    from,
    to: order.email,
    replyTo,
    subject: `Your Order Has Been Received - ${brand}`,
    html: customerOrderEmail(order)
  });
}
