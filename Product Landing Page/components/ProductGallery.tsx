"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { product } from "@/lib/product";

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const currentImage = product.images[active];

  function move(direction: number) {
    setActive((index) => (index + direction + product.images.length) % product.images.length);
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-shell/10 bg-shell shadow-glow">
        <Image
          alt={`${product.name} product photo ${active + 1}`}
          className="object-contain p-5"
          fill
          priority={active === 0}
          src={currentImage}
          sizes="(max-width: 768px) 100vw, 48vw"
        />
        <button
          aria-label="Previous product image"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-coal/75 text-shell backdrop-blur transition hover:bg-coal"
          onClick={() => move(-1)}
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next product image"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-coal/75 text-shell backdrop-blur transition hover:bg-coal"
          onClick={() => move(1)}
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {product.images.map((image, index) => (
          <button
            aria-label={`Show product image ${index + 1}`}
            className={`relative aspect-square overflow-hidden rounded-md border bg-shell ${
              active === index ? "border-yolk" : "border-shell/10"
            }`}
            key={image}
            onClick={() => setActive(index)}
            type="button"
          >
            <Image
              alt={`${product.name} thumbnail ${index + 1}`}
              className="object-contain p-1"
              fill
              src={image}
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
