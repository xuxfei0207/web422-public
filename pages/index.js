import ProductTable from "@/components/ProductTable";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProducts([data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.search.value;
    if (searchValue) {
      fetchProductById(searchValue);
    } else {
      fetchProducts();
    }
  };

  const handleRowClick = (product) => {
    console.log("clicked product: ", product);
    dispatch({ type: 'ADD_ITEM', payload: product });
  }

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <ProductTable products={products} handleRowClick={handleRowClick} />
    </>
  );
}
