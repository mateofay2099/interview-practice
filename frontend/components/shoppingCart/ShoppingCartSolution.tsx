import { useEffect, useState } from "react";
import { CartButton } from "./cart/CartButton";
import { CartProvider } from "./cart/CartProvider";
import { ProductsList } from "./products/ProductsList";

const PRODUCTS = [
  { id: 1, name: "Iphone 14 Plus", price: 1200, currency: "USD", stock: 9 },
  { id: 2, name: "Samsung TV 55' OLED", price: 900, currency: "USD", stock: 3 },
  { id: 3, name: "Samsung Tab S8", price: 350, currency: "USD", stock: 1 },
  { id: 4, name: "Keyboard A71", price: 110, currency: "USD", stock: 27 },
  {
    id: 5,
    name: "Wireless Mouse MX Master",
    price: 40,
    currency: "USD",
    stock: 142,
  },
  {
    id: 6,
    name: "Macbook Pro 13-inch - M2",
    price: 2100,
    currency: "USD",
    stock: 2,
  },
];

// mocked API
const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS);
    }, 1000);
  });
};

export const ShoppingCartSolution = () => {
  const [products, setProducts] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setProducts(products);
        setLoaded(true);
      })
      .catch(console.error); // should probably show an error screen in real app
  }, []);

  return (
    <CartProvider>
      <div style={{ maxWidth: "40rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Products</h2>
          <CartButton />
        </div>
        {loaded ? (
          <ProductsList products={products} />
        ) : (
          <h3 style={{ textAlign: "center", color: "grey" }}>
            Loading products...
          </h3>
        )}
      </div>
    </CartProvider>
  );
};
