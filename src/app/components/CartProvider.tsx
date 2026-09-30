"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import type { CartItem, CartResponse } from "@/lib/types";

import { getUserCart } from "@/lib/getUserCart.action";
import { addToCart as addToCartAction } from "@/lib/addToCart.action";
import { updateProductQtn } from "@/lib/updateProductQtn.action";
import { removeCartItem } from "@/lib/removeCartItem.action";
import { clearCart as clearCartAction } from "@/lib/clearCart.action";

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  numOfCartItems: number;
  totalCartPrice: number;

  addingProductId: string | null;
  updatingProductId: string | null;
  removingProductId: string | null;
  clearingCart: boolean;

  addToCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, count: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();

  const [items, setItems] = useState<CartItem[]>([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  const [addingProductId, setAddingProductId] = useState<string | null>(
    null
  );

  const [updatingProductId, setUpdatingProductId] = useState<string | null>(
    null
  );

  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null
  );

  const [clearingCart, setClearingCart] = useState(false);

  const resetCart = useCallback(() => {
    setItems([]);
    setNumOfCartItems(0);
    setTotalCartPrice(0);
  }, []);

  const applyCartData = useCallback((cart: CartResponse) => {
    setItems(cart.data.products ?? []);
    setNumOfCartItems(cart.numOfCartItems ?? 0);
    setTotalCartPrice(cart.data.totalCartPrice ?? 0);
  }, []);

  /**
   * Refreshes cart data without showing the full cart skeleton.
   */
  const refreshCart = useCallback(async (): Promise<boolean> => {
    const result = await getUserCart();

    if (!result.success || !result.data) {
      return false;
    }

    applyCartData(result.data as CartResponse);

    return true;
  }, [applyCartData]);

  /**
   * Initial/full cart loading.
   *
   * This remains separate from refreshCart so update/remove
   * operations don't replace the cart with a skeleton.
   */
  const fetchCart = useCallback(async (): Promise<boolean> => {
    setLoading(true);

    try {
      const result = await getUserCart();

      if (!result.success || !result.data) {
        toast.error(
          result.message ?? "Couldn't load your cart. Please try again."
        );

        return false;
      }

      applyCartData(result.data as CartResponse);

      return true;
    } catch {
      toast.error(
        "Couldn't load your cart. Please check your connection."
      );

      return false;
    } finally {
      setLoading(false);
    }
  }, [applyCartData]);

  useEffect(() => {
    if (status === "authenticated") {
      void fetchCart();
      return;
    }

    if (status === "unauthenticated") {
      resetCart();
      setLoading(false);
    }
  }, [status, fetchCart, resetCart]);

  const addToCart = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        toast.error("Please log in to add items to your cart.");
        return;
      }

      if (addingProductId === productId) {
        return;
      }

      setAddingProductId(productId);

      try {
        const result = await addToCartAction(productId);

        if (!result.success || !result.data) {
          toast.error(
            result.message ?? "Couldn't add this item to your cart."
          );

          return;
        }

        applyCartData(result.data as CartResponse);

        toast.success(result.message ?? "Added to cart.");
      } catch {
        toast.error(
          "Couldn't add this item. Please check your connection."
        );
      } finally {
        setAddingProductId(null);
      }
    },
    [status, addingProductId, applyCartData]
  );

  const updateQuantity = useCallback(
    async (productId: string, count: number) => {
      if (status !== "authenticated") {
        return;
      }

      if (updatingProductId === productId) {
        return;
      }

      setUpdatingProductId(productId);

      try {
        const result = await updateProductQtn(productId, count);

        if (!result.success) {
          toast.error(
            result.message ?? "Couldn't update quantity."
          );

          return;
        }

        const refreshed = await refreshCart();

        if (!refreshed) {
          toast.error(
            "Quantity updated, but the cart could not be refreshed."
          );
        }
      } catch {
        toast.error(
          "Couldn't update quantity. Please check your connection."
        );
      } finally {
        setUpdatingProductId(null);
      }
    },
    [status, updatingProductId, refreshCart]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        return;
      }

      if (removingProductId === productId) {
        return;
      }

      setRemovingProductId(productId);

      try {
        const result = await removeCartItem(productId);

        if (!result.success) {
          toast.error(
            result.message ?? "Couldn't remove this item."
          );

          return;
        }

        const refreshed = await refreshCart();

        if (!refreshed) {
          toast.error(
            "Item removed, but the cart could not be refreshed."
          );
        }
      } catch {
        toast.error(
          "Couldn't remove this item. Please check your connection."
        );
      } finally {
        setRemovingProductId(null);
      }
    },
    [status, removingProductId, refreshCart]
  );

  const clearCart = useCallback(async () => {
    if (status !== "authenticated") {
      return;
    }

    if (clearingCart) {
      return;
    }

    setClearingCart(true);

    try {
      const result = await clearCartAction();

      if (!result.success) {
        toast.error(
          result.message ?? "Couldn't clear your cart."
        );

        return;
      }

      const refreshed = await refreshCart();

      if (!refreshed) {
        toast.error(
          "Cart cleared, but the cart could not be refreshed."
        );
      }
    } catch {
      toast.error(
        "Couldn't clear your cart. Please check your connection."
      );
    } finally {
      setClearingCart(false);
    }
  }, [status, clearingCart, refreshCart]);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        numOfCartItems,
        totalCartPrice,

        addingProductId,
        updatingProductId,
        removingProductId,
        clearingCart,

        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}