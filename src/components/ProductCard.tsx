"use client";

import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = () => {
  const router = useRouter();

  const handleViewDetails = () => {
    console.log(" view deatil clicked");
    router.push("/treatment/treatment1");
  };

  return (
    <div className="group w-full max-w-[280px]">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src="/products/product-1.jpg"
          alt="Product name"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart size={18} strokeWidth={1.8} />
        </button>

        {/* Add to cart */}
        <button
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            Hydrating Face Cream
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Star size={13} fill="currentColor" />
            4.8
          </div>
        </div>

        <p className="text-sm text-gray-500">Moisturizer</p>

        <p className="pt-1 text-base font-semibold text-gray-900">₹899</p>
      </div>
    </div>
  );
};

export default ProductCard;
