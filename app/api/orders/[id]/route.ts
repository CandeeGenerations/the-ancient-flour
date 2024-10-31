import { orders } from "@/lib/data";
import { notFound } from "next/navigation";

// Generate static params for all possible order IDs
export function generateStaticParams() {
  return Array.from(orders.keys()).map((id) => ({
    id: id.toString(),
  }));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const order = orders.get(params.id);

  if (!order) {
    notFound();
  }

  return Response.json(order);
}