import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlus, faCode, faArrowRight, faAngleRight, faRobot, faTimes, faPaperclip, faGraduationCap, faLaptopCode, faChartLine, faQuestionCircle, faStar, faUserFriends, faClock, faTag } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkspaceSidebar from '../components/WorkspaceSidebar';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

const DefaultWorkspacePage: React.FC = () => {
  const [aiMessages, setAiMessages] = useState<Array<{type: string, content: string}>>([]);
  const [aiInput, setAiInput] = useState('');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 
  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    // 
    setAiMessages([...aiMessages, { type: 'user', content: aiInput }]);
    
    // AI
    setTimeout(() => {
      setAiMessages(prev => [...prev, { 
        type: 'bot', 
        content: '这是一个测试的AI回答。这是在后端获取到的API数据。' 
      }]);
    }, 1000);
    
    setAiInput('');
  };

  // AI
  const handleOpenAiAssistant = () => {
    setAiAssistantOpen(true);
  };

  // AI
  const handleCloseAiAssistant = () => {
    setAiAssistantOpen(false);
  };

  // 生成热力图数据
  const [heatmapData, setHeatmapData] = useState<Array<{date: string, count: number, hours: number, dayOfWeek: number}>>([]);
  // 能力雷达图数据
  const [skillsData, setSkillsData] = useState([
    { subject: '编程能力', A: 80 },
    { subject: '算法', A: 65 },
    { subject: '前端开发', A: 90 },
    { subject: '后端开发', A: 70 },
    { subject: '数据库', A: 60 },
    { subject: '系统设计', A: 75 },
    { subject: '项目管理', A: 50 },
    { subject: '测试', A: 65 },
    { subject: 'DevOps', A: 45 },
    { subject: 'AI应用', A: 80 },
  ]);
  // 悬浮提示数据
  const [hoverInfo, setHoverInfo] = useState<{show: boolean, date: string, hours: number, x: number, y: number}>(
    {show: false, date: '', hours: 0, x: 0, y: 0}
  );
  
  useEffect(() => {
    // 模拟生成过去90天的学习数据
    const generateHeatmapData = () => {
      const data = [];
      const now = new Date();
      for (let i = 89; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        
        // 随机生成学习时长 (0-5小时)
        const hours = Math.random() * 5;
        // 将时间转换为热力图的计数 (0-4)
        const count = hours === 0 ? 0 : Math.min(Math.floor(hours * 1.2), 4);
        
        data.push({
          date: date.toISOString().split('T')[0],
          count,
          hours: Math.round(hours * 10) / 10, // 保留一位小数
          dayOfWeek: date.getDay() // 获取星期几 (0-6)
        });
      }
      return data;
    };
    
    setHeatmapData(generateHeatmapData());
  }, []);
  
  // 处理方块悬浮事件
  const handleCellHover = (date: string, hours: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverInfo({
      show: true,
      date,
      hours,
      x: rect.left,
      y: rect.top - 40
    });
  };
  
  // 处理方块离开事件
  const handleCellLeave = () => {
    setHoverInfo(prev => ({...prev, show: false}));
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* */}
      <WorkspaceSidebar activePath={location.pathname} />
      
      {/* */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-5xl mx-auto p-6">
          <div className="text-center mb-16 mt-12">
            <h1 className="text-3xl font-bold mb-6">你今天想学什么？</h1>
            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex-shrink-0 mr-3 text-gray-400">
                  <FontAwesomeIcon icon={faPaperclip} />
                </div>
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
          
          {/* 继续学习和学习热度并排 */}
          <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 继续学习 */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">继续学习</h3>
                  <div className="flex items-center text-blue-600 cursor-pointer">
                    <span className="mr-1 text-sm font-medium">查看全部</span>
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div 
                    className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-5 text-white cursor-pointer" 
                    onClick={() => navigate('/workspace/course/1')}
                  >
                    <div className="relative z-10">
                      <h3 className="font-medium mb-2">集体智能: 人机超级mind的构建</h3>
                      <div className="flex items-center text-sm">
                        <span className="bg-white/20 px-2 py-1 rounded">AI研究</span>
                        <span className="ml-3">进度: 45%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="relative bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-5 text-white cursor-pointer"
                    onClick={() => {
                      // 跳转到练习页面并打开AI助手
                      navigate('/workspace/practice/1?openAI=true');
                    }}
                  >
                    <div className="relative z-10">
                      <h3 className="font-medium mb-2">Python 数据分析基础</h3>
                      <div className="flex items-center text-sm">
                        <span className="bg-white/20 px-2 py-1 rounded">数据科学</span>
                        <span className="ml-3">进度: 75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 学习热度 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">学习热度</h3>
                  <span className="text-sm text-gray-500">过去90天</span>
                </div>
                
                <div>
                  <div className="py-2">
                    {/* 行向热力图布局 */}
                    <div className="flex flex-col space-y-1">
                      {/* 日期分组 - 每行14天 */}
                      {Array.from({ length: 6 }, (_, rowIndex) => {
                        const startIdx = rowIndex * 14;
                        const endIdx = startIdx + 14;
                        const rowData = heatmapData.slice(startIdx, endIdx);
                        return (
                          <div key={`row-${rowIndex}`} className="flex items-center">
                            <div className="flex space-x-2">
                              {rowData.map((day, i) => (
                                <div 
                                  key={`cell-${startIdx + i}`}
                                  className={[
                                    'w-6 h-6 rounded transition-colors cursor-pointer',
                                    day.count === 0 ? 'bg-gray-100' :
                                    day.count === 1 ? 'bg-green-200' :
                                    day.count === 2 ? 'bg-green-300' :
                                    day.count === 3 ? 'bg-green-500' : 'bg-green-700'
                                  ].join(' ')}
                                  onMouseEnter={(e) => handleCellHover(day.date, day.hours, e)}
                                  onMouseLeave={handleCellLeave}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* 热力图图例 */}
                    <div className="flex justify-end items-center mt-4 text-xs text-gray-500">
                      <span className="mr-1">较少</span>
                      {[0, 1, 2, 3, 4].map(level => (
                        <div 
                          key={level} 
                          className={[
                            'w-3 h-3 mx-0.5 rounded',
                            level === 0 ? 'bg-gray-100' :
                            level === 1 ? 'bg-green-200' :
                            level === 2 ? 'bg-green-300' :
                            level === 3 ? 'bg-green-500' : 'bg-green-700'
                          ].join(' ')}
                        />
                      ))}
                      <span className="ml-1">较多</span>
                    </div>
                  </div>
                </div>
                
                {/* 悬浮提示 */}
                {hoverInfo.show && (
                  <div 
                    className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none z-10"
                    style={{
                      left: `${hoverInfo.x}px`,
                      top: `${hoverInfo.y}px`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    {`${hoverInfo.date}: ${hoverInfo.hours} 小时`}
                  </div>
                )}
              </div>
            </div>
          </section>
          
          <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">我的计划</h2>
              <div className="flex items-center text-blue-600 cursor-pointer">
                <span className="mr-1 text-sm font-medium">查看全部</span>
                <FontAwesomeIcon icon={faAngleRight} size="sm" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faCode} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Java 开发工程师</h3>
                    <p className="text-sm text-gray-500">完成度: 35%</p>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="text-gray-500 hover:text-gray-700" />
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faLaptopCode} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Web 前端开发</h3>
                    <p className="text-sm text-gray-500">完成度: 68%</p>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="text-gray-500 hover:text-gray-700" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-dashed border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faPlus} className="text-blue-500" />
                  </div>
                  <p className="text-sm font-medium text-blue-600">添加学习计划</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">推荐课程</h2>
              <a href="/courses" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                查看全部
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 课程卡片 */}
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                    alt="Python 全栈开发实战" 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-2 left-3 text-white">
                    <div className="flex items-center text-xs">
                      <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full">编程开发</span>
                      <span className="ml-2 flex items-center">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                        4.8
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-medium mb-2 line-clamp-1">Python 全栈开发实战</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    从基础到高级，掌握Python全栈开发技能，包括后端API、前端界面和数据库设计。
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faUserFriends} className="mr-1" />
                      1,248 人学习
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-1" />
                      32 小时
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                    alt="人工智能与机器学习基础" 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-2 left-3 text-white">
                    <div className="flex items-center text-xs">
                      <span className="bg-purple-500 text-white px-2 py-0.5 rounded-full">人工智能</span>
                      <span className="ml-2 flex items-center">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                        4.9
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-medium mb-2 line-clamp-1">人工智能与机器学习基础</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    深入了解AI和机器学习算法，通过实际项目学习如何应用深度学习技术。
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faUserFriends} className="mr-1" />
                      856 人学习
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-1" />
                      48 小时
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                    alt="Web前端开发入门到精通" 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-2 left-3 text-white">
                    <div className="flex items-center text-xs">
                      <span className="bg-green-500 text-white px-2 py-0.5 rounded-full">前端开发</span>
                      <span className="ml-2 flex items-center">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                        4.6
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-medium mb-2 line-clamp-1">Web前端开发入门到精通</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    学习HTML、CSS、JavaScript和React，掌握现代前端开发技术。
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faUserFriends} className="mr-1" />
                      3,452 人学习
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-1" />
                      24 小时
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* AI*/}
      <button 
        onClick={handleOpenAiAssistant}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-50"
      >
        <FontAwesomeIcon icon={faRobot} />
      </button>

      {/* AI*/}
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
                <p>我是你的AI助手，我可以帮助你解决问题</p>
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
    </div>
  );
};

export default DefaultWorkspacePage;
