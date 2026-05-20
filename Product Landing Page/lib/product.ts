export const product = {
  brandName: "Himalayan Fresh Eggs",
  name: "Farm Fresh Eggs",
  headline: "Clean, protein-rich eggs delivered fresh to your home",
  subheadline:
    "Perfect for breakfast, gym diets, family meals, cafes, hotels, and everyday healthy cooking.",
  description:
    "Get clean, fresh, and high-quality eggs at the best price. Every order is quality checked and prepared for fast Cash On Delivery fulfillment.",
  regularPrice: 450,
  pricePerPiece: 15,
  offerQuantity: 2,
  offerPrice: 850,
  unit: "crate",
  currency: "Rs.",
  deliveryFee: 0,
  images: [
    "/images/eggs-basket.png",
    "/images/eggs-trays.png",
    "/images/eggs-yolk.png",
    "/images/eggs-carton.png",
    "/images/egg-single.png"
  ],
  benefits: [
    "Rich in protein for muscle growth and energy",
    "Fresh and natural from healthy farm chickens",
    "Supports brain health and memory",
    "Good for eye health",
    "Keeps you full longer and supports fitness goals",
    "Packed with vitamins and nutrients",
    "Perfect for breakfast, gym diets, and family meals",
    "Clean, safe, and quality checked",
    "Affordable healthy food option",
    "Great taste with natural freshness"
  ],
  testimonials: [
    {
      name: "Suresh Rai",
      quote:
        "Very fresh eggs and the quality is amazing. My family loved the taste. Will definitely order again!"
    },
    {
      name: "Rohan Gurung",
      quote:
        "I use these eggs for my gym diet every day. Fresh, healthy, and worth the price."
    },
    {
      name: "Anisha Limbu",
      quote:
        "Fast delivery and clean packaging. The eggs feel much fresher than market eggs."
    }
  ],
  faqs: [
    {
      q: "Are your eggs farm fresh?",
      a: "Yes. Our eggs are collected fresh from healthy farm chickens and delivered with quality care."
    },
    {
      q: "Do you offer home delivery?",
      a: "Yes, we provide fast and reliable home delivery in selected areas."
    },
    {
      q: "Are the eggs healthy and safe to eat?",
      a: "Absolutely. Our eggs are clean, fresh, and quality checked before delivery."
    },
    {
      q: "How should I store the eggs?",
      a: "Store them in a cool place or inside a refrigerator to keep them fresh longer."
    },
    {
      q: "Are these eggs good for gym diets and fitness?",
      a: "Yes. Eggs are rich in protein and nutrients, making them perfect for fitness and healthy lifestyles."
    },
    {
      q: "How can I place an order?",
      a: "Choose your quantity, click an order button, and complete the checkout form."
    },
    {
      q: "Do you offer bulk orders for hotels, cafes, or shops?",
      a: "Yes, we also provide bulk orders for businesses and regular customers."
    }
  ]
};

export function calculateTotal(quantity: number) {
  const offerSets = Math.floor(quantity / product.offerQuantity);
  const remaining = quantity % product.offerQuantity;
  return offerSets * product.offerPrice + remaining * product.regularPrice + product.deliveryFee;
}
