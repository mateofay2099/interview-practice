import { TitleWithBackButton } from "@/components/common/TitleWithBackButton";
import { ShoppingCartSolution } from "@/components/shoppingCart/ShoppingCartSolution";

export default function shoppingCart() {
  return (
    <>
      <TitleWithBackButton title="Shopping Cart" />
      <p>
        We want to build a supermarket shopping experience. You should be able
        to browse a list of goods, select how many to purchase, and add them to
        a shopping cart component. The shopping cart should sum the pricing of
        all selected goods.
      </p>
      <p>
        The UX should include being able to select multiple quantities of an
        item, and the store also has availability items. That is, you cannot add
        to your shopping cart more items that are available.
        <br />
        Tip: Consider the data structure correctly for computational and memory
        performance as well as a usuable API.
      </p>

      <div
        style={{
          padding: "10px 40px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Solution:</h2>
        <ShoppingCartSolution />
      </div>
    </>
  );
}
