import React from 'react';
import type { CartItem as CartItemType } from '../types/types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center border-b py-4">
      <div className="w-24 h-24 shrink-0">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="ml-4 grow">
        <h3 className="font-semibold text-lg">{item.product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-1">
          {item.product.description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
            >
              -
            </button>
            <span className="font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
            >
              +
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-xl font-bold text-green-600">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              ${item.product.price.toFixed(2)} each
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => removeFromCart(item.product.id)}
        className="ml-4 text-red-500 hover:text-red-700"
        aria-label="Remove item"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CartItemComponent;