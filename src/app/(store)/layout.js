import { Header } from "@/components/Header";
import { CartProvider } from "@/contexts/cart-context";

export default function StoreLayout({ children }) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[auto_1fr] gap-5 p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  );
}
