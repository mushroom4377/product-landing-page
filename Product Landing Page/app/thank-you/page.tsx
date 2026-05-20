import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";
import { formatMoney, parsePositiveInt } from "@/lib/format";
import { calculateTotal, product } from "@/lib/product";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(searchParams: Awaited<Props["searchParams"]>, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function ThankYouPage({ searchParams }: Props) {
  const params = await searchParams;
  const quantity = parsePositiveInt(getParam(params, "quantity") || null, product.offerQuantity);
  const total = Number(getParam(params, "total")) || calculateTotal(quantity);
  const orderedProduct = getParam(params, "product") || product.name;

  return (
    <main className="grid min-h-screen place-items-center bg-coal px-4 py-12 text-shell">
      <section className="w-full max-w-2xl rounded-lg border border-shell/10 bg-shell/7 p-6 text-center shadow-glow sm:p-10">
        <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-yolk" />
        <h1 className="text-4xl font-black">Thank you for your order!</h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-shell/70">
          Our sales representative will call you soon to confirm your order.
        </p>
        <div className="mt-8 grid gap-3 rounded-lg bg-coal/80 p-5 text-left">
          <Detail label="Product ordered" value={orderedProduct} />
          <Detail label="Quantity" value={`${quantity} ${quantity === 1 ? product.unit : `${product.unit}s`}`} />
          <Detail label="Total price" value={formatMoney(total)} />
          <Detail label="Payment method" value="Cash On Delivery" />
        </div>
        <Link
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-yolk px-5 py-3 text-sm font-bold text-coal transition hover:bg-shell"
          href="/"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </section>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-shell/10 py-3 last:border-0">
      <span className="text-sm text-shell/58">{label}</span>
      <span className="text-right font-bold">{value}</span>
    </div>
  );
}
