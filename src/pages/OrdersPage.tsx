import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faEye, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../hooks/useOrder';

const OrdersPage: React.FC = () => {
  const { orders, isLoading, getStatusInfo, getPaymentMethodName } = useOrder();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // 根据搜索词过滤订单
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">我的订单</h1>
          
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="搜索订单..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <FontAwesomeIcon icon={faFileInvoice} size="3x" />
            </div>
            <h2 className="text-xl font-medium mb-2">您还没有订单</h2>
            <p className="text-gray-600 mb-6">浏览我们的课程，开始学习之旅吧！</p>
            <Link 
              to="/courses" 
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              浏览课程
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="grid grid-cols-12 p-4 font-medium text-gray-500 border-b border-gray-100">
                <div className="col-span-4">订单信息</div>
                <div className="col-span-2">订单金额</div>
                <div className="col-span-2">支付方式</div>
                <div className="col-span-2">订单状态</div>
                <div className="col-span-2 text-right">操作</div>
              </div>
              
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">未找到匹配的订单</p>
                </div>
              ) : (
                <div>
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                          <div className="flex flex-col">
                            <div className="font-medium mb-1 truncate">
                              {order.items.length > 1 
                                ? `${order.items[0].title} 等 ${order.items.length} 门课程` 
                                : order.items[0].title
                              }
                            </div>
                            <div className="text-xs text-gray-500">
                              <div>订单编号: {order.id}</div>
                              <div>下单时间: {formatDate(order.date)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className="font-medium text-primary">¥{order.total.toFixed(2)}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span>{getPaymentMethodName(order.paymentMethod)}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusInfo(order.status).color}`}>
                            {getStatusInfo(order.status).text}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => navigate(`/orders/${order.id}`)}
                            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm"
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-1" />
                            查看
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 