// components/ProductDetails.js
import React from 'react';

const ProductDetails = ({ product }) => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Product Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p><strong>User ID:</strong> {product.id}</p>
                <p><strong>Title:</strong> {product.title}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Rate:</strong> {product.rating.rate}</p>
                <img src={product.image} alt="Product Image" className="img-fluid" />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    );
};

export default ProductDetails;
