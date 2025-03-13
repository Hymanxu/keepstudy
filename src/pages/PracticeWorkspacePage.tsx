import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faArrowLeft, 
  faFileAlt, 
  faFolder, 
  faTimes, 
  faBars, 
  faComments,
  faCode,
  faPlay,
  faSun, 
  faMoon,
  faChevronDown,
  faChevronRight,
  faRobot,
  faQuestionCircle,
  faLightbulb,
  faList,
  faTerminal,
  faBookOpen,
  faHome,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import WorkspaceSidebar from '../components/WorkspaceSidebar';

const PracticeWorkspacePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [aiMessages, setAiMessages] = useState<Array<{type: string, content: string}>>([]);
  const [aiInput, setAiInput] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [selectedTab, setSelectedTab] = useState('code'); // code, console, output
  const location = useLocation();
  const navigate = useNavigate();
  const aiHelperRef = useRef<HTMLDivElement>(null);

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

  // 检查URL参数，如果有特定参数则自动打开AI助手
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('openAI') === 'true') {
      setShowAiHelper(true);
    }
  }, [location]);

  // 关闭点击AI助手窗口外部时自动关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiHelperRef.current && !aiHelperRef.current.contains(event.target as Node)) {
        setShowAiHelper(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 切换侧边栏显示
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  // 关闭当前页面，返回工作台
  const handleClose = () => {
    navigate('/workspace');
  };
  
  // 返回课程页面
  const handleBack = () => {
    navigate(`/workspace/course/${courseId}`);
  };
  
  // 切换暗/亮模式
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // 切换AI助手窗口
  const toggleAiHelper = () => {
    setShowAiHelper(!showAiHelper);
  };

  // Python示例代码
  const sampleCode = `# Python 基础数据类型示例

# 数值类型
x = 42          # 整数
y = 3.14        # 浮点数
z = 1 + 2j      # 复数

# 布尔类型
is_active = True
is_valid = False

# 字符串类型
name = "Python"
message = 'Hello, World!'
multi_line = """这是一个
多行字符串
示例。"""

# 列表（有序、可变）
languages = ["Python", "Java", "JavaScript"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "Hello", True, 3.14]

# 元组（有序、不可变）
coordinates = (10, 20)
rgb = (255, 0, 0)

# 集合（无序、唯一值）
unique_numbers = {1, 2, 3, 4, 5}
cities = {"北京", "上海", "广州", "深圳"}

# 字典（键值对）
person = {
    "name": "张三",
    "age": 30,
    "skills": ["Python", "数据分析", "机器学习"]
}

# 输出各种类型的示例
print(f"整数: {x}")
print(f"浮点数: {y}")
print(f"复数: {z}")
print(f"布尔值: {is_active}, {is_valid}")
print(f"字符串: {name}, {message}")
print(f"列表: {languages}")
print(f"元组: {coordinates}")
print(f"集合: {unique_numbers}")
print(f"字典: {person}")`;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 左侧导航 */}
      {sidebarVisible && <WorkspaceSidebar activePath={location.pathname} />}
      
      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部菜单栏 */}
        <header className="bg-white border-b border-gray-200 flex h-12 items-center px-4 z-10">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-800 mr-2 p-1"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            
            {/* 只在侧边栏收起时显示KeepStudy logo */}
            {!sidebarVisible && (
              <span className="text-xl font-bold text-primary text-gradient italic font-serif transform -rotate-2 inline-block mr-4">KeepStudy</span>
            )}
          </div>

          {/* 顶部标签页 */}
          <div className="flex space-x-1 ml-2">
            <div className="flex items-center px-3 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">
              <FontAwesomeIcon icon={faCode} className="mr-2" />
              <span>File</span>
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faTimes} size="xs" />
              </button>
            </div>

            <button className="text-gray-600 hover:bg-gray-100 rounded px-2">
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </button>
          </div>

          <div className="ml-auto flex items-center space-x-3">
            <button className="text-gray-600 hover:text-gray-800" onClick={toggleTheme}>
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <button 
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
            >
              <FontAwesomeIcon icon={faHome} className="mr-1" />
              <span>返回课程</span>
            </button>
            <button 
              onClick={handleClose} 
              className="text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </header>

        {/* 副菜单 */}
        <div className="bg-gray-100 border-b border-gray-200 flex items-center px-4 py-1">
          <div className="flex space-x-2">
            <button className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200">
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              <span>运行</span>
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200">
              <span>保存</span>
            </button>
          </div>
          <div className="ml-auto text-sm text-gray-500">
            Python 3.9
          </div>
        </div>
        
        {/* 主体内容区域 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧课程目录 */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-3 transition-all duration-300 ease-in-out flex flex-col">
            <h3 className="text-base font-medium mb-3 px-2">课程目录</h3>
            
            <div className="space-y-1 flex-1 overflow-auto">
              <div className="flex items-center py-1 px-2 bg-blue-50 text-blue-700 rounded">
                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                <span className="text-sm font-medium">Python 基础</span>
              </div>
              
              <div className="pl-4 space-y-1">
                <div className="flex items-center py-1 px-2 text-blue-700 rounded">
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                  <span className="text-sm">Python 基础数据类型</span>
                </div>
                
                <div className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-2" />
                  <span className="text-sm">Python 字符串表操作</span>
                </div>
                
                <div className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-2" />
                  <span className="text-sm">Python 列表和元组</span>
                </div>
                
                <div className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-2" />
                  <span className="text-sm">Python 字典和集合</span>
                </div>
                
                <div className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-2" />
                  <span className="text-sm">Python 流程控制</span>
                </div>
              </div>
              
              <div className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <FontAwesomeIcon icon={faBookOpen} className="text-gray-500 mr-2" />
                <span className="text-sm font-medium">Python 函数</span>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 ml-auto" />
              </div>
              
              <div className="flex items-center py-1 px-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <FontAwesomeIcon icon={faBookOpen} className="text-gray-500 mr-2" />
                <span className="text-sm font-medium">Python 面向对象</span>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 ml-auto" />
              </div>
            </div>
          </div>
          
          {/* 代码编辑区域 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 标签页切换 */}
            <div className="border-b border-gray-200 bg-gray-50 flex">
              <button 
                className={`px-4 py-2 text-sm font-medium ${selectedTab === 'code' ? 'bg-white border-t-2 border-blue-500' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedTab('code')}
              >
                <FontAwesomeIcon icon={faCode} className="mr-2" />
                代码
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${selectedTab === 'console' ? 'bg-white border-t-2 border-blue-500' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedTab('console')}
              >
                <FontAwesomeIcon icon={faTerminal} className="mr-2" />
                控制台
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${selectedTab === 'output' ? 'bg-white border-t-2 border-blue-500' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedTab('output')}
              >
                <FontAwesomeIcon icon={faList} className="mr-2" />
                输出
              </button>
            </div>
            
            {/* 代码内容区 */}
            <div className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              {selectedTab === 'code' && (
                <pre className={`p-5 h-full font-mono text-sm leading-6 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <code>
                    {sampleCode.split('\n').map((line, index) => {
                      // 简单的语法高亮实现
                      let highlightedLine = line;
                      
                      // 高亮注释
                      if (line.trim().startsWith('#')) {
                        highlightedLine = `<span class="${darkMode ? 'text-gray-500' : 'text-gray-500'}">${highlightedLine}</span>`;
                      } else {
                        // 高亮字符串
                        highlightedLine = highlightedLine.replace(
                          /(["'])(?:(?=(\\?))\2.)*?\1/g,
                          `<span class="${darkMode ? 'text-green-400' : 'text-green-600'}">$&</span>`
                        );
                        
                        // 高亮关键字
                        const keywords = ['def', 'if', 'else', 'elif', 'for', 'while', 'in', 'True', 'False', 'None', 'import', 'from', 'as', 'class', 'return', 'print', 'f'];
                        keywords.forEach(keyword => {
                          const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                          highlightedLine = highlightedLine.replace(
                            regex, 
                            `<span class="${darkMode ? 'text-blue-400' : 'text-blue-600'}">$&</span>`
                          );
                        });
                      }
                      
                      return (
                        <div key={index} className="flex">
                          <span className={`inline-block w-8 mr-4 text-right select-none ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            {index + 1}
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
                        </div>
                      );
                    })}
                  </code>
                </pre>
              )}
              
              {selectedTab === 'console' && (
                <div className={`p-4 font-mono text-sm ${darkMode ? 'bg-gray-900 text-white' : 'bg-black text-green-400'}`}>
                  <div>$ python script.py</div>
                  <div>等待输入...</div>
                </div>
              )}
              
              {selectedTab === 'output' && (
                <div className={`p-4 font-mono text-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black border-t'}`}>
                  <div>整数: 42</div>
                  <div>浮点数: 3.14</div>
                  <div>复数: (1+2j)</div>
                  <div>布尔值: True, False</div>
                  <div>字符串: Python, Hello, World!</div>
                  <div>列表: ['Python', 'Java', 'JavaScript']</div>
                  <div>元组: (10, 20)</div>
                  <div>集合: {`{1, 2, 3, 4, 5}`}</div>
                  <div>字典: {`{'name': '张三', 'age': 30, 'skills': ['Python', '数据分析', '机器学习']}`}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 底部状态栏 */}
        <footer className="bg-gray-100 border-t border-gray-200 h-6 flex items-center justify-between px-4 text-xs text-gray-500">
          <div>行 1, 列 1</div>
          <div>Python 基础数据类型.ipynb</div>
          <div>GPU: 1 h 59 min</div>
        </footer>
      </main>
      
      {/* 浮动AI助手图标 */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={toggleAiHelper}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all transform hover:scale-105"
          title="AI助手"
        >
          <FontAwesomeIcon icon={faRobot} size="lg" />
        </button>
      </div>
      
      {/* AI助手窗口 */}
      {showAiHelper && (
        <div 
          ref={aiHelperRef}
          className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden flex flex-col"
          style={{ maxHeight: '60vh' }}
        >
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faRobot} className="mr-2" />
              <span className="font-medium">AI助手</span>
            </div>
            <button onClick={toggleAiHelper} className="text-white hover:text-gray-200">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 min-h-[200px]">
            {aiMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 text-3xl mb-3" />
                <p className="text-gray-600 mb-3">我可以帮助你解答Python相关问题</p>
                <div className="space-y-2 w-full">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm w-full px-3 py-2 rounded-md transition-colors text-left">
                    什么是Python的基本数据类型？
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm w-full px-3 py-2 rounded-md transition-colors text-left">
                    如何创建和使用Python字典？
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm w-full px-3 py-2 rounded-md transition-colors text-left">
                    列表和元组有什么区别？
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {aiMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-lg px-3 py-2 ${msg.type === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-white border border-gray-200 text-gray-800 shadow-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-gray-200">
            <form onSubmit={handleAiSubmit} className="flex">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="输入你的问题..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-lg px-3 py-2 hover:bg-blue-600 transition-colors"
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

export default PracticeWorkspacePage;
