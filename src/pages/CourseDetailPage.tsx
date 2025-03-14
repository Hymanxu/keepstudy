import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faUserFriends, faClock, faTag, faGraduationCap, faBookOpen } from '@fortawesome/free-solid-svg-icons';

// 导入模拟课程数据（实际应用中应从API获取）
const COURSES = [
  {
    id: 1,
    title: 'Python 全栈开发实战',
    description: '从基础到高级，掌握Python全栈开发技能，包括后端API、前端界面和数据库设计。',
    level: '中级',
    category: '编程开发',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    rating: 4.8,
    students: 1248,
    duration: '32小时',
    tags: ['Python', 'Django', 'Flask', '数据库'],
    instructor: '李明',
    instructorTitle: '资深Python开发工程师',
    instructorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    price: '¥299',
    originalPrice: '¥399',
    curriculum: [
      { id: 1, title: '课程介绍', lessons: 3, duration: '45分钟' },
      { id: 2, title: 'Python基础知识', lessons: 8, duration: '4小时' },
      { id: 3, title: 'Web开发基础', lessons: 6, duration: '3.5小时' },
      { id: 4, title: 'Django框架入门', lessons: 10, duration: '6小时' },
      { id: 5, title: 'Flask框架应用', lessons: 8, duration: '5小时' },
      { id: 6, title: '数据库设计与集成', lessons: 7, duration: '4.5小时' },
      { id: 7, title: '项目实战', lessons: 12, duration: '8小时' },
    ],
    features: [
      '24/7在线学习支持',
      '项目源代码下载',
      '证书颁发',
      '终身访问课程内容',
      '30天内退款保证'
    ]
  },
  {
    id: 2,
    title: '人工智能与机器学习基础',
    description: '深入了解AI和机器学习算法，通过实际项目学习如何应用深度学习技术。',
    level: '进阶',
    category: '人工智能',
    image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    rating: 4.9,
    students: 856,
    duration: '48小时',
    tags: ['人工智能', '机器学习', 'Python', 'TensorFlow'],
    instructor: '张红',
    instructorTitle: 'AI研究员',
    instructorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    price: '¥399',
    originalPrice: '¥499',
    curriculum: [
      { id: 1, title: '人工智能概述', lessons: 5, duration: '2小时' },
      { id: 2, title: '数学基础', lessons: 7, duration: '4小时' },
      { id: 3, title: '机器学习基础', lessons: 10, duration: '7小时' },
      { id: 4, title: '深度学习入门', lessons: 12, duration: '9小时' },
      { id: 5, title: 'TensorFlow实践', lessons: 15, duration: '12小时' },
      { id: 6, title: '项目实战', lessons: 10, duration: '14小时' },
    ],
    features: [
      'GPU加速实验环境',
      '数据集下载',
      '项目源代码',
      '证书颁发',
      '个人项目辅导'
    ]
  },
  {
    id: 3,
    title: 'Web前端开发入门到精通',
    description: '学习HTML、CSS、JavaScript和React，掌握现代前端开发技术。',
    level: '入门',
    category: '前端开发',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    rating: 4.6,
    students: 3452,
    duration: '24小时',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    instructor: '王强',
    instructorTitle: '前端开发专家',
    instructorImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    price: '¥199',
    originalPrice: '¥299',
    curriculum: [
      { id: 1, title: 'HTML基础', lessons: 8, duration: '3小时' },
      { id: 2, title: 'CSS样式与布局', lessons: 10, duration: '5小时' },
      { id: 3, title: 'JavaScript基础', lessons: 12, duration: '6小时' },
      { id: 4, title: 'DOM操作与事件', lessons: 6, duration: '3小时' },
      { id: 5, title: 'React入门', lessons: 8, duration: '4小时' },
      { id: 6, title: '项目实战', lessons: 5, duration: '3小时' },
    ],
    features: [
      '代码练习环境',
      '项目源码下载',
      '在线答疑',
      '证书颁发',
      '社区支持'
    ]
  },
  {
    id: 4,
    title: '数据结构与算法',
    description: '掌握计算机科学的核心知识，提高编程效率和代码质量。',
    level: '中级',
    category: '计算机科学',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    rating: 4.7,
    students: 1024,
    duration: '40小时',
    tags: ['数据结构', '算法', 'Java', 'LeetCode'],
    instructor: '刘博',
    instructorTitle: '算法工程师',
    instructorImage: 'https://randomuser.me/api/portraits/men/36.jpg',
    price: '¥349',
    originalPrice: '¥449',
    curriculum: [
      { id: 1, title: '算法分析基础', lessons: 5, duration: '2.5小时' },
      { id: 2, title: '基本数据结构', lessons: 10, duration: '6小时' },
      { id: 3, title: '高级数据结构', lessons: 8, duration: '5小时' },
      { id: 4, title: '排序算法', lessons: 6, duration: '4小时' },
      { id: 5, title: '搜索算法', lessons: 5, duration: '3.5小时' },
      { id: 6, title: '动态规划', lessons: 7, duration: '5小时' },
      { id: 7, title: '图算法', lessons: 8, duration: '6小时' },
      { id: 8, title: '算法设计技巧', lessons: 10, duration: '8小时' },
    ],
    features: [
      '300+编程练习',
      '面试题讲解',
      '算法可视化工具',
      '代码评审',
      '证书颁发'
    ]
  },
  {
    id: 5,
    title: '移动应用开发 - React Native',
    description: '用React Native开发跨平台移动应用，一次编码，多处运行。',
    level: '中级',
    category: '移动开发',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    rating: 4.5,
    students: 768,
    duration: '36小时',
    tags: ['React Native', 'JavaScript', 'iOS', 'Android'],
    instructor: '赵雪',
    instructorTitle: '移动开发专家',
    instructorImage: 'https://randomuser.me/api/portraits/women/29.jpg',
    price: '¥329',
    originalPrice: '¥429',
    curriculum: [
      { id: 1, title: 'React基础回顾', lessons: 6, duration: '3小时' },
      { id: 2, title: 'React Native入门', lessons: 8, duration: '4小时' },
      { id: 3, title: '组件与样式', lessons: 10, duration: '6小时' },
      { id: 4, title: '导航与路由', lessons: 5, duration: '3小时' },
      { id: 5, title: '状态管理', lessons: 6, duration: '4小时' },
      { id: 6, title: '原生模块集成', lessons: 7, duration: '5小时' },
      { id: 7, title: '应用发布与优化', lessons: 8, duration: '5小时' },
      { id: 8, title: '项目实战', lessons: 10, duration: '6小时' },
    ],
    features: [
      '项目源码下载',
      'iOS与Android环境配置指南',
      '应用发布指南',
      '在线答疑',
      '证书颁发'
    ]
  },
  {
    id: 6,
    title: '区块链技术与应用',
    description: '了解区块链原理，学习智能合约开发和去中心化应用设计。',
    level: '进阶',
    category: '区块链',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    rating: 4.6,
    students: 532,
    duration: '30小时',
    tags: ['区块链', 'Ethereum', 'Solidity', 'Web3'],
    instructor: '陈伟',
    instructorTitle: '区块链开发者',
    instructorImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    price: '¥399',
    originalPrice: '¥499',
    curriculum: [
      { id: 1, title: '区块链基础原理', lessons: 5, duration: '3小时' },
      { id: 2, title: '密码学与共识算法', lessons: 6, duration: '4小时' },
      { id: 3, title: '以太坊基础', lessons: 7, duration: '4小时' },
      { id: 4, title: 'Solidity编程', lessons: 10, duration: '7小时' },
      { id: 5, title: '智能合约开发', lessons: 8, duration: '6小时' },
      { id: 6, title: 'DApp开发实战', lessons: 6, duration: '6小时' },
    ],
    features: [
      '测试网络环境',
      '智能合约模板',
      '项目代码审查',
      '区块链开发工具包',
      '证书颁发'
    ]
  }
];

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  // 查找对应ID的课程
  const course = COURSES.find(c => c.id === Number(courseId));
  
  // 如果课程不存在，显示错误信息
  if (!course) {
    return (
      <div className="bg-gray-50 min-h-screen pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">课程未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，您查找的课程不存在或已被移除。</p>
          <button 
            onClick={() => navigate('/courses')}
            className="btn btn-primary"
          >
            返回课程列表
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pt-[72px]">
      {/* 返回按钮 */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-[1100px] px-4 py-4">
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            返回课程列表
          </button>
        </div>
      </div>
      
      {/* 课程头部信息 */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto max-w-[1100px] px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 课程图片 */}
            <div className="md:w-2/5">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* 课程信息 */}
            <div className="md:w-3/5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUserFriends} className="text-gray-500 mr-1" />
                  <span>{course.students} 名学生</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <img 
                    src={course.instructorImage} 
                    alt={course.instructor} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-gray-500">{course.instructorTitle}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    <FontAwesomeIcon icon={faTag} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-primary">{course.price}</div>
                <div className="text-gray-500 line-through">{course.originalPrice}</div>
              </div>
              
              <div className="flex gap-4">
                <button className="btn btn-primary px-8">立即购买</button>
                <button className="btn btn-outline px-8">加入购物车</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 课程内容部分 */}
      <div className="container mx-auto max-w-[1100px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* 课程章节 */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-primary" />
                课程大纲
              </h2>
              
              <div className="space-y-4">
                {course.curriculum.map((section) => (
                  <div key={section.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                      <h3 className="font-medium">{section.title}</h3>
                      <div className="text-sm text-gray-500">
                        {section.lessons} 个课时 · {section.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 课程介绍 */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">课程详情</h2>
              
              <div className="prose max-w-none">
                <p>本课程专为{course.level === '入门' ? '初学者' : course.level === '中级' ? '有一定基础的学习者' : '高级学习者'}设计，通过系统化的课程内容，帮助你掌握{course.category}领域的核心技能。</p>
                
                <p>课程由经验丰富的{course.instructor}老师讲授，他/她是{course.instructorTitle}，拥有多年教学和实战经验。</p>
                
                <p>通过学习本课程，你将能够：</p>
                <ul>
                  <li>深入理解{course.tags[0]}的核心概念和应用场景</li>
                  <li>掌握{course.tags.slice(1).join('、')}等技术的实际应用</li>
                  <li>通过实战项目，将理论知识转化为实际技能</li>
                  <li>获得在相关领域就业或升职的必备能力</li>
                </ul>
                
                <p>本课程共包含{course.curriculum.reduce((sum, section) => sum + section.lessons, 0)}个课时，总时长约{course.duration}，你可以根据自己的学习节奏灵活安排学习时间。</p>
              </div>
            </div>
          </div>
          
          <div>
            {/* 课程特点 */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 sticky top-[90px]">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-primary" />
                课程特点
              </h2>
              
              <ul className="space-y-4">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 