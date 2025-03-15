import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faHistory, faCode, faChevronRight,
  faBook, faComments, faUser, faQuestionCircle, faTimes, faLaptopCode
} from '@fortawesome/free-solid-svg-icons';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface WorkspaceSidebarProps {
  activePath?: string;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ activePath }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isDefaultWorkspace = false;
  const isCourseMode = currentPath.includes('/workspace/course');
  
  // 能力雷达图悬浮状态
  const [showSkillsRadar, setShowSkillsRadar] = useState(false);
  
  // 能力雷达图数据
  const skillsData = [
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
  ];

  // 返回首页
  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <nav className="w-[250px] border-r border-gray-200 flex flex-col h-full bg-gray-50 transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="p-4">
        <div onClick={handleGoToHome} className="cursor-pointer">
          <span className="text-2xl font-bold text-primary text-gradient italic font-serif transform -rotate-2 inline-block">KeepStudy</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-4 overflow-y-auto scrollbar-hide">
        {/* 添加内容按钮 */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-center space-x-2 font-medium p-3 rounded-lg border border-dashed border-gray-300 hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/workspace')}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>添加内容</span>
          </button>
        </div>
        
        {/* 菜单项 */}
        <div className="space-y-2">
          <Link 
            to="/workspace" 
            className={`flex items-center space-x-3 p-3 rounded-lg ${isDefaultWorkspace ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <FontAwesomeIcon icon={faHistory} />
            <span>历史记录</span>
          </Link>
        </div>
        
        {/* 最近学习 */}
        <div className="mt-8">
          <h3 className="text-gray-500 text-sm font-medium mb-3 px-3">最近学习</h3>
          <div className="space-y-1">
            <div 
              className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"
              onClick={() => navigate('/workspace/course/1')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm truncate">集体智能: 人机超级mind的...</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 opacity-0 group-hover:opacity-100 text-xs" />
              </div>
            </div>
            
            <div 
              className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"
              onClick={() => navigate('/workspace/practice/1?openAI=true')}
            >
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
            <Link 
              to="/workspace/plan/1" 
              className={`flex items-center p-3 rounded-lg ${currentPath.includes('/plan/1') ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCode} className="text-blue-500" />
                <span>Java 开发工程师</span>
              </div>
              <div className="ml-auto text-xs text-gray-500">35%</div>
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 ml-2 text-xs" />
            </Link>
            
            <Link 
              to="/workspace/plan/2" 
              className={`flex items-center p-3 rounded-lg ${currentPath.includes('/plan/2') ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faLaptopCode} className="text-purple-500" />
                <span>Web 前端开发</span>
              </div>
              <div className="ml-auto text-xs text-gray-500">68%</div>
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 ml-2 text-xs" />
            </Link>
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
      <div className="mt-auto p-4 relative">
        <div 
          className="flex items-center p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white cursor-pointer"
          onClick={() => setShowSkillsRadar(!showSkillsRadar)}
        >
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
            alt="用户头像" 
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex items-center ml-2">
            <span className="text-sm font-medium">用户名</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">Lv1</span>
          </div>
        </div>
        
        {/* 能力雷达图 */}
        {showSkillsRadar && (
          <div className="absolute bottom-24 left-0 w-[280px] bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">能力雷达图</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 p-1"
                onClick={() => setShowSkillsRadar(false)}
              >
                <FontAwesomeIcon icon={faTimes} size="sm" />
              </button>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 9 }} />
                  <Radar
                    name="能力等级"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#60a5fa"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2 text-center text-xs text-gray-500">
              <p>综合能力评分: <span className="font-medium text-blue-600">78</span>/100</p>
              <div className="flex justify-center mt-1">
                <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" />
                  评分解释
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default WorkspaceSidebar;
