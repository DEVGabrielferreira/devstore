import { env } from "@/env";

export function api(path, init = {}) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
  const apiPrefix = "/api";
  const url = new URL(apiPrefix + path, baseUrl);
  return fetch(url, init);
}
