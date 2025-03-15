import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化购物车
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    setIsLoading(false);
  }, []);

  // 更新本地存储和触发自定义事件
  const updateCartStorage = (items: CartItem[]) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // 添加商品到购物车
  const addToCart = (item: CartItem): boolean => {
    const existingItemIndex = cartItems.findIndex(i => i.id === item.id);
    
    if (existingItemIndex === -1) {
      // 商品不在购物车中，添加它
      const newCartItems = [...cartItems, item];
      setCartItems(newCartItems);
      updateCartStorage(newCartItems);
      return true; // 表示新添加
    }
    
    return false; // 表示已存在
  };

  // 从购物车移除商品
  const removeFromCart = (id: number) => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(newCartItems);
    updateCartStorage(newCartItems);
  };

  // 清空购物车
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // 检查商品是否在购物车中
  const isInCart = (id: number) => {
    return cartItems.some(item => item.id === id);
  };

  // 计算购物车总价
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('¥', ''));
      return total + price;
    }, 0);
  };

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    calculateTotal
  };
}; 