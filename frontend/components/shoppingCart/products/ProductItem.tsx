import { useCart } from "../cart/CartProvider";
import { ProductActions } from "./ProductActions";

export const ProductItem = ({ product, addedCount }) => {
  const { updateCartItemCount } = useCart();
  return (
    <li
      style={{
        border: "1px solid grey",
        borderRadius: "12px",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h3>{product.name}</h3>
        <p>
          {product.price} {product.currency}
        </p>
        {product.stock < 5 && (
          <p style={{ color: "grey" }}>Only {product.stock} left!</p>
        )}
      </div>
      <ProductActions
        addedCount={addedCount}
        stock={product.stock}
        onUpdateCartItemCount={(newCount) =>
          updateCartItemCount(product, newCount)
        }
      />
    </li>
  );
};
