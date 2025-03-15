import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle, faPlayCircle, faBookOpen, faClock, faChartLine, faCalendarAlt, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import WorkspaceSidebar from '../components/WorkspaceSidebar';

// 模拟计划数据
const PLANS = [
  {
    id: 1,
    title: 'Java 开发工程师',
    description: '全面掌握Java编程语言和企业级应用开发，包括Spring框架、微服务架构等核心技术。',
    progress: 35,
    startDate: '2023-09-15',
    estimatedEndDate: '2023-12-31',
    courses: [
      { id: 1, title: 'Java 基础入门', completed: true, progress: 100 },
      { id: 2, title: 'Java 面向对象编程', completed: true, progress: 100 },
      { id: 3, title: 'Java 集合与泛型', completed: false, progress: 75 },
      { id: 4, title: 'Java I/O与异常处理', completed: false, progress: 40 },
      { id: 5, title: 'Java 多线程编程', completed: false, progress: 20 },
      { id: 6, title: 'Spring框架基础', completed: false, progress: 0 },
      { id: 7, title: 'Spring Boot应用开发', completed: false, progress: 0 },
      { id: 8, title: 'Spring Cloud微服务', completed: false, progress: 0 },
    ],
    milestones: [
      { id: 1, title: '掌握Java语言基础', deadline: '2023-10-15', completed: true },
      { id: 2, title: '完成面向对象与高级特性学习', deadline: '2023-11-15', completed: false },
      { id: 3, title: '掌握Spring框架开发', deadline: '2023-12-15', completed: false },
      { id: 4, title: '完成微服务项目实战', deadline: '2023-12-31', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Web 前端开发',
    description: '学习现代前端开发技术栈，掌握HTML、CSS、JavaScript、React等核心技能，能够独立开发响应式网站和Web应用。',
    progress: 68,
    startDate: '2023-07-10',
    estimatedEndDate: '2023-11-30',
    courses: [
      { id: 1, title: 'HTML5与CSS3基础', completed: true, progress: 100 },
      { id: 2, title: 'CSS布局与响应式设计', completed: true, progress: 100 },
      { id: 3, title: 'JavaScript基础', completed: true, progress: 100 },
      { id: 4, title: 'DOM操作与事件处理', completed: true, progress: 100 },
      { id: 5, title: 'ES6新特性', completed: true, progress: 100 },
      { id: 6, title: 'React基础入门', completed: false, progress: 65 },
      { id: 7, title: 'React Hooks与状态管理', completed: false, progress: 30 },
      { id: 8, title: '前端工程化与性能优化', completed: false, progress: 0 },
    ],
    milestones: [
      { id: 1, title: '掌握HTML/CSS基础', deadline: '2023-08-10', completed: true },
      { id: 2, title: '掌握JavaScript核心概念', deadline: '2023-09-20', completed: true },
      { id: 3, title: '完成React框架学习', deadline: '2023-10-30', completed: false },
      { id: 4, title: '开发完整前端项目', deadline: '2023-11-30', completed: false },
    ]
  }
];

const PlanDetailPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  
  // 查找对应ID的计划
  const plan = PLANS.find(p => p.id === Number(planId));
  
  // 处理返回工作台
  const handleBack = () => {
    navigate('/workspace');
  };
  
  // 处理开始学习课程
  const handleStartCourse = (courseId: number) => {
    navigate(`/workspace/course/${courseId}`);
  };
  
  // 如果计划不存在，显示错误信息
  if (!plan) {
    return (
      <div className="flex h-screen">
        <WorkspaceSidebar activePath={`/workspace/plan/${planId}`} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">计划未找到</h1>
            <p className="text-gray-600 mb-8">抱歉，您查找的学习计划不存在或已被删除。</p>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              返回工作台
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 侧边栏 */}
      <WorkspaceSidebar activePath={`/workspace/plan/${planId}`} />
      
      {/* 主内容区域 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* 顶部标题栏 */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 shadow-sm">
          <button 
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-800 mr-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          
          <h1 className="text-lg font-semibold truncate">
            {plan.title} - 学习计划
          </h1>
        </header>
        
        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto py-8 px-6">
            {/* 计划概览 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{plan.title}</h2>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="mr-4">
                    <div className="text-sm text-gray-500 mb-1">总进度</div>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{plan.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">开始日期</div>
                    <div className="font-medium">{plan.startDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faClock} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">预计完成日期</div>
                    <div className="font-medium">{plan.estimatedEndDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faUsers} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">课程数量</div>
                    <div className="font-medium">{plan.courses.length} 门课程</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 课程列表 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">课程列表</h3>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {plan.courses.map((course, index) => (
                  <div 
                    key={course.id}
                    className={`border-b last:border-b-0 ${
                      activeCourseId === course.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    } transition-colors cursor-pointer`}
                    onClick={() => setActiveCourseId(activeCourseId === course.id ? null : course.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {course.completed ? (
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-xs font-medium">{index + 1}</span>
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <div className="flex items-center mt-1">
                              <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                                <div 
                                  className={`h-1.5 rounded-full ${course.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{course.progress}%</span>
                            </div>
                          </div>
                        </div>
                        <FontAwesomeIcon 
                          icon={activeCourseId === course.id ? faArrowLeft : faArrowRight} 
                          className="text-gray-400"
                        />
                      </div>
                    </div>
                    
                    {activeCourseId === course.id && (
                      <div className="px-4 pb-4 pt-2">
                        <div className="pl-9">
                          <p className="text-sm text-gray-600 mb-3">
                            {course.completed 
                              ? '您已完成该课程的学习！' 
                              : course.progress > 0
                                ? '继续学习该课程，巩固您的知识。'
                                : '开始学习这门课程，开启您的学习之旅。'
                            }
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartCourse(course.id);
                            }}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <FontAwesomeIcon icon={faPlayCircle} className="mr-1" />
                            <span>{course.progress > 0 ? '继续学习' : '开始学习'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 学习里程碑 */}
            <div>
              <h3 className="text-xl font-bold mb-4">学习里程碑</h3>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  {plan.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="relative pl-8">
                      {/* 连接线 */}
                      {index < plan.milestones.length - 1 && (
                        <div className="absolute top-6 bottom-0 left-[0.9375rem] w-0.5 bg-gray-200"></div>
                      )}
                      
                      {/* 里程碑标记 */}
                      <div className={`absolute top-0 left-0 w-7 h-7 rounded-full ${
                        milestone.completed ? 'bg-green-100' : 'bg-gray-100'
                      } flex items-center justify-center`}>
                        {milestone.completed ? (
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                        ) : (
                          <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <span className={`text-sm ${
                            milestone.completed ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {milestone.completed ? '已完成' : `截止日期: ${milestone.deadline}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailPage; 