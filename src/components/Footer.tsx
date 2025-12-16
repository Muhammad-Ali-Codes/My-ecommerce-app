import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-bold mb-2">ShopEasy Store</h3>
        <p className="text-gray-300 mb-2">
          Your one-stop shop for all your needs
        </p>
        <p className="text-gray-400">
          Contact: support@shopeasy.com | Phone: (123) 456-7890
        </p>
        <p className="text-gray-400 mt-2 text-sm">
          &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;