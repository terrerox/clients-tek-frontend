import { GraphQlData, GraphQlResponse } from "../types";

export async function graphQLFetch<T extends GraphQlData>(
  query: string,
  variables = {}
): Promise<GraphQlResponse<T>> {
  const url = import.meta.env.VITE_BASE_URL
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }

  const graphQlRes: GraphQlResponse<T> = await res.json();
  return graphQlRes;
}