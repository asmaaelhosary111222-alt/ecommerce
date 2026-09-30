"use client";

import Image from "next/image";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

import type { CartItem } from "@/lib/types";
import { useCart } from "@/app/components/CartProvider";

export default function CartItemRow({ item }: { item: CartItem }) {
  const {
    updateQuantity,
    removeFromCart,
    updatingProductId,
    removingProductId,
  } = useCart();

  const { product, count, price } = item;

  const lineTotal = price * count;

  const atMin = count <= 1;

  const atMax =
    typeof product.quantity === "number" &&
    count >= product.quantity;

  const isUpdating = updatingProductId === product.id;
  const isRemoving = removingProductId === product.id;

  // Any cart operation currently affecting this product.
  const isPending = isUpdating || isRemoving;

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm sm:flex-row">
      {/* Product image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </div>

      {/* Product information */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="line-clamp-2 font-medium text-gray-900">
          {product.title}
        </h3>

        {product.category?.name && (
          <span className="w-fit rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
            {product.category.name}
          </span>
        )}

        <p className="font-semibold text-green-600">
          {price.toLocaleString()} EGP
        </p>

        <div className="mt-1 flex items-center justify-between gap-3">
          {/* Quantity controls */}
          <div
            className="flex items-center gap-2"
            aria-label={`Quantity for ${product.title}`}
          >
            <button
              type="button"
              disabled={atMin || isPending}
              aria-label={`Decrease quantity of ${product.title}`}
              onClick={() =>
                void updateQuantity(product.id, count - 1)
              }
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <FaMinus size={10} aria-hidden="true" />
            </button>

            {/* Quantity / update spinner */}
            <span
              className="flex h-7 w-7 items-center justify-center text-center font-medium text-gray-900"
              aria-live="polite"
              aria-label={
                isUpdating
                  ? `Updating quantity for ${product.title}`
                  : `Quantity: ${count}`
              }
            >
              {isUpdating ? (
                <FaSpinner
                  className="animate-spin text-green-600"
                  size={14}
                  aria-hidden="true"
                />
              ) : (
                count
              )}
            </span>

            <button
              type="button"
              disabled={atMax || isPending}
              aria-label={`Increase quantity of ${product.title}`}
              onClick={() =>
                void updateQuantity(product.id, count + 1)
              }
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white transition-all hover:bg-green-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-green-600"
            >
              <FaPlus size={10} aria-hidden="true" />
            </button>
          </div>

          {/* Total + remove */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Total</p>

              <p className="font-semibold text-gray-900">
                {lineTotal.toLocaleString()}{" "}
                <span className="text-xs font-normal">
                  EGP
                </span>
              </p>
            </div>

            <button
              type="button"
              disabled={isPending}
              onClick={() => void removeFromCart(product.id)}
              aria-label={
                isRemoving
                  ? `Removing ${product.title}`
                  : `Remove ${product.title} from cart`
              }
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition-all hover:bg-red-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-50"
            >
              {isRemoving ? (
                <FaSpinner
                  className="animate-spin"
                  size={13}
                  aria-hidden="true"
                />
              ) : (
                <FaTrash
                  size={13}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}