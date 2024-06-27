import { useCart } from "../cart/CartProvider";
import { ProductItem } from "./ProductItem";

const getAddedCount = (cart, productId) =>
  cart.find((p) => p.id === productId)?.count || 0;

export const ProductsList = ({ products }) => {
  const { cart } = useCart();
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem 0",
        listStyle: "none",
      }}
    >
      {products.map((product) => (
        <ProductItem
          key={`product-${product.id}`}
          product={product}
          addedCount={getAddedCount(cart, product.id)}
        />
      ))}
    </ul>
  );
};
