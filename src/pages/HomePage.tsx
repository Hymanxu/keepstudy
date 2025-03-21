import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLaptopCode, faUsers, faRobot, faBrain, faBook, faCode, faChartBar } from '@fortawesome/free-solid-svg-icons';

// 彩带动画组件
const Confetti = ({ x, y }: { x: number; y: number }) => {
  const colors = ['#FFC700', '#FF0058', '#2C61F6', '#29C5F6', '#7DE2D1', '#F7BDD1', '#FF6B6B', '#9F8EF2'];
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
  }>>([]);
  
  useEffect(() => {
    const newParticles = [];
    // 生成20-30个彩带片段
    const particleCount = Math.floor(Math.random() * 11) + 20;
    
    for (let i = 0; i < particleCount; i++) {
      // 随机颜色
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // 随机初始方向和速度
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      
      // 彩带大小 - 细长形状
      const width = 3 + Math.random() * 7;
      const height = 10 + Math.random() * 15;
      
      // 初始旋转角度和旋转速度
      const rotation = Math.random() * 360;
      const rotationSpeed = -1 + Math.random() * 2;
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.6, // 竖直方向的速度稍小，让彩带在空中飘得久一些
        width,
        height,
        color,
        rotation,
        rotationSpeed,
        opacity: 0.8 + Math.random() * 0.2
      });
    }
    
    setParticles(newParticles);
    
    // 彩带动画
    const animationInterval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.07, // 添加重力，但要比烟花小些
          vx: p.vx * 0.99, // 轻微的空气阻力
          rotation: p.rotation + p.rotationSpeed,
          opacity: p.opacity - 0.005 // 缓慢消失
        })).filter(p => p.opacity > 0)
      );
    }, 20);
    
    // 3秒后清除动画
    const cleanupTimeout = setTimeout(() => {
      clearInterval(animationInterval);
      setParticles([]);
    }, 3000);
    
    return () => {
      clearInterval(animationInterval);
      clearTimeout(cleanupTimeout);
    };
  }, [x, y]);
  
  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}>
      {particles.map(p => (
        <div 
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: '1px',
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [confetti, setConfetti] = useState<Array<{id: number; x: number; y: number}>>([]);
  const [nextId, setNextId] = useState(0);
  const navigate = useNavigate();
  
  // 检查用户是否登录
  const isLoggedIn = (() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).isLoggedIn : false;
  })();
  
  // 创建彩带的函数
  const createConfetti = () => {
    // 获取Hero区域的文字部分
    const heroSection = document.querySelector('.hero-text-area');
    if (!heroSection) return;
    
    const rect = heroSection.getBoundingClientRect();
    // 在文字区域周围的随机位置生成彩带
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;
    
    setConfetti(prev => [...prev, { id: nextId, x: x - rect.left, y: y - rect.top }]);
    setNextId(prev => prev + 1);
    
    // 3秒后移除彩带
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => c.id !== nextId - 1));
    }, 3000);
  };
  
  // 处理按钮hover事件
  const handleButtonHover = () => {
    createConfetti();
  };
  
  // 处理头像hover事件
  const handleAvatarHover = () => {
    createConfetti();
  };
  
  // 处理"开始使用"按钮点击
  const handleStartButtonClick = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      e.preventDefault(); // 阻止默认的链接行为
      navigate('/workspace'); // 导航到工作台
    }
  };
  
  return (
    <div className="bg-white pt-[72px]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto max-w-[1100px] px-4 relative">
          {confetti.map(c => (
            <Confetti key={c.id} x={c.x} y={c.y} />
          ))}
          
          <div className="text-center max-w-3xl mx-auto mb-12 hero-text-area">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">保持学习 无限进步</h1>
            <p className="text-lg text-gray-600 mb-8">
              利用AI技术辅助学习，提高效率，轻松掌握编程技能
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/courses" 
                className="btn btn-secondary rounded-full px-6 py-3"
                onMouseEnter={handleButtonHover}
              >
                发现课程
              </Link>
              <Link 
                to={isLoggedIn ? "#" : "/register"} 
                className="btn btn-primary rounded-full px-6 py-3"
                onMouseEnter={handleButtonHover}
                onClick={handleStartButtonClick}
              >
                {isLoggedIn ? "进入工作台" : "开始使用"}
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-0">
            <div className="relative group">
              <div 
                className="w-11 h-16 flex items-center justify-center cursor-pointer"
                onMouseEnter={handleAvatarHover}
              >
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="学习者头像" 
                  className="w-10 h-10 rounded-full object-cover transition-all group-hover:ring-2 ring-primary"
                />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <p className="text-sm text-gray-600">"AI辅助学习让我的编程技能提升很快！"</p>
              </div>
            </div>
            <div className="relative group">
              <div 
                className="w-11 h-16 flex items-center justify-center cursor-pointer"
                onMouseEnter={handleAvatarHover}
              >
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="学习者头像" 
                  className="w-10 h-10 rounded-full object-cover transition-all group-hover:ring-2 ring-primary"
                />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <p className="text-sm text-gray-600">"实战项目让我学到了很多实用技能！"</p>
              </div>
            </div>
            <div className="relative group">
              <div 
                className="w-11 h-16 flex items-center justify-center cursor-pointer"
                onMouseEnter={handleAvatarHover}
              >
                <img 
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="学习者头像" 
                  className="w-10 h-10 rounded-full object-cover transition-all group-hover:ring-2 ring-primary"
                />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <p className="text-sm text-gray-600">"社区里的小伙伴们都很热心！"</p>
              </div>
            </div>
            <div className="relative group">
              <div 
                className="w-11 h-16 flex items-center justify-center cursor-pointer"
                onMouseEnter={handleAvatarHover}
              >
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="学习者头像" 
                  className="w-10 h-10 rounded-full object-cover transition-all group-hover:ring-2 ring-primary"
                />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <p className="text-sm text-gray-600">"课程质量很高，讲解很清晰！"</p>
              </div>
            </div>
            <div className="relative group">
              <div 
                className="w-11 h-16 flex items-center justify-center cursor-pointer"
                onMouseEnter={handleAvatarHover}
              >
                <img 
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="学习者头像" 
                  className="w-10 h-10 rounded-full object-cover transition-all group-hover:ring-2 ring-primary"
                />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <p className="text-sm text-gray-600">"学习路径很清晰，进步很快！"</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 font-medium ml-1.25">和30万+学习者一起进步</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-[1100px] px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">轻松学习，高效掌握</h2>
            <p className="text-lg text-gray-600">
              我们的AI学习平台让编程学习变得简单有趣，帮助你快速提升技能
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faRobot} size="lg" />
              </div>
              <h3 className="text-xl font-semibold mb-3">智能问答</h3>
              <p className="text-gray-600">
                AI助手随时解答你的问题，提供个性化的学习建议和指导
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faLaptopCode} size="lg" />
              </div>
              <h3 className="text-xl font-semibold mb-3">实时编程</h3>
              <p className="text-gray-600">
                在线编程环境，即时反馈，让你边学边练，快速掌握技能
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faBrain} size="lg" />
              </div>
              <h3 className="text-xl font-semibold mb-3">多维评价</h3>
              <p className="text-gray-600">
                基于学习与实战真实数据，由AI生成客观、多维评价
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1100px] px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">适用于各种学习场景</h2>
            <p className="text-lg text-gray-600">
              无论你是初学者还是有经验的开发者，我们都能满足你的学习需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="编程学习" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">编程入门学习</h3>
                <p className="text-gray-600 mb-4">
                  为初学者提供循序渐进的学习路径，从基础开始，逐步提升
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="项目实战" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">项目实战训练</h3>
                <p className="text-gray-600 mb-4">
                  通过实际项目练习，将理论知识应用到实践中，提升解决问题的能力
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="团队协作" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">团队学习协作</h3>
                <p className="text-gray-600 mb-4">
                  支持团队协作学习，共享资源，互相帮助，共同进步
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-[1100px] px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">节省时间，学习更智能</h2>
            <p className="text-lg text-gray-600">
              选择适合你的计划，开始AI辅助学习之旅
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">¥0</h3>
                <p className="text-gray-600">免费计划</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>基础AI学习助手</span>
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>有限课程资源</span>
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>社区基础功能</span>
                </li>
              </ul>
              <Link to="/register" className="btn btn-outline w-full text-center">
                开始使用
              </Link>
            </div>
            
            <div className="bg-primary text-white p-8 rounded-xl shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-xs font-medium px-3 py-1.5 rounded-bl-lg transform rotate-0 hover:rotate-0 transition-transform shadow-md">
                推荐
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">¥45</h3>
                <p className="text-white/80">每月</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-white/20 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>高级AI学习助手</span>
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-white/20 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>全部课程资源</span>
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-white/20 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>社区高级功能</span>
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-white/20 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>个性化学习路径</span>
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-white/20 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>项目实战指导</span>
                </li>
              </ul>
              <Link to="/register" className="btn bg-white text-primary hover:bg-white/90 w-full text-center">
                立即升级
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1100px] px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">学习更智能，更快，更简单</h2>
            <p className="text-lg text-gray-600 mb-8">
              加入我们的AI学习平台，开启你的编程学习之旅
            </p>
            <Link to="/register" className="btn btn-primary rounded-full px-8 py-3 text-lg">
              立即开始
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
