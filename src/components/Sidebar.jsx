import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  ShoppingCart,
  Truck,
  Boxes,
  Wallet,
  Star,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
  { name: 'Upload Products', path: '/admin/upload-products', icon: <UploadCloud size={20} /> },
  { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
  { name: 'Delivery Tracking', path: '/admin/delivery-tracking', icon: <Truck size={20} /> },
  { name: 'Stocks', path: '/admin/stocks', icon: <Boxes size={20} /> },
  { name: 'Expense', path: '/admin/expense', icon: <Wallet size={20} /> },
  { name: 'Reviews & Ratings', path: '/admin/reviews', icon: <Star size={20} /> },
  { name: 'Advertisement', path: '/admin/advertisement', icon: <Megaphone size={20} /> },
];

export default function Sidebar({ isCollapsed, toggleSidebar, isMobile, mobileMenuOpen }) {
  return (
    <>
      {/* Mobile toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md text-green-600 bg-white shadow-md shadow-green-400"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md shadow-green-400 z-40 
        transition-all duration-300 ease-in-out 
        ${isCollapsed ? 'w-20' : 'w-64'} 
        ${isMobile ? `${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` : 'translate-x-0'} 
        flex flex-col p-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h2 className="text-2xl font-extrabold text-green-600 select-none">Admin Panel</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="text-green-600 hover:text-green-800"
          >
            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-colors duration-200
                ${
                  isActive
                    ? 'bg-green-100 text-green-700 shadow-inner'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }
                ${isCollapsed ? 'justify-center' : ''}`
              }
              onClick={() => isMobile && toggleSidebar()}
            >
              <span className="text-green-600">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {!isCollapsed && (
          <div className="mt-auto pt-4 border-t border-green-100 text-xs text-green-600 text-center select-none">
            &copy; {new Date().getFullYear()} Cloths Admin by Baskar L
          </div>
        )}
      </aside>
    </>
  );
}
