import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-around px-4 py-4">
      <h1 className="font-medium text-xl text-gray-800">Products</h1>

      <div className="flex items-center space-x-6">
        <ul className="flex items-center space-x-6">
          <li className="text-gray-700 text-sm font-medium cursor-pointer">Export</li>
          <li className="text-gray-700 text-sm font-medium cursor-pointer">Import</li>
          <li className="text-gray-700 text-sm font-medium cursor-pointer">More Options</li>
        </ul>
        
        <button className="bg-green-700 text-sm font-medium text-white rounded-md px-6 py-2 hover:bg-green-800">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Navbar;
