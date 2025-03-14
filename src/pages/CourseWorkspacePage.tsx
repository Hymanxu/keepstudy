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
  faChevronRight,
  faCompressAlt,
  faExpandAlt,
  faClock,
  faSitemap
} from '@fortawesome/free-solid-svg-icons';
import WorkspaceSidebar from '../components/WorkspaceSidebar';
import '../styles/FlashCard.css';

// 闪记卡数据类型定义
interface FlashCard {
  id: number;
  question: string;
  answer: string;
}

const CourseWorkspacePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [aiMessages, setAiMessages] = useState<Array<{type: string, content: string}>>([]);
  const [aiInput, setAiInput] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState('chat'); // chat, flashcard, practice, discussion
  const [activeVideoTab, setActiveVideoTab] = useState('timeline'); // timeline, mindmap
  const [videoCollapsed, setVideoCollapsed] = useState(false);
  
  // 闪记卡状态
  const [flashcards] = useState<FlashCard[]>([
    { 
      id: 1, 
      question: "JDK的完整名称是什么？", 
      answer: "Java Development Kit（Java开发工具包）" 
    },
    { 
      id: 2, 
      question: "配置Java环境变量的主要目的是什么？", 
      answer: "使Java命令可以在任何目录下执行，不受当前工作目录限制。" 
    },
    { 
      id: 3, 
      question: "什么是PATH环境变量？", 
      answer: "PATH是操作系统用来查找可执行程序的目录列表，将Java的bin目录添加到PATH中可以使Java命令全局可用。" 
    },
    { 
      id: 4, 
      question: "JDK、JRE和JVM的区别是什么？", 
      answer: "JDK包含开发工具和JRE；JRE包含运行Java程序所需的库和JVM；JVM是Java虚拟机，用于执行Java字节码。" 
    },
    { 
      id: 5, 
      question: "如何检查Java是否正确安装？", 
      answer: "在命令行/终端输入'java -version'命令，如果显示版本信息则表示安装成功。" 
    }
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
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

  // 切换视频展开/收起状态
  const toggleVideoCollapse = () => {
    setVideoCollapsed(!videoCollapsed);
  };
  
  // 翻转闪记卡
  const flipCard = () => {
    console.log("翻转前状态:", isFlipped);
    setIsFlipped(!isFlipped);
    console.log("翻转后状态:", !isFlipped);
  };
  
  // 显示下一张卡片
  const nextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      // 无论当前是否在答案状态，都直接展示新卡片的问题面
      setIsFlipped(false);
    }
  };
  
  // 显示上一张卡片
  const prevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      // 无论当前是否在答案状态，都直接展示新卡片的问题面
      setIsFlipped(false);
    }
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
            <div className={`bg-black relative ${videoCollapsed ? 'h-12' : 'aspect-video'} transition-all duration-300`}>
              {!videoCollapsed ? (
                <iframe 
                  src="//player.bilibili.com/player.html?isOutside=true&aid=289532467&bvid=BV1if4y147hS&cid=330208219&p=1" 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center px-4">
                  <div className="h-2 bg-gray-700 flex-grow rounded-full">
                    <div className="h-full bg-red-500 w-[30%] rounded-full"></div>
                  </div>
                  <span className="text-white text-xs ml-2">8:44 / 1:28:57</span>
                </div>
              )}
            </div>
            
            {/* 视频下方标签页 */}
            <div className="border-t border-gray-200 bg-white flex-grow overflow-hidden flex flex-col">
              <div className="flex border-b border-gray-200 justify-between">
                <div className="flex">
                  <button 
                    className={`px-4 py-3 font-medium text-sm flex items-center ${activeVideoTab === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveVideoTab('timeline')}
                  >
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    时间轴
                  </button>
                  <button 
                    className={`px-4 py-3 font-medium text-sm flex items-center ${activeVideoTab === 'mindmap' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveVideoTab('mindmap')}
                  >
                    <FontAwesomeIcon icon={faSitemap} className="mr-2" />
                    思维导图
                  </button>
                </div>
                <button 
                  className="px-4 py-3 text-gray-600 hover:text-gray-900"
                  onClick={toggleVideoCollapse}
                  title={videoCollapsed ? "展开视频" : "收起视频"}
                >
                  <FontAwesomeIcon icon={videoCollapsed ? faExpandAlt : faCompressAlt} />
                </button>
              </div>
              
              {/* 标签内容 */}
              <div className="overflow-y-auto flex-grow">
                {activeVideoTab === 'timeline' ? (
                  <div className="p-2">
                    <div className="my-2 border-l-2 border-blue-500 pl-3 py-2 hover:bg-blue-50 cursor-pointer">
                      <div className="text-sm font-medium">00:00 - 05:32</div>
                      <div className="text-xs text-gray-700 mt-1">课程介绍与学习目标</div>
                    </div>
                    <div className="my-2 border-l-2 border-gray-300 pl-3 py-2 hover:bg-blue-50 cursor-pointer">
                      <div className="text-sm font-medium">05:33 - 15:47</div>
                      <div className="text-xs text-gray-700 mt-1">开发环境要求与系统配置</div>
                    </div>
                    <div className="my-2 border-l-2 border-gray-300 pl-3 py-2 hover:bg-blue-50 cursor-pointer">
                      <div className="text-sm font-medium">15:48 - 28:20</div>
                      <div className="text-xs text-gray-700 mt-1">JDK下载与安装步骤</div>
                    </div>
                    <div className="my-2 border-l-2 border-gray-300 pl-3 py-2 hover:bg-blue-50 cursor-pointer">
                      <div className="text-sm font-medium">28:21 - 42:15</div>
                      <div className="text-xs text-gray-700 mt-1">环境变量配置详解</div>
                    </div>
                    <div className="my-2 border-l-2 border-gray-300 pl-3 py-2 hover:bg-blue-50 cursor-pointer">
                      <div className="text-sm font-medium">42:16 - 58:45</div>
                      <div className="text-xs text-gray-700 mt-1">开发工具安装与配置</div>
                    </div>
                    <div className="my-2 border-l-2 border-gray-300 pl-3 py-2 hover:bg-blue-50 cursor-pointer">
                      <div className="text-sm font-medium">58:46 - 1:10:30</div>
                      <div className="text-xs text-gray-700 mt-1">第一个项目创建与运行</div>
                    </div>
                    <div className="my-2 border-l-2 border-gray-300 pl-3 py-2 hover:bg-blue-50 cursor-pointer">
                      <div className="text-sm font-medium">1:10:31 - 1:28:57</div>
                      <div className="text-xs text-gray-700 mt-1">常见问题解答与课程总结</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-center mb-4">
                          <div className="px-4 py-2 bg-blue-100 rounded-lg text-blue-800 font-medium border border-blue-200">
                            开发环境搭建
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                          <div className="flex flex-col items-center">
                            <div className="w-32 px-2 py-1 bg-green-100 rounded-lg text-green-800 text-sm text-center border border-green-200">
                              JDK安装
                            </div>
                            <div className="h-8 border-l border-dashed border-gray-400 my-1"></div>
                            <div className="flex gap-2">
                              <div className="w-24 px-2 py-1 bg-gray-100 rounded-lg text-gray-800 text-xs text-center border border-gray-200">
                                下载
                              </div>
                              <div className="w-24 px-2 py-1 bg-gray-100 rounded-lg text-gray-800 text-xs text-center border border-gray-200">
                                安装
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="w-32 px-2 py-1 bg-yellow-100 rounded-lg text-yellow-800 text-sm text-center border border-yellow-200">
                              环境变量
                            </div>
                            <div className="h-8 border-l border-dashed border-gray-400 my-1"></div>
                            <div className="flex gap-2">
                              <div className="w-24 px-2 py-1 bg-gray-100 rounded-lg text-gray-800 text-xs text-center border border-gray-200">
                                JAVA_HOME
                              </div>
                              <div className="w-24 px-2 py-1 bg-gray-100 rounded-lg text-gray-800 text-xs text-center border border-gray-200">
                                PATH
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="w-32 px-2 py-1 bg-purple-100 rounded-lg text-purple-800 text-sm text-center border border-purple-200">
                              IDE配置
                            </div>
                            <div className="h-8 border-l border-dashed border-gray-400 my-1"></div>
                            <div className="flex gap-2">
                              <div className="w-24 px-2 py-1 bg-gray-100 rounded-lg text-gray-800 text-xs text-center border border-gray-200">
                                安装
                              </div>
                              <div className="w-24 px-2 py-1 bg-gray-100 rounded-lg text-gray-800 text-xs text-center border border-gray-200">
                                插件
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="flex justify-center gap-4">
                            <div className="w-40 px-3 py-2 bg-red-100 rounded-lg text-red-800 text-sm text-center border border-red-200">
                              HelloWorld示例
                            </div>
                            <div className="w-40 px-3 py-2 bg-indigo-100 rounded-lg text-indigo-800 text-sm text-center border border-indigo-200">
                              常见问题解决
                            </div>
                          </div>
                        </div>
                      </div>
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
                <h3 className="font-medium mb-2">课程闪记卡</h3>
                <p className="text-sm text-gray-600 mb-3">点击卡片查看答案，使用左右箭头切换卡片</p>
                
                <div className="flex justify-center items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {currentCardIndex + 1} / {flashcards.length}
                  </span>
                </div>
                
                <div className="relative flex justify-center items-center">
                  <button 
                    onClick={prevCard}
                    disabled={currentCardIndex === 0}
                    className={`absolute left-0 z-10 p-2 rounded-full ${currentCardIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  
                  {/* 卡片容器 */}
                  <div className="flashcard-container" key={currentCardIndex}>
                    <div 
                      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                      onClick={flipCard}
                    >
                      {/* 卡片正面 - 问题 */}
                      <div className="flashcard-face flashcard-front">
                        <div className="font-medium mb-2 text-center">问题：</div>
                        <div className="text-center text-lg">{flashcards[currentCardIndex].question}</div>
                        <div className="text-xs text-gray-500 text-center mt-4">点击卡片查看答案</div>
                      </div>
                      
                      {/* 卡片背面 - 答案 */}
                      <div className="flashcard-face flashcard-back">
                        <div className="font-medium mb-2 text-center">答案：</div>
                        <div className="text-center text-lg">{flashcards[currentCardIndex].answer}</div>
                        <div className="text-xs text-gray-500 text-center mt-4">点击卡片返回问题</div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={nextCard}
                    disabled={currentCardIndex === flashcards.length - 1}
                    className={`absolute right-0 z-10 p-2 rounded-full ${currentCardIndex === flashcards.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
                
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-1">
                    {flashcards.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentCardIndex(index);
                          setIsFlipped(false);
                        }}
                        className={`w-2 h-2 rounded-full ${index === currentCardIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        aria-label={`Card ${index + 1}`}
                      />
                    ))}
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
