import { CSSProperties } from "react";
import { useCart } from "../cart/CartProvider";

const buttonsStyle: CSSProperties = {
  backgroundColor: "#ebf0ec",
  cursor: "pointer",
  fontSize: "1.2rem",
  width: "2rem",
  height: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const ProductActions = ({
  addedCount,
  stock,
  onUpdateCartItemCount,
}) => {
  const decreaseDisabled = addedCount === 0;
  const noMoreStock = addedCount === stock;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button
          disabled={decreaseDisabled}
          style={{
            ...buttonsStyle,
            cursor: decreaseDisabled ? "not-allowed" : "pointer",
          }}
          onClick={() => onUpdateCartItemCount(addedCount - 1)}
        >
          -
        </button>
        <h3>{addedCount}</h3>
        <button
          onClick={() => onUpdateCartItemCount(addedCount + 1)}
          disabled={noMoreStock}
          style={{
            ...buttonsStyle,
            cursor: noMoreStock ? "not-allowed" : "pointer",
          }}
        >
          +
        </button>
      </div>
      {noMoreStock && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>No more stock!</p>
      )}
      {addedCount > 0 && (
        <button
          onClick={() => onUpdateCartItemCount(0)}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "0.3rem 0.5rem",
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};
