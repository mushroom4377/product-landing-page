import type { PreparedOrder } from "@/lib/orderSchema";
import { formatMoney } from "@/lib/format";

function escapeHtml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const brand = () => process.env.BRAND_NAME || "Himalayan Fresh Eggs";
const supportEmail = () => process.env.EMAIL_FROM || process.env.BUSINESS_EMAIL || "";

function shell(content: string) {
  return `
  <div style="margin:0;padding:0;background:#f6f0e7;font-family:Arial,Helvetica,sans-serif;color:#1c1a16;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f0e7;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #eadfce;">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

function header(title: string) {
  return `
    <tr>
      <td style="background:#10130c;padding:28px 28px 24px;color:#f5eee3;">
        <div style="font-size:14px;font-weight:700;color:#f6a623;letter-spacing:.08em;text-transform:uppercase;">${escapeHtml(brand())}</div>
        <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;color:#f5eee3;">${escapeHtml(title)}</h1>
      </td>
    </tr>`;
}

function row(label: string, value: string | number) {
  return `
    <tr>
      <td style="padding:10px 0;color:#6b6256;font-size:14px;border-bottom:1px solid #f0e6d8;">${escapeHtml(label)}</td>
      <td align="right" style="padding:10px 0;color:#1c1a16;font-size:14px;font-weight:700;border-bottom:1px solid #f0e6d8;">${escapeHtml(value)}</td>
    </tr>`;
}

function detailsTable(rows: Array<[string, string | number]>) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      ${rows.map(([label, value]) => row(label, value)).join("")}
    </table>`;
}

export function businessOrderEmail(order: PreparedOrder) {
  return shell(`
    ${header("New order received")}
    <tr>
      <td style="padding:26px 28px;">
        <div style="display:inline-block;background:#f6a623;color:#11130d;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:700;">${escapeHtml(order.orderStatus)}</div>
        <p style="margin:18px 0 0;color:#5d554b;line-height:1.6;">A new Cash On Delivery order has been submitted. Please call the customer soon to confirm this order.</p>
        <h2 style="margin:24px 0 12px;font-size:18px;">Order details</h2>
        ${detailsTable([
          ["Order ID", order.orderId],
          ["Date & Time", order.dateTime]
        ])}
        <h2 style="margin:24px 0 12px;font-size:18px;">Customer details</h2>
        ${detailsTable([
          ["Customer Name", order.customerName],
          ["Phone Number", order.phone],
          ["Email Address", order.email],
          ["Exact Location", order.location]
        ])}
        <h2 style="margin:24px 0 12px;font-size:18px;">Product details</h2>
        ${detailsTable([
          ["Product Name", order.productName],
          ["Quantity", order.quantity],
          ["Price Per Piece", formatMoney(order.pricePerPiece)],
          ["Total Price", formatMoney(order.totalPrice)]
        ])}
        <h2 style="margin:24px 0 12px;font-size:18px;">Payment details</h2>
        ${detailsTable([
          ["Payment Method", order.paymentMethod],
          ["Order Status", order.orderStatus]
        ])}
        <div style="margin-top:24px;background:#fff7e8;border:1px solid #f1cf8f;border-radius:8px;padding:16px;color:#4f3811;font-weight:700;">
          Please call the customer soon to confirm this order.
        </div>
      </td>
    </tr>`);
}

export function customerOrderEmail(order: PreparedOrder) {
  return shell(`
    ${header("Your order has been received")}
    <tr>
      <td style="padding:26px 28px;">
        <p style="margin:0 0 16px;color:#5d554b;line-height:1.7;">Hi ${escapeHtml(order.customerName)},</p>
        <p style="margin:0 0 16px;color:#5d554b;line-height:1.7;">Thank you for your order. We have received your order successfully.</p>
        <h2 style="margin:24px 0 12px;font-size:18px;">Here are your order details</h2>
        ${detailsTable([
          ["Order ID", order.orderId],
          ["Product", order.productName],
          ["Quantity", order.quantity],
          ["Total Price", formatMoney(order.totalPrice)],
          ["Payment Method", order.paymentMethod]
        ])}
        <div style="margin-top:24px;background:#edf7e8;border:1px solid #cfe5c2;border-radius:8px;padding:16px;color:#263c1b;">
          Our sales representative will call you soon to confirm your order.
        </div>
        <p style="margin:22px 0 0;color:#5d554b;line-height:1.7;">For support, reply to this email: ${escapeHtml(supportEmail())}</p>
        <p style="margin:18px 0 0;color:#1c1a16;font-weight:700;">Thank you,<br />${escapeHtml(brand())}</p>
      </td>
    </tr>`);
}
