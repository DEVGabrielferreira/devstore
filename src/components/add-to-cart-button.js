"use client";

import { useCart } from "@/contexts/cart-context";

export function AddCartButton() {
  const { addToCart } = useCart();

  function handleAddProductToCart() {
    addToCart({ id: Date.now() });
  }

  return (
    <button
      type="button"
      onClick={handleAddProductToCart}
      className="mt-2 flex h-12 min-w-[200px] px-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  );
}
