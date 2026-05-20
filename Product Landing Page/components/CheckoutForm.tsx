"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, Loader2, LockKeyhole, Send } from "lucide-react";
import Link from "next/link";
import { formatMoney, parsePositiveInt } from "@/lib/format";
import { calculateTotal, product } from "@/lib/product";

type FormState = {
  customerName: string;
  phone: string;
  email: string;
  location: string;
};

type Errors = Partial<Record<keyof FormState | "form", string>>;

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quantity = parsePositiveInt(searchParams.get("quantity"), product.offerQuantity);
  const pricePerPiece = Number(searchParams.get("price")) || product.regularPrice;
  const totalPrice = Number(searchParams.get("total")) || calculateTotal(quantity);
  const selectedProduct = searchParams.get("product") || product.name;

  const [form, setForm] = useState<FormState>({
    customerName: "",
    phone: "",
    email: "",
    location: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const summary = useMemo(
    () => [
      { label: "Product Name", value: selectedProduct },
      { label: "Quantity", value: String(quantity) },
      { label: "Price Per Piece", value: formatMoney(pricePerPiece) },
      { label: "Total Price", value: formatMoney(totalPrice) }
    ],
    [pricePerPiece, quantity, selectedProduct, totalPrice]
  );

  function validate() {
    const nextErrors: Errors = {};
    if (!form.customerName.trim()) nextErrors.customerName = "Full name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.location.trim()) nextErrors.location = "Exact location is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productName: selectedProduct,
          quantity,
          pricePerPiece,
          totalPrice
        })
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Order submission failed. Please try again.");
      }

      const params = new URLSearchParams({
        product: selectedProduct,
        quantity: String(quantity),
        total: String(totalPrice),
        orderId: result.orderId
      });
      router.push(`/thank-you?${params.toString()}`);
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "Order submission failed. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="min-h-screen bg-coal px-4 py-8 text-shell">
      <div className="mx-auto w-full max-w-5xl">
        <Link className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-shell/70 hover:text-yolk" href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to product
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr]">
          <section className="rounded-lg border border-shell/10 bg-shell/7 p-5 sm:p-7">
            <p className="text-sm font-bold uppercase tracking-widest text-yolk">Cash On Delivery Checkout</p>
            <h1 className="mt-3 text-3xl font-black">Complete your order</h1>
            <p className="mt-3 text-sm leading-6 text-shell/65">
              Fill in your contact details. Product and price details are filled automatically from your selection.
            </p>

            {errors.form ? (
              <div className="mt-5 rounded-md border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
                {errors.form}
              </div>
            ) : null}

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <Field
                error={errors.customerName}
                label="Full Name"
                onChange={(value) => updateField("customerName", value)}
                value={form.customerName}
              />
              <Field
                error={errors.phone}
                label="Phone Number"
                onChange={(value) => updateField("phone", value)}
                type="tel"
                value={form.phone}
              />
              <Field
                error={errors.email}
                label="Email Address"
                onChange={(value) => updateField("email", value)}
                type="email"
                value={form.email}
              />
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-shell/80">Exact Location</span>
                <textarea
                  className="min-h-28 rounded-md border border-shell/10 bg-coal/75 px-4 py-3 text-shell outline-none transition placeholder:text-shell/35 focus:border-yolk"
                  onChange={(event) => updateField("location", event.target.value)}
                  placeholder="Kindly share your exact location"
                  value={form.location}
                />
                {errors.location ? <span className="text-sm text-red-200">{errors.location}</span> : null}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                {summary.map((item) => (
                  <label className="grid gap-2" key={item.label}>
                    <span className="text-sm font-semibold text-shell/80">{item.label}</span>
                    <input
                      className="rounded-md border border-shell/10 bg-coal/60 px-4 py-3 text-shell/78 outline-none"
                      readOnly
                      value={item.value}
                    />
                  </label>
                ))}
              </div>

              <button
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-yolk px-5 py-3 text-sm font-black text-coal transition hover:bg-shell disabled:cursor-not-allowed disabled:opacity-65"
                disabled={submitting}
                type="submit"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Submitting Order..." : "Order Now"}
              </button>
            </form>
          </section>

          <aside className="rounded-lg border border-shell/10 bg-shell p-5 text-coal sm:p-7">
            <LockKeyhole className="mb-4 h-7 w-7 text-moss" />
            <h2 className="text-2xl font-black">Order summary</h2>
            <div className="mt-6 divide-y divide-coal/10">
              {summary.map((item) => (
                <div className="flex justify-between gap-4 py-4" key={item.label}>
                  <span className="text-sm text-coal/60">{item.label}</span>
                  <span className="text-right font-bold">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 py-4">
                <span className="text-sm text-coal/60">Payment Method</span>
                <span className="text-right font-bold">Cash On Delivery</span>
              </div>
            </div>
            <div className="mt-5 rounded-md bg-coal p-4 text-shell">
              <p className="text-sm text-shell/62">You will pay after your order is confirmed and delivered.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  error,
  label,
  onChange,
  type = "text",
  value
}: {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-shell/80">{label}</span>
      <input
        className="rounded-md border border-shell/10 bg-coal/75 px-4 py-3 text-shell outline-none transition placeholder:text-shell/35 focus:border-yolk"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
      {error ? <span className="text-sm text-red-200">{error}</span> : null}
    </label>
  );
}
