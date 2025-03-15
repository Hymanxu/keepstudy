import { useState, useEffect } from 'react';
import { CartItem } from './useCart';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: string;
  date: string;
}

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化订单数据
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    setIsLoading(false);
  }, []);

  // 生成订单ID
  const generateOrderId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `KS${timestamp}${random}`;
  };

  // 创建新订单
  const createOrder = (items: CartItem[], total: number, paymentMethod: string): string => {
    const orderId = generateOrderId();
    
    const newOrder: Order = {
      id: orderId,
      items,
      total,
      paymentMethod,
      status: 'paid',
      date: new Date().toISOString()
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return orderId;
  };

  // 获取指定ID的订单
  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  // 获取订单状态信息
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'paid':
        return { text: '已支付', color: 'bg-green-100 text-green-800' };
      case 'pending':
        return { text: '待支付', color: 'bg-yellow-100 text-yellow-800' };
      case 'canceled':
        return { text: '已取消', color: 'bg-red-100 text-red-800' };
      case 'refunded':
        return { text: '已退款', color: 'bg-gray-100 text-gray-800' };
      default:
        return { text: '未知', color: 'bg-gray-100 text-gray-800' };
    }
  };

  // 获取支付方式的中文名
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'alipay':
        return '支付宝';
      case 'wechat':
        return '微信支付';
      case 'card':
        return '银行卡';
      default:
        return '其他';
    }
  };

  return {
    orders,
    isLoading,
    createOrder,
    getOrderById,
    getStatusInfo,
    getPaymentMethodName
  };
}; 