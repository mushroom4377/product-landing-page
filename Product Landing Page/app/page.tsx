import Image from "next/image";
import { BadgeCheck, Clock, Headphones, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { OrderButton } from "@/components/OrderButtons";
import { ProductGallery } from "@/components/ProductGallery";
import { QuantityOrderPanel } from "@/components/QuantityOrderPanel";
import { formatMoney } from "@/lib/format";
import { product } from "@/lib/product";

const trust = [
  { icon: ShieldCheck, label: "Cash on Delivery" },
  { icon: Truck, label: "Fast delivery" },
  { icon: Headphones, label: "Customer support" },
  { icon: BadgeCheck, label: "Quality checked" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-coal text-shell">
      <section className="relative border-b border-shell/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(246,166,35,0.18),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(127,166,80,0.16),transparent_28%)]" />
        <div className="section-shell relative grid min-h-[92vh] items-center gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-lg border border-yolk/25 bg-shell/95 px-4 py-3 shadow-glow">
              <Image
                alt={`${product.brandName} logo`}
                className="h-12 w-auto object-contain"
                height={64}
                priority
                src="/images/Blue Minimalist Binocular Logo.png"
                width={180}
              />
              <span className="sr-only">{product.brandName}</span>
            </div>
            <h1 className="text-4xl font-black leading-tight text-shell sm:text-5xl lg:text-6xl">
              {product.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-shell/74">{product.subheadline}</p>
            <p className="mt-4 max-w-xl leading-7 text-shell/62">{product.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <OrderButton label="Purchase Now" quantity={product.offerQuantity} />
              <OrderButton label="Order Now" quantity={1} variant="secondary" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trust.map(({ icon: Icon, label }) => (
                <div className="rounded-md border border-shell/10 bg-shell/7 p-3" key={label}>
                  <Icon className="mb-2 h-5 w-5 text-yolk" />
                  <p className="text-sm font-semibold text-shell/80">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-yolk/20 blur-3xl" />
            <div className="relative aspect-square overflow-hidden rounded-lg border border-shell/10 bg-shell shadow-glow">
              <Image
                alt="Basket of Himalayan Fresh Eggs"
                className="object-contain p-5"
                fill
                priority
                src={product.images[0]}
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-10 py-20 lg:grid-cols-[1fr_0.95fr]">
        <ProductGallery />
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-yolk">Fresh daily supply</p>
          <h2 className="text-3xl font-black sm:text-4xl">{product.name}</h2>
          <p className="mt-4 leading-7 text-shell/70">{product.description}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.benefits.slice(0, 6).map((benefit) => (
              <li className="flex gap-3 rounded-md bg-shell/7 p-3 text-sm text-shell/76" key={benefit}>
                <Sparkles className="h-5 w-5 shrink-0 text-yolk" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <QuantityOrderPanel />
          </div>
        </div>
      </section>

      <section className="border-y border-shell/10 bg-shell/5 py-18">
        <div className="section-shell py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-yolk">Why buy this product</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Healthy food that fits every day</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((benefit) => (
              <div className="rounded-lg border border-shell/10 bg-coal/75 p-5" key={benefit}>
                <BadgeCheck className="mb-4 h-6 w-6 text-leaf" />
                <p className="font-semibold leading-7 text-shell/82">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <OrderButton label="Order Now" quantity={product.offerQuantity} />
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-yolk">Customer reviews</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Trusted by daily customers</h2>
          </div>
          <OrderButton label="Buy Now" quantity={product.offerQuantity} variant="secondary" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {product.testimonials.map((testimonial) => (
            <article className="rounded-lg border border-shell/10 bg-shell/7 p-6" key={testimonial.name}>
              <p className="text-yolk">★★★★★</p>
              <p className="mt-4 leading-7 text-shell/76">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-5 font-bold">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-shell/10 bg-shell/5 py-20">
        <div className="section-shell">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-yolk">Questions</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Frequently asked questions</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="rounded-lg border border-yolk/20 bg-[linear-gradient(135deg,rgba(246,166,35,0.16),rgba(127,166,80,0.08))] p-8 text-center sm:p-12">
          <Clock className="mx-auto mb-5 h-10 w-10 text-yolk" />
          <h2 className="text-3xl font-black sm:text-4xl">Order fresh eggs today</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-shell/72">
            Get the best offer: 2 crates for {formatMoney(product.offerPrice)}. Cash On Delivery is available and delivery fee is free.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <OrderButton label="Purchase Now" quantity={product.offerQuantity} />
            <OrderButton label="Order Now" quantity={1} variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}
