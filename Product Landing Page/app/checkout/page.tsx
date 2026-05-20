import { Suspense } from "react";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-coal px-4 py-8 text-shell">Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
