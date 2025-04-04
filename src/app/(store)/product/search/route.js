import { z } from "zod";
import data from "../data.json";

export async function GET(request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const searchParams = request.nextUrl.searchParams;
  const query = z.string().parse(searchParams.get("q"));

  const filteredProducts = data.products.filter((product) => {
    return product.title.toLowerCase().includes(query.toLowerCase());
  });

  return Response.json(filteredProducts);
}
