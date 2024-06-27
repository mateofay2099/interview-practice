import { Modal } from "../Modal";
import { ProductsList } from "../products/ProductsList";
import { useCart } from "./CartProvider";

export const CartModal = ({ onClose }) => {
  const { cart } = useCart();
  return (
    <Modal onClose={onClose}>
      <h2 style={{ marginBottom: "1rem" }}>Cart</h2>

      {cart.length > 0 ? (
        <ProductsList products={cart} />
      ) : (
        <>
          <h3
            style={{ textAlign: "center", color: "grey", marginBottom: "1rem" }}
          >
            Cart is empty
          </h3>
          <h3 style={{ textAlign: "center", color: "grey" }}>
            Start adding products!
          </h3>
        </>
      )}
    </Modal>
  );
};
