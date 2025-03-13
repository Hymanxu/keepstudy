import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faArrowLeft, 
  faArrowRight, 
  faFileAlt, 
  faFolder, 
  faTimes, 
  faRobot, 
  faBars, 
  faComments, 
  faStickyNote, 
  faCodeBranch,
  faUsers,
  faChevronDown,
  faChevronUp,
  faPlay,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import WorkspaceSidebar from '../components/WorkspaceSidebar';

const CourseWorkspacePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [aiMessages, setAiMessages] = useState<Array<{type: string, content: string}>>([]);
  const [aiInput, setAiInput] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState('chat'); // chat, flashcard, practice, discussion
  const [activeVideoTab, setActiveVideoTab] = useState('chapters'); // chapters, subtitles
  const location = useLocation();
  const navigate = useNavigate();

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

  // 切换侧边栏显示
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  // 关闭当前页面，返回工作台
  const handleClose = () => {
    navigate('/workspace');
  };
  
  // 进入实战编码页面
  const navigateToPractice = () => {
    navigate(`/workspace/practice/${courseId}?openAI=true`);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 左侧导航 */}
      {sidebarVisible && <WorkspaceSidebar activePath={location.pathname} />}
      
      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部标题栏 */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 shadow-sm z-10">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-800 mr-4"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          
          {/* 只在侧边栏收起时显示KeepStudy logo */}
          {!sidebarVisible && (
            <div className="flex items-center mr-4">
              <span className="text-xl font-bold text-primary text-gradient italic font-serif transform -rotate-2 inline-block">KeepStudy</span>
            </div>
          )}
          
          <h1 className="text-lg font-semibold truncate">
            {courseId ? `${courseId.charAt(0).toUpperCase() + courseId.slice(1)} 开发工程师课程` : '课程学习'} - 1.1 开发环境搭建
          </h1>
          
          {/* 关闭按钮 */}
          <button 
            onClick={handleClose} 
            className="ml-auto text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
            title="返回工作台"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        
        {/* 课程内容区域 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧视频和标签区域 */}
          <div className="w-3/5 flex flex-col border-r border-gray-200 overflow-hidden">
            {/* 视频播放区 */}
            <div className="relative bg-black aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlay} className="text-white text-2xl ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div className="h-full bg-red-500 w-[30%]"></div>
              </div>
              <div className="absolute bottom-4 left-4 text-white text-sm">
                8:44 / 1:28:57
              </div>
            </div>
            
            {/* 视频下方标签页 */}
            <div className="border-t border-gray-200 bg-white">
              <div className="flex border-b border-gray-200">
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeVideoTab === 'chapters' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveVideoTab('chapters')}
                >
                  章节
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeVideoTab === 'subtitles' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveVideoTab('subtitles')}
                >
                  字幕
                </button>
              </div>
              
              {/* 标签内容 */}
              <div className="overflow-y-auto h-[calc(100%-48px)]">
                {activeVideoTab === 'chapters' ? (
                  <div className="p-2">
                    <div className="mb-2">
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                        <FontAwesomeIcon icon={faFolder} className="text-gray-500 mr-2" />
                        <span className="text-sm">第一章：基础入门</span>
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 ml-auto" />
                      </div>
                      <div className="ml-4 mt-1">
                        <div className="flex items-center p-2 rounded bg-blue-50 text-blue-700 cursor-pointer">
                          <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                          <span className="text-sm">1.1 开发环境搭建</span>
                        </div>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                          <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-2" />
                          <span className="text-sm">1.2 基本语法</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                        <FontAwesomeIcon icon={faFolder} className="text-gray-500 mr-2" />
                        <span className="text-sm">第二章：面向对象编程</span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 ml-auto" />
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                        <FontAwesomeIcon icon={faFolder} className="text-gray-500 mr-2" />
                        <span className="text-sm">第三章：高级特性</span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 ml-auto" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="mb-4 border-l-2 border-blue-500 pl-2">
                      <div className="text-xs text-gray-500 mb-1">00:01:23</div>
                      <div className="text-sm">欢迎来到第一章的开发环境搭建课程</div>
                    </div>
                    <div className="mb-4 pl-2">
                      <div className="text-xs text-gray-500 mb-1">00:02:15</div>
                      <div className="text-sm">在开始编程之前，我们需要准备好工作环境</div>
                    </div>
                    <div className="mb-4 pl-2">
                      <div className="text-xs text-gray-500 mb-1">00:03:42</div>
                      <div className="text-sm">首先，我们需要下载并安装JDK</div>
                    </div>
                    <div className="mb-4 pl-2">
                      <div className="text-xs text-gray-500 mb-1">00:05:30</div>
                      <div className="text-sm">接下来，我们需要配置环境变量</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* 右侧AI助手区域 */}
          <div className="w-2/5 flex flex-col overflow-hidden border-l border-gray-200">
            {/* AI助手标签页 */}
            <div className="flex border-b border-gray-200 bg-white">
              <button 
                className={`px-4 py-3 font-medium text-sm flex items-center ${activeAiTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveAiTab('chat')}
              >
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                聊天
              </button>
              <button 
                className={`px-4 py-3 font-medium text-sm flex items-center ${activeAiTab === 'flashcard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveAiTab('flashcard')}
              >
                <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
                闪记卡
              </button>
              <button 
                className={`px-4 py-3 font-medium text-sm flex items-center ${activeAiTab === 'practice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveAiTab('practice')}
              >
                <FontAwesomeIcon icon={faCodeBranch} className="mr-2" />
                实践
              </button>
              <button 
                className={`px-4 py-3 font-medium text-sm flex items-center ${activeAiTab === 'discussion' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveAiTab('discussion')}
              >
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                讨论
              </button>
            </div>
            
            {/* 主体聊天区域 */}
            {activeAiTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {aiMessages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                        <p className="text-sm mb-2">欢迎来到聊天！有什么问题可以问我，我不一定总是对的，但你的反馈会帮我进步！</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                        <div className="bg-white p-3 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow cursor-pointer group">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faArrowRight} className="text-gray-400 mr-2 group-hover:text-blue-500" />
                            <span className="text-sm">在AI智能的背景下，视频中讨论的神经网络在实际应用中如何体现？</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow cursor-pointer group">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faArrowRight} className="text-gray-400 mr-2 group-hover:text-blue-500" />
                            <span className="text-sm">这些概念如何与神经网络在无监督学习上应用？</span>
                          </div>
                        </div>
                      </div>
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
                
                <div className="border-t border-gray-200 p-3 bg-white">
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
            
            {/* 闪记卡区域 */}
            {activeAiTab === 'flashcard' && (
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="font-medium mb-2">课程闪记卡</h3>
                  <p className="text-sm text-gray-600 mb-3">点击卡片查看答案</p>
                  
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-3 cursor-pointer">
                    <div className="font-medium mb-1">问题：</div>
                    <div className="text-sm">JDK的完整名称是什么？</div>
                    <div className="mt-3 pt-3 border-t border-blue-100 hidden">
                      <div className="font-medium mb-1">答案：</div>
                      <div className="text-sm">Java Development Kit（Java开发工具包）</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg cursor-pointer">
                    <div className="font-medium mb-1">问题：</div>
                    <div className="text-sm">配置Java环境变量的主要目的是什么？</div>
                    <div className="mt-3 pt-3 border-t border-blue-100 hidden">
                      <div className="font-medium mb-1">答案：</div>
                      <div className="text-sm">使Java命令可以在任何目录下执行，不受当前工作目录限制。</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 实践区域 */}
            {activeAiTab === 'practice' && (
              <div className="flex-1 overflow-auto px-4 py-3">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-3">实践练习</h3>
                  <p className="text-gray-600 mb-3">完成以下编程练习，巩固所学知识：</p>
                  
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium">练习1：创建一个简单的Java类</h4>
                      <p className="text-sm text-gray-600 mt-1 mb-3">学习如何定义类、属性和方法</p>
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors"
                        onClick={navigateToPractice}
                      >
                        开始实战
                      </button>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium">练习2：实现简单的继承关系</h4>
                      <p className="text-sm text-gray-600 mt-1 mb-3">学习面向对象中的继承概念</p>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm transition-colors">
                        即将开放
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 讨论区域 */}
            {activeAiTab === 'discussion' && (
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">课程讨论区</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">发布讨论</button>
                  </div>
                  
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-start mb-2">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                        alt="用户头像" className="w-8 h-8 rounded-full mr-2" />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-sm mr-2">张小明</span>
                          <span className="text-xs text-gray-500">2天前</span>
                        </div>
                        <p className="text-sm mt-1">安装JDK时遇到了问题，显示</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseWorkspacePage;
