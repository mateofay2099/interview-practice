import { CartModal } from "./CartModal";
import { useState } from "react";
import { useCart } from "./CartProvider";

export const CartButton = () => {
  const [showCartModal, setShowCartModal] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
      <h3
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => setShowCartModal(true)}
      >
        Cart ({cartCount})
      </h3>
    </>
  );
};
