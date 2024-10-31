import { products } from "@/lib/db/products";
import { ProductForm } from "@/components/admin/product-form";

export function generateStaticParams() {
  return Object.keys(products).map((id) => ({
    id,
  }));
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id];

  if (!product) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}