import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, isLoading, removeFromCart, clearCart, calculateTotal } = useCartContext();
  const navigate = useNavigate();
  
  // 清空购物车
  const handleClearCart = () => {
    if (window.confirm('确定要清空购物车吗？')) {
      clearCart();
    }
  };
  
  // 结算
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-[72px] bg-gray-50">
      <div className="container mx-auto max-w-[1100px] px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>返回首页</span>
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">我的购物车</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <FontAwesomeIcon icon={faShoppingCart} size="3x" />
            </div>
            <h2 className="text-xl font-medium mb-2">购物车还是空的</h2>
            <p className="text-gray-600 mb-6">赶快去挑选心仪的课程添加到购物车吧！</p>
            <Link 
              to="/courses" 
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              去选课
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <h2 className="font-medium">购物车商品</h2>
                    <span className="ml-2 text-sm text-gray-500">({cartItems.length}门课程)</span>
                  </div>
                  <button 
                    onClick={handleClearCart}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    清空购物车
                  </button>
                </div>
                
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <Link to={`/courses/${item.id}`} className="font-medium hover:text-primary">
                              {item.title}
                            </Link>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                              title="移除"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                          <div className="mt-2">
                            <span className="text-lg font-medium text-primary">{item.price}</span>
                            {item.originalPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-[90px]">
                <h3 className="font-medium mb-4 pb-3 border-b border-gray-100">订单摘要</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">商品总价</span>
                    <span>¥{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">优惠</span>
                    <span className="text-green-500">-¥0.00</span>
                  </div>
                </div>
                
                <div className="my-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">实付金额</span>
                    <span className="text-xl font-bold text-primary">¥{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mt-4"
                >
                  去结算
                </button>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>点击"去结算"，表示您同意并接受我们的服务条款和隐私政策。</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 