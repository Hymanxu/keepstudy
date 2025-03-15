import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDownload, faCheck, faExclamationCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../hooks/useOrder';

interface OrderItem {
  id: number;
  title: string;
  price: string;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: string;
  date: string;
}

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { isLoading, getOrderById, getPaymentMethodName, getStatusInfo } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder || null);
    }
  }, [isLoading, orderId, getOrderById]);
  
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
  
  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <FontAwesomeIcon icon={faCheck} className="text-green-600 mr-2" />;
      case 'pending':
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-600 mr-2" />;
      case 'canceled':
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600 mr-2" />;
      case 'refunded':
        return <FontAwesomeIcon icon={faCheck} className="text-gray-600 mr-2" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-600 mr-2" />;
    }
  };
  
  // 根据支付状态获取可执行的操作
  const getActionsForStatus = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <div className="space-y-3">
            <button 
              className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => navigate(`/workspace`)}
            >
              立即学习
            </button>
            <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              下载电子发票
            </button>
          </div>
        );
      case 'pending':
        return (
          <div className="space-y-3">
            <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              继续支付
            </button>
            <button className="w-full py-2 border border-gray-300 text-red-600 rounded-lg hover:bg-gray-50 transition-colors">
              取消订单
            </button>
          </div>
        );
      default:
        return null;
    }
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
  
  if (!order) {
    return (
      <div className="min-h-screen pt-[72px] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-medium mb-2">订单不存在</h2>
          <p className="text-gray-600 mb-6">抱歉，找不到该订单的信息，可能已被删除或订单号不正确。</p>
          <Link 
            to="/orders" 
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            返回订单列表
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-[72px] bg-gray-50">
      <div className="container mx-auto max-w-[1100px] px-4 py-8">
        <div className="mb-6">
          <Link to="/orders" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>返回订单列表</span>
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">订单详情</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* 订单状态 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className={`px-3 py-1 rounded-full text-sm ${getStatusInfo(order.status).color} mr-3`}>
                  {getStatusIcon(order.status)}
                  {getStatusInfo(order.status).text}
                </div>
                {order.status === 'paid' && (
                  <span className="text-gray-500 text-sm">
                    您的订单已支付成功，请开始学习课程
                  </span>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">订单编号</div>
                    <div className="font-medium">{order.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">下单时间</div>
                    <div>{formatDate(order.date)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">支付方式</div>
                    <div>{getPaymentMethodName(order.paymentMethod)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">订单金额</div>
                    <div className="font-medium text-primary">¥{order.total.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 订单商品 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-medium">订单商品</h2>
              </div>
              
              <div>
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <Link 
                            to={`/courses/${item.id}`} 
                            className="font-medium hover:text-primary"
                          >
                            {item.title}
                          </Link>
                          <div className="text-primary">{item.price}</div>
                        </div>
                        
                        {order.status === 'paid' && (
                          <div className="mt-2">
                            <Link 
                              to={`/workspace`}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              立即学习
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            {/* 订单操作 */}
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-[90px]">
              <h3 className="font-medium mb-4 pb-3 border-b border-gray-100">订单操作</h3>
              
              {getActionsForStatus(order.status)}
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">需要帮助？</h4>
                <div className="text-sm text-gray-600">
                  <Link to="/help" className="text-primary hover:text-primary/90">联系客服</Link>
                  <span> 或 </span>
                  <Link to="/help/faq" className="text-primary hover:text-primary/90">查看帮助中心</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 