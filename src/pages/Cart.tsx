import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItemComponent from '../components/CartItem';

const Cart: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart!</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="lg:flex gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            {cartItems.map(item => (
              <CartItemComponent key={item.product.id} item={item} />
            ))}
          </div>
          
          <div className="mt-4 flex justify-between">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              &larr; Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {getCartTotal() > 50 ? 'FREE' : '$5.00'}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>
                    ${(getCartTotal() + (getCartTotal() > 50 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors mb-4"
              onClick={() => alert('Checkout functionality would be implemented here!')}
            >
              Proceed to Checkout
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;