"use client";
import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaTrash, FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { createCheckoutSession } from "@/lib/createCheckoutSession.action";
import { useCart } from "@/app/components/CartProvider";
import CartItemRow from "@/app/components/CartItemRow";

function CartSkeleton() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div
        className="animate-pulse"
        aria-label="Loading shopping cart"
        role="status"
      >
        <div className="mb-8 h-6 w-40 rounded bg-gray-100" />

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-xl bg-gray-100"
              />
            ))}
          </div>

          <div className="h-64 rounded-xl bg-gray-100" />
        </div>

        <span className="sr-only">Loading your cart...</span>
      </div>
    </main>
  );
}

function EmptyCart({
  authenticated,
}: {
  authenticated: boolean;
}) {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <div
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
        aria-hidden="true"
      >
        <FaShoppingCart size={28} className="text-gray-300" />
      </div>

      <h1 className="mb-2 text-xl font-semibold text-gray-900">
        {authenticated
          ? "Your cart is empty"
          : "Sign in to view your cart"}
      </h1>

      <p className="mb-6 text-gray-500">
        {authenticated
          ? "Looks like you haven&apos;t added anything to your cart yet."
          : "Your cart is tied to your account. Log in to see your items."}
      </p>

      {authenticated ? (
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-green-600 px-5 py-2.5 font-medium text-white transition-all hover:bg-green-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          Continue Shopping
        </Link>
      ) : (
        <Link
          href="/login"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 font-medium text-white transition-all hover:bg-green-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaUser size={14} aria-hidden="true" />
          Sign In
        </Link>
      )}
    </main>
  );
}

export default function CartPage() {
  const { status } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const {
    items,
    loading,
    numOfCartItems,
    totalCartPrice,
    clearCart,
  } = useCart();
  const handleCheckout = async () => {
    if (checkoutLoading) {
      return;
    }

    setCheckoutLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/allorders`;

      const result = await createCheckoutSession(
        {
          details: "Test address",
          phone: "01000000000",
          city: "Cairo",
          postalCode: "12345",
        },
        redirectUrl
      );

      if (!result.success || !result.data?.url) {
        toast.error(
          result.message ?? "Couldn't start checkout."
        );

        return;
      }

      window.location.href = result.data.url;
    } catch {
      toast.error(
        "Couldn't start checkout. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };
  if (status === "loading") {
    return <CartSkeleton />;
  }

  if (status === "unauthenticated") {
    return <EmptyCart authenticated={false} />;
  }

  if (loading) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCart authenticated />;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 text-sm text-gray-500"
      >
        <Link
          href="/"
          className="transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          Home
        </Link>

        <span className="mx-2" aria-hidden="true">
          /
        </span>

        <span className="text-gray-700" aria-current="page">
          Shopping Cart
        </span>
      </nav>

      {/* Page Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white"
            aria-hidden="true"
          >
            <FaShoppingCart size={18} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Shopping Cart
          </h1>
        </div>

        <p className="mt-1 text-gray-500">
          You have{" "}
          <span className="font-semibold text-green-600">
            {numOfCartItems}
          </span>{" "}
          {numOfCartItems === 1 ? "item" : "items"} in your cart
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <section
          className="space-y-4 lg:col-span-2"
          aria-labelledby="cart-items-heading"
        >
          <h2 id="cart-items-heading" className="sr-only">
            Cart items
          </h2>

          {items.map((item) => (
            <CartItemRow key={item._id} item={item} />
          ))}

          {/* Cart Actions */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="inline-flex min-h-10 items-center text-sm font-medium text-green-600 transition-colors hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              ← Continue Shopping
            </Link>

            <button
              type="button"
              onClick={() => void clearCart()}
              className="inline-flex min-h-10 items-center gap-2 self-start text-sm text-gray-400 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:self-auto"
            >
              <FaTrash size={12} aria-hidden="true" />
              Clear all items
            </button>
          </div>
        </section>

        {/* Order Summary */}
        <aside
          className="overflow-hidden rounded-xl border border-gray-200 bg-white lg:sticky lg:top-24"
          aria-labelledby="order-summary-heading"
        >
          <div className="bg-slate-900 px-5 py-4">
            <h2
              id="order-summary-heading"
              className="font-semibold text-white"
            >
              Order Summary
            </h2>
          </div>

          <div className="space-y-3 p-5">
            <div className="flex justify-between gap-4 text-sm text-gray-600">
              <span>
                Subtotal ({numOfCartItems}{" "}
                {numOfCartItems === 1 ? "item" : "items"})
              </span>

              <span className="shrink-0 font-medium text-gray-900">
                {totalCartPrice.toLocaleString()} EGP
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm text-gray-600">
              <span>Shipping</span>

              <span className="text-right font-medium text-green-600">
                Calculated at checkout
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-t border-gray-100 pt-3">
              <span className="font-semibold text-gray-900">
                Estimated Total
              </span>

              <span className="shrink-0 text-lg font-bold text-green-600">
                {totalCartPrice.toLocaleString()} EGP
              </span>
            </div>

            {status === "authenticated" ? (
       <button
  type="button"
  onClick={() => void handleCheckout()}
  disabled={checkoutLoading}
  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 py-3 font-medium text-white transition-all hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
>
  {checkoutLoading ? (
    <>
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        aria-hidden="true"
      />
      Redirecting to Checkout...
    </>
  ) : (
    "Proceed to Checkout"
  )}
</button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 py-3 font-medium text-white transition-all hover:bg-green-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  <FaUser size={14} aria-hidden="true" />
                  Login to Checkout
                </Link>

                <p className="text-center text-xs text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-green-600 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            )}

            <ul className="space-y-1.5 pt-2 text-xs text-gray-500">
              <li className="flex items-center gap-2">
                <span
                  className="text-green-600"
                  aria-hidden="true"
                >
                  ✓
                </span>
                Your cart items will be saved
              </li>

              <li className="flex items-center gap-2">
                <span
                  className="text-green-600"
                  aria-hidden="true"
                >
                  ✓
                </span>
                Track your orders easily
              </li>

              <li className="flex items-center gap-2">
                <span
                  className="text-green-600"
                  aria-hidden="true"
                >
                  ✓
                </span>
                Access exclusive member deals
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}