import { NextRequest, NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/googleSheets";
import { orderSchema, prepareOrder } from "@/lib/orderSchema";
import { sendOrderEmails } from "@/lib/email";

function isAllowedOrigin(request: NextRequest) {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) return true;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === frontendUrl;
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ success: false, error: "Request origin is not allowed." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Invalid order data.",
          issues: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const order = prepareOrder(parsed.data);

    await appendOrderToSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({ success: true, orderId: order.orderId });
  } catch (error) {
    console.error("Order submission failed", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Order submission failed. Please check server configuration and try again."
      },
      { status: 500 }
    );
  }
}
