import ProductListings from "../components/ProductListings";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsPending(true);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setIsPending(false);
        setProducts(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {products && <ProductListings products={products} />}
    </div>
  );
};

export default Home;
