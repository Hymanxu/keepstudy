import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faHistory, faPaperPlane, faArrowRight, faArrowLeft,
  faCode, faFolder, faFileAlt, faChevronDown, faChevronRight,
  faInfoCircle, faSearch, faCog, faAngleRight, faUser, faTimes,
  faGraduationCap, faBook, faTools, faComments, faRobot
} from '@fortawesome/free-solid-svg-icons';

const WorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const [studyMode, setStudyMode] = useState<'default' | 'course'>('default');
  const [aiMessages, setAiMessages] = useState<Array<{type: string, content: string}>>([]);
  const [aiInput, setAiInput] = useState('');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  
  // 处理AI消息发送
  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    // 添加用户消息
    setAiMessages([...aiMessages, { type: 'user', content: aiInput }]);
    
    // 模拟AI回复
    setTimeout(() => {
      setAiMessages(prev => [...prev, { 
        type: 'bot', 
        content: '这是一个示例回复。在实际应用中，这里会连接到后端API获取真实的AI回复。' 
      }]);
    }, 1000);
    
    setAiInput('');
  };

  // 切换到课程学习模式
  const handleEnterCourseMode = () => {
    setStudyMode('course');
  };
  
  // 切换回默认模式
  const handleBackToDefaultMode = () => {
    setStudyMode('default');
  };

  // 打开AI助手
  const handleOpenAiAssistant = () => {
    setAiAssistantOpen(true);
  };

  // 关闭AI助手
  const handleCloseAiAssistant = () => {
    setAiAssistantOpen(false);
  };

  // 返回首页
  const handleGoToHome = () => {
    navigate('/');
  };

  // 默认工作台模式
  const renderDefaultMode = () => (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 左侧导航 */}
      <nav className="w-[250px] border-r border-gray-200 flex flex-col h-full bg-gray-50">
        {/* Logo */}
        <div className="p-4">
          <div onClick={handleGoToHome} className="cursor-pointer">
            <span className="text-2xl font-bold text-primary text-gradient italic font-serif transform -rotate-2 inline-block">KeepStudy</span>
          </div>
        </div>
        
        <div className="flex flex-col flex-1 p-4 overflow-y-auto scrollbar-hide">
          {/* 添加内容按钮 */}
          <div className="mb-6">
            <button className="w-full flex items-center justify-center space-x-2 font-medium p-3 rounded-lg border border-dashed border-gray-300 hover:bg-gray-100 transition-colors">
              <FontAwesomeIcon icon={faPlus} />
              <span>添加内容</span>
            </button>
          </div>
          
          {/* 菜单项 */}
          <div className="space-y-2">
            <Link to="/workspace/history" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
              <FontAwesomeIcon icon={faHistory} />
              <span>历史记录</span>
            </Link>
          </div>
          
          {/* 最近学习 */}
          <div className="mt-8">
            <h3 className="text-gray-500 text-sm font-medium mb-3 px-3">最近学习</h3>
            <div className="space-y-1">
              <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm truncate">集体智能: 人机超级mind的...</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 opacity-0 group-hover:opacity-100 text-xs" />
                </div>
              </div>
              
              <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm truncate">Python 数据分析</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 opacity-0 group-hover:opacity-100 text-xs" />
                </div>
              </div>
            </div>
          </div>
          
          {/* 学习计划 */}
          <div className="mt-6">
            <h3 className="text-gray-500 text-sm font-medium mb-3 px-3">学习计划</h3>
            <div className="space-y-1">
              <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group" onClick={handleEnterCourseMode}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faCode} className="text-blue-500" />
                    <span className="text-sm">Java 开发工程师</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 opacity-0 group-hover:opacity-100 text-xs" />
                </div>
              </div>
            </div>
            <div className="mt-2 px-3">
              <button className="w-full flex items-center justify-center space-x-2 text-sm text-gray-600 p-3 rounded-lg border border-dashed border-gray-300 hover:bg-gray-100 transition-colors">
                <FontAwesomeIcon icon={faPlus} size="sm" />
                <span>添加计划</span>
              </button>
            </div>
          </div>
          
          {/* 工具区 */}
          <div className="mt-6">
            <h3 className="text-gray-500 text-sm font-medium mb-3 px-3">常用工具</h3>
            <div className="space-y-2">
              <Link to="/feedback" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <FontAwesomeIcon icon={faComments} className="text-gray-500 w-4" />
                <span>反馈意见</span>
              </Link>
              <Link to="/guide" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <FontAwesomeIcon icon={faBook} className="text-gray-500 w-4" />
                <span>快捷指南</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* 用户账号 */}
        <div className="mt-auto p-4">
          <div className="flex items-center p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              <FontAwesomeIcon icon={faUser} size="sm" />
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">用户账号</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Lv1</span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold mb-4">你今天想学什么？</h1>
            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
                <input 
                  type="text" 
                  placeholder="上传文件、粘贴 Bilibili 视频链接 GitHub 项目" 
                  className="flex-1 outline-none text-gray-700"
                />
                <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2 hover:bg-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
          
          <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">我的计划</h2>
              <div className="flex items-center text-blue-600 cursor-pointer">
                <span className="mr-1 text-sm font-medium">添加计划</span>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </div>
            </div>
            
            <div 
              className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer" 
              onClick={handleEnterCourseMode}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faCode} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Java 开发工程师</h3>
                  <p className="text-sm text-gray-500">完成度: 35%</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </section>
          
          <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">继续学习</h2>
              <div className="flex items-center text-blue-600 cursor-pointer">
                <span className="mr-1 text-sm font-medium">查看全部</span>
                <FontAwesomeIcon icon={faAngleRight} size="sm" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-5 text-white cursor-pointer" 
                onClick={handleEnterCourseMode}
              >
                <div className="relative z-10">
                  <h3 className="font-medium mb-2">集体智能: 人机超级mind的构建</h3>
                  <div className="flex items-center text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded">AI研究</span>
                    <span className="ml-3">进度: 45%</span>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-5 text-white cursor-pointer">
                <div className="relative z-10">
                  <h3 className="font-medium mb-2">Python 数据分析基础</h3>
                  <div className="flex items-center text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded">数据科学</span>
                    <span className="ml-3">进度: 75%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 右侧悬浮AI助手按钮 */}
      <button 
        onClick={handleOpenAiAssistant}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-50"
      >
        <FontAwesomeIcon icon={faRobot} />
      </button>
    </div>
  );

  // 课程学习模式
  const renderCourseMode = () => (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 左侧导航 */}
      <nav className="w-[250px] border-r border-gray-200 flex flex-col h-full bg-gray-50">
        {/* Logo */}
        <div className="p-4">
          <div onClick={handleGoToHome} className="cursor-pointer">
            <span className="text-2xl font-bold text-primary text-gradient italic font-serif transform -rotate-2 inline-block">KeepStudy</span>
          </div>
        </div>
        
        <div className="flex flex-col flex-1 p-4 overflow-y-auto scrollbar-hide">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-700 mb-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCode} />
              <span className="font-medium">Java 开发工程师</span>
            </div>
          </div>
          
          <h3 className="text-gray-500 text-sm font-medium mb-3 px-3">课程目录</h3>
          
          <div className="space-y-1">
            <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium">第1章: Java基础</span>
                </div>
              </div>
            </div>
            
            <div className="ml-6 space-y-1">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-700 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">1.1 Java介绍</span>
                </div>
              </div>
              
              <div className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  <span className="text-sm">1.2 Java环境搭建</span>
                </div>
              </div>
              
              <div className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  <span className="text-sm">1.3 第一个Java程序</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium">第2章: 面向对象编程</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium">第3章: 高级特性</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 用户账号 */}
        <div className="mt-auto p-4">
          <div className="flex items-center p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              <FontAwesomeIcon icon={faUser} size="sm" />
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">用户账号</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Lv1</span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 主内容区 */}
      <main className="flex-1 overflow-hidden flex flex-col bg-white">
        {/* 顶部导航栏 */}
        <header className="border-b border-gray-200 py-3 px-4 flex justify-between items-center bg-white">
          <div className="flex items-center">
            <button 
              className="text-gray-500 hover:text-gray-700 mr-3" 
              onClick={handleBackToDefaultMode}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="text-xl font-bold">Java 开发工程师</div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-primary rounded-lg px-4">升级</button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Java 介绍</h1>
            
            <div className="prose max-w-none">
              <p>Java是由Sun Microsystems公司于1995年5月推出的Java程序设计语言和Java平台的总称。由James Gosling和同事们共同研发，并在1995年正式推出。</p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Java的特点</h2>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>面向对象: Java是一种面向对象的语言，支持封装、继承、多态等面向对象特性。</li>
                <li>平台无关性: Java程序可以在任何装有Java虚拟机的平台上运行，不需要重新编译。</li>
                <li>简单性: Java语言设计简单，易于学习和使用。</li>
                <li>健壮性: Java的强类型机制、异常处理和自动内存管理机制保证了Java程序的健壮性。</li>
                <li>安全性: Java提供了一个安全的环境来执行代码。</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Java的应用领域</h2>
              
              <p>Java被广泛应用于以下领域:</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>企业级应用: 如银行、零售、保险、电信等行业的核心系统。</li>
                <li>Android应用开发: Android应用的主要开发语言。</li>
                <li>Web应用开发: 使用Java EE (Enterprise Edition)开发的Web应用。</li>
                <li>科学计算: 用于处理大数据和复杂计算。</li>
                <li>嵌入式系统: 如智能卡、SIM卡等。</li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-700">小知识</h3>
                    <p className="text-sm text-blue-800">Java的口号是 "Write Once, Run Anywhere"（一次编写，到处运行），这体现了Java的跨平台特性。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 右侧悬浮AI助手按钮 */}
      <button 
        onClick={handleOpenAiAssistant}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-50"
      >
        <FontAwesomeIcon icon={faRobot} />
      </button>
    </div>
  );

  return (
    <>
      {studyMode === 'default' ? renderDefaultMode() : renderCourseMode()}
      
      {/* AI助手 */}
      {aiAssistantOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50 flex flex-col">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faRobot} className="mr-2" />
              <h2 className="text-lg font-semibold">AI助手</h2>
            </div>
            <button className="text-white hover:text-gray-200" onClick={handleCloseAiAssistant}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50">
            {aiMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faRobot} className="text-5xl mb-3 text-gray-300" />
                <p>我是你的AI学习助手，随时为你解答问题</p>
              </div>
            ) : (
              aiMessages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}>
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="border-t border-gray-200 p-3">
            <form onSubmit={handleAiSubmit} className="flex items-center">
              <input 
                type="text" 
                value={aiInput} 
                onChange={(e) => setAiInput(e.target.value)} 
                placeholder="输入你的问题..." 
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={!aiInput.trim()}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkspacePage;
