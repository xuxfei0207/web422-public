// components/ProductTable.js
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setSelectedProduct(product);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Assignment3 (WEB422)
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                name="search"
                placeholder="Product ID (Number)"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div class="container mt-5">
        <table className="table table-striped mt-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Category</th>
              <th scope="col">Rate</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} onClick={() => handleRowClick(product)}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{product.category}</td>
                <td>{product.rating.rate}</td>
                <td>{product.rating.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && <ProductDetails product={selectedProduct} />}
    </>
  );
};

export default ProductTable;
