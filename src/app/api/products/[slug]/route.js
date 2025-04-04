import data from "../data.json";
import { z } from "zod";

export async function GET(_, { params }) {
  try {
    const slug = z.string().parse(params.slug);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const product = data.products.find((product) => product.slug === slug);

    if (!product) {
      return Response.json({ message: "Product not found." }, { status: 404 });
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Invalid slug format." }, { status: 400 });
  }
}
