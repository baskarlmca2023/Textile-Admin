import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, UserCircle2, LogOut } from 'lucide-react';

export default function Header({ isCollapsed, sidebarWidth }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current && !searchRef.current.contains(event.target) &&
        notificationsRef.current && !notificationsRef.current.contains(event.target) &&
        userMenuRef.current && !userMenuRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="bg-white shadow-sm shadow-green-500 px-6 py-4 flex justify-between items-center fixed top-0 z-30 transition-all duration-300 ease-in-out"
      style={{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }}
    >
      <h1 className="text-2xl font-extrabold text-green-600 select-none">.Cloths</h1>

      <div className="flex items-center gap-5 relative">
        {/* Search input */}
        {showSearch && (
          <div ref={searchRef} className="relative min-w-[200px] max-w-[320px]">
            <input
              type="text"
              className="border border-green-300 rounded px-3 py-1.5 outline-none w-full transition duration-300 focus:ring-2 focus:ring-green-400"
              placeholder="Search cloths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        )}

        {/* Search button */}
        <button
          onClick={() => {
            setShowSearch(!showSearch);
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
          className="text-green-600 w-6 h-6 hover:text-green-800"
        >
          <Search />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
              setShowSearch(false);
            }}
            className="text-green-600 w-6 h-6 hover:text-green-800"
          >
            <Bell />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-green-100 rounded shadow-lg text-sm z-50 animate-fadeIn">
              <ul>
                <li className="py-2 px-4 hover:bg-green-50 cursor-pointer border-b border-green-100">New order placed</li>
                <li className="py-2 px-4 hover:bg-green-50 cursor-pointer border-b border-green-100">Stock running low</li>
                <li className="py-2 px-4 hover:bg-green-50 cursor-pointer">New review submitted</li>
              </ul>
            </div>
          )}
        </div>

        {/* User profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
              setShowSearch(false);
            }}
            className="text-green-600 w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center"
          >
            <UserCircle2 size={28} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-green-100 rounded shadow-lg text-sm z-50 animate-fadeIn">
              {/* Admin Name */}
              <div className="px-4 py-2 border-b border-green-100">
                <p className="text-green-700 font-semibold">Baskar L</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-green-50 text-green-700 font-semibold"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


