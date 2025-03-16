import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLaptopCode, faComments, faCertificate, faChevronRight, faVideoCamera } from '@fortawesome/free-solid-svg-icons';

const AIAssessment: React.FC = () => {
  // 评测类型数据
  const assessmentTypes = [
    {
      id: 1,
      title: '基础编程评测',
      description: '通过AI智能评测系统，参与马拉松式编程考试，测试您的编程能力和算法思维',
      icon: faCode,
      color: 'bg-blue-100 text-blue-600',
      link: '/ai-assessment/oj',
      features: ['实时代码评估', '多语言支持', '马拉松式考试', '个性化改进建议']
    },
    {
      id: 2,
      title: '项目级评测',
      description: '完成实际项目任务，提交源码与开发过程录屏，接受AI综合评价和建议',
      icon: faLaptopCode,
      color: 'bg-purple-100 text-purple-600',
      link: '/ai-assessment/project',
      features: ['完整项目评估', '开发过程录屏分析', '最佳实践建议', '架构设计点评']
    },
    {
      id: 3,
      title: '实时在线评测',
      description: '通过实时视频沟通方式，与AI专家进行技术交流，获取即时反馈和指导',
      icon: faVideoCamera,
      color: 'bg-green-100 text-green-600',
      link: '/ai-assessment/interview',
      features: ['实时视频互动', '深度技术讨论', '即时反馈', '表现能力分析']
    }
  ];

  // 证书展示数据
  const certificates = [
    {
      id: 1,
      name: 'HCIP-Cloud Computing',
      issueDate: '2023-06-15',
      issuer: '华为技术认证',
      image: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      id: 2,
      name: '高级软件工程师认证',
      issueDate: '2023-08-23',
      issuer: '工业和信息化部教育与考试中心',
      image: 'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      id: 3,
      name: '全栈开发工程师证书',
      issueDate: '2023-11-05',
      issuer: '中国软件行业协会',
      image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    }
  ];

  return (
    <div className="pt-[72px] bg-gray-50 min-h-screen">
      {/* 头部横幅 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto max-w-[1100px] px-4">
          <h1 className="text-4xl font-bold mb-4">AI测评中心</h1>
          <p className="text-xl max-w-3xl">通过AI技术，全方位评估您的技术能力，提供个性化的学习建议和职业规划指导</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/ai-assessment/start" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              立即开始评测
            </Link>
            <button className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </div>

      {/* 步骤说明 - 评测流程 (调整到前面) */}
      <div className="container mx-auto max-w-[1100px] px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">评测流程</h2>
        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* 连接线 (仅在中等尺寸屏幕以上显示) */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200"></div>
          
          {/* 步骤 */}
          {[
            { number: 1, title: '选择评测类型', desc: '根据您的需求选择合适的评测方向' },
            { number: 2, title: '完成评测任务', desc: '按照系统指引，完成相应的测评内容' },
            { number: 3, title: '获取详细报告', desc: 'AI系统生成个性化的能力评估和改进建议' },
            { number: 4, title: '获得技能证书', desc: '达到要求后获得相应证书，可用于简历展示' }
          ].map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-white rounded-lg shadow-md p-6 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 评测类型部分 (调整到后面) */}
      <div className="container mx-auto max-w-[1100px] px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold mb-12 text-center">评测类型</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {assessmentTypes.map(type => (
            <div key={type.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`p-6 ${type.color} flex items-center justify-center`}>
                <FontAwesomeIcon icon={type.icon} className="text-4xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="mb-6">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-start mb-2">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={type.link} className="block text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  开始评测
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 证书验证部分 - 增加权威认证元素 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-[1100px] px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">权威证书认证体系</h2>
              <p className="text-gray-600 mb-6">
                我们与华为、工信部等权威机构合作，完成测评后获得的证书具备行业认可度，雇主和招聘者可通过我们的验证系统核实您的专业能力和技术水平。
              </p>
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">证书验证码查询</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="输入证书验证码" 
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                    验证
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-xl font-bold mb-6">权威合作证书</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                    <img src={cert.image} alt={cert.name} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <h4 className="font-medium mb-1">{cert.name}</h4>
                      <p className="text-xs text-gray-500 mb-1">颁发机构: {cert.issuer}</p>
                      <p className="text-xs text-gray-500">颁发日期: {cert.issueDate}</p>
                      <div className="mt-2 flex">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">可查验</span>
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">行业认可</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 号召性用语 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto max-w-[1100px] px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">立即提升您的技术能力</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            通过AI测评，了解您的技能水平，获得专业指导，实现职业突破
          </p>
          <Link to="/ai-assessment/start" className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            开始我的评测之旅
            <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIAssessment; 