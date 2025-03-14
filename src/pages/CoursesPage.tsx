import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faStar, faUserFriends, faClock, faTag } from '@fortawesome/free-solid-svg-icons';

// Mock course data
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
    tags: ['Python', 'Django', 'Flask', '数据库']
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
    tags: ['人工智能', '机器学习', 'Python', 'TensorFlow']
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
    tags: ['HTML', 'CSS', 'JavaScript', 'React']
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
    tags: ['数据结构', '算法', 'Java', 'LeetCode']
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
    tags: ['React Native', 'JavaScript', 'iOS', 'Android']
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
    tags: ['区块链', 'Ethereum', 'Solidity', 'Web3']
  }
];

// Categories for filter
const CATEGORIES = [
  '全部',
  '编程开发',
  '人工智能',
  '前端开发',
  '计算机科学',
  '移动开发',
  '区块链'
];

// Levels for filter
const LEVELS = ['全部', '入门', '中级', '进阶'];

const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedLevel, setSelectedLevel] = useState('全部');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Filter courses based on search query, category, and level
  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === '全部' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === '全部' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // 处理课程卡片点击
  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-[72px]">
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto max-w-[1100px] px-4">
          <h1 className="text-4xl font-bold mb-4">课程广场</h1>
          <p className="text-xl mb-8 max-w-3xl">
            探索丰富的课程资源，开启你的AI辅助学习之旅，提升编程和人工智能技能。
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="搜索课程、技能或标签..."
              className="w-full py-3 px-5 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-[1100px] py-12 px-4">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mr-4">所有课程</h2>
            <span className="text-gray-500">
              {filteredCourses.length} 个结果
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="btn btn-outline flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              筛选
            </button>
          </div>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">课程分类</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">难度级别</h3>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(level => (
                    <button
                      key={level}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedLevel === level 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className="card hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white text-primary rounded-full px-2 py-1 text-sm font-medium">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                  {course.rating}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                  <span className="text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {course.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      <FontAwesomeIcon icon={faTag} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faUserFriends} className="mr-1" />
                    {course.students} 名学生
                  </span>
                  <button 
                    className="btn btn-primary text-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // 防止触发卡片的点击事件
                      handleCourseClick(course.id);
                    }}
                  >
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">未找到相关课程</h3>
            <p className="text-gray-600 mb-8">
              尝试使用不同的搜索词或筛选条件，或者清除所有筛选器查看所有课程。
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('全部');
                setSelectedLevel('全部');
              }}
            >
              查看所有课程
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
