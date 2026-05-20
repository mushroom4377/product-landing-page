import { google } from "googleapis";
import type { PreparedOrder } from "@/lib/orderSchema";

const requiredGoogleEnv = [
  "GOOGLE_SHEET_ID",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_SHEET_TAB_NAME"
] as const;

function requireGoogleEnv() {
  const missing = requiredGoogleEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing Google Sheets environment variables: ${missing.join(", ")}`);
  }
}

export async function appendOrderToSheet(order: PreparedOrder) {
  requireGoogleEnv();

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME!;
  const escapedTabName = `'${tabName.replace(/'/g, "''")}'`;

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `${escapedTabName}!A:M`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          order.orderId,
          order.dateTime,
          order.customerName,
          order.phone,
          order.email,
          order.location,
          order.productName,
          order.quantity,
          order.pricePerPiece,
          order.totalPrice,
          order.paymentMethod,
          order.orderStatus,
          order.notes
        ]
      ]
    }
  });
}
