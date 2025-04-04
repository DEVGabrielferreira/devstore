import { AddCartButton } from "@/components/add-to-cart-button";
import Image from "next/image";

async function getProduct(slug) {
  const response = await fetch(`http://localhost:3000/api/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();
  return product;
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  return (
    <div className="relative grid max-h-[860px] grid-cols-3 overflow-hidden">
      <div className="col-span-2 h-[860px] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={1000}
          height={1000}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            R${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de R${(product.price / 12).toFixed(2)}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            {["P", "M", "G", "GG"].map((size) => (
              <button
                key={size}
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                {size}
              </button>
            ))}
          </div>

          <AddCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
