import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Product Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <div className="h-96 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="mt-2 flex items-center">
                <span className="text-yellow-500 mr-2">★★★★★</span>
                <span className="text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Free shipping on orders over $50</p>
              <p>30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;