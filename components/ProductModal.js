import React from "react";

const ProductModal = ({ product, onClose }) => {
  console.log("product: ", product);
  return (
    <div
      className="modal"
      id="productModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <p>
              <strong>User ID:</strong> {product.id}
            </p>
            <p>
              <strong>Title:</strong> {product.title}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Rate:</strong> {product.rating.rate}
            </p>
            <img
              id="modal-image"
              src={product.image}
              alt="Product Image"
              className="img-fluid"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
