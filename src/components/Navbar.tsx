import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faBook, faComment, faLaptopCode, faSignOutAlt, faCog, faUserCircle, faShoppingCart, faFileInvoice, faStore, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../contexts/CartContext';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const { cartItems } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);

  // 监听滚动事件，控制navbar透明度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleCartDropdown = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] flex items-center ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-white shadow-md'}`}>
      <div className="container mx-auto max-w-[1100px] px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-primary">
            <span className="text-gradient italic font-serif transform -rotate-2 inline-block">KeepStudy</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">首页</Link>
          <Link to="/courses" className="nav-link">课程广场</Link>
          <Link to="/community" className="nav-link">交流社区</Link>
          {isLoggedIn && (
            <Link 
              to="/workspace" 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
            >
              学习工作台
            </Link>
          )}
          
          {isLoggedIn && (
            <div className="relative" ref={cartDropdownRef}>
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={toggleCartDropdown}
                onMouseEnter={() => setIsCartDropdownOpen(true)}
              >
                <div className="relative">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-gray-600 text-xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </div>
              
              {isCartDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200"
                  onMouseLeave={() => setIsCartDropdownOpen(false)}
                >
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-medium">购物车</h3>
                    </div>
                    
                    {cartItems.length > 0 ? (
                      <>
                        <div className="max-h-64 overflow-y-auto">
                          {cartItems.map(item => (
                            <div key={item.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                              <div className="flex">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="ml-3 flex-1">
                                  <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                                  <p className="text-primary text-sm font-medium">{item.price}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-3 border-t border-gray-100 bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-600">共 {cartItems.length} 门课程</span>
                            <Link to="/cart" className="text-red-500 text-sm hover:text-red-600">
                              管理购物车
                            </Link>
                          </div>
                          <Link 
                            to="/checkout" 
                            className="block w-full py-2 bg-primary text-white text-center rounded-md hover:bg-primary/90 transition-colors"
                            onClick={() => setIsCartDropdownOpen(false)}
                          >
                            去结算
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="text-gray-400 mb-2">
                          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                        </div>
                        <p className="text-gray-500 mb-4">购物车还是空的</p>
                        <Link 
                          to="/courses" 
                          className="text-primary hover:text-primary/90"
                          onClick={() => setIsCartDropdownOpen(false)}
                        >
                          去选课
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={toggleProfileDropdown}
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
              >
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="用户头像" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
                <span className="ml-2 text-sm font-medium">用户名</span>
              </div>
              
              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="py-2">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-gray-500" />
                      个人资料
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faFileInvoice} className="mr-2 text-gray-500" />
                      我的订单
                    </Link>
                    <Link 
                      to="/favorites" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faHeart} className="mr-2 text-gray-500" />
                      我的收藏
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faCog} className="mr-2 text-gray-500" />
                      设置
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      退出登录
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                登录
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 hover:text-white transition-colors"
              >
                注册
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-gray-600 hover:text-primary"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="nav-link-mobile" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              首页
            </Link>
            <Link to="/courses" className="nav-link-mobile" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              课程广场
            </Link>
            <Link to="/community" className="nav-link-mobile" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faComment} className="mr-2" />
              交流社区
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/workspace" className="nav-link-mobile bg-blue-50" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faLaptopCode} className="mr-2 text-blue-500" />
                  学习工作台
                </Link>
                <Link to="/cart" className="nav-link-mobile" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  购物车
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 inline-flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="nav-link-mobile" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faFileInvoice} className="mr-2" />
                  我的订单
                </Link>
              </>
            )}
            
            {isLoggedIn ? (
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="用户头像" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-medium">用户名</span>
                </div>
                <Link to="/profile" className="nav-link-mobile" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  个人资料
                </Link>
                <button 
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  className="w-full flex items-center justify-start p-2 rounded text-sm text-red-600 hover:bg-red-50 transition-colors mt-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  退出登录
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="w-full py-2 text-center border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  onClick={toggleMenu}
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="w-full py-2 text-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={toggleMenu}
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
