import ProductListings from "../components/ProductListings";
import { useEffect, useStat } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
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
      {jobs && <JobListings jobs={jobs} />}
    </div>
  );
};

export default Home;
