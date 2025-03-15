import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faCreditCard, faMoneyBillWave, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../contexts/CartContext';
import { useOrder } from '../hooks/useOrder';

const CheckoutPage: React.FC = () => {
  const { cartItems, isLoading: isCartLoading, clearCart, calculateTotal } = useCartContext();
  const { createOrder } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  
  // 处理提交订单
  const handleSubmitOrder = () => {
    // 显示处理中状态
    setIsProcessing(true);
    
    // 模拟支付处理
    setTimeout(() => {
      // 创建订单
      const newOrderId = createOrder(cartItems, calculateTotal(), paymentMethod);
      setOrderId(newOrderId);
      
      // 清空购物车
      clearCart();
      
      // 显示支付成功状态
      setIsPaymentSuccess(true);
      setIsProcessing(false);
      
      // 3秒后跳转到订单详情页
      setTimeout(() => {
        navigate(`/orders/${newOrderId}`);
      }, 3000);
    }, 2000);
  };
  
  if (isCartLoading) {
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
  
  // 如果购物车为空，重定向到购物车页面
  if (cartItems.length === 0 && !isPaymentSuccess) {
    return (
      <div className="min-h-screen pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">购物车为空</h2>
          <p className="text-gray-600 mb-6">请先将课程添加到购物车再进行结算。</p>
          <Link 
            to="/cart" 
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            返回购物车
          </Link>
        </div>
      </div>
    );
  }
  
  if (isPaymentSuccess) {
    return (
      <div className="min-h-screen pt-[72px] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-8 bg-white rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCheck} className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4">支付成功！</h2>
          <p className="text-gray-600 mb-2">您的订单已成功支付。</p>
          <p className="text-gray-600 mb-6">订单编号: {orderId}</p>
          <p className="text-gray-500 text-sm mb-8">页面将在3秒后自动跳转到订单详情...</p>
          <div className="flex justify-center space-x-4">
            <Link 
              to={`/orders/${orderId}`} 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              查看订单
            </Link>
            <Link 
              to="/workspace" 
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              进入学习
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-[72px] bg-gray-50">
      <div className="container mx-auto max-w-[1100px] px-4 py-8">
        <div className="mb-6">
          <Link to="/cart" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>返回购物车</span>
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">确认订单</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* 订单商品 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-medium">订单商品</h2>
              </div>
              
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-primary">{item.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 支付方式 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-medium">支付方式</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="alipay"
                      checked={paymentMethod === 'alipay'}
                      onChange={() => setPaymentMethod('alipay')}
                      className="mr-3"
                    />
                    <span className="flex items-center text-blue-500">
                      <FontAwesomeIcon icon={faWallet} className="mr-2" />
                      支付宝支付
                    </span>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="wechat"
                      checked={paymentMethod === 'wechat'}
                      onChange={() => setPaymentMethod('wechat')}
                      className="mr-3"
                    />
                    <span className="flex items-center text-green-500">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                      微信支付
                    </span>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-3"
                    />
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-gray-600" />
                      银行卡支付
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* 订单摘要 */}
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
                onClick={handleSubmitOrder}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg transition-colors mt-4 ${
                  isProcessing 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {isProcessing ? '处理中...' : '确认支付'}
              </button>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>点击"确认支付"，表示您同意并接受我们的服务条款和隐私政策。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 