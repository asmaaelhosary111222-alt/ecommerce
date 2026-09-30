import Link from "next/link";
import { Package } from "lucide-react";

import type { Product } from "@/lib/types";
import ProductCard from "../components/ProductCard";

interface ProductsResponse {
  data: Product[];
}

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data: ProductsResponse = await response.json();
  const products = data.data ?? [];

  return (
    <main>
      <header className="w-full bg-gradient-to-r from-green-600 to-green-400 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-sm text-green-50"
          >
            <Link
              href="/"
              className="rounded-sm transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
            >
              Home
            </Link>

            <span aria-hidden="true" className="mx-2">
              /
            </span>

            <span
              aria-current="page"
              className="font-medium text-white"
            >
              All Products
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 sm:h-16 sm:w-16"
            >
              <Package className="h-7 w-7 text-white sm:h-8 sm:w-8" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                All Products
              </h1>

              <p className="mt-1 text-sm text-green-50 sm:text-base">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="products-heading"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2
              id="products-heading"
              className="text-2xl font-bold text-gray-900"
            >
              All Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {products.length} products available
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <Package
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-gray-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No products found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are no products available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

