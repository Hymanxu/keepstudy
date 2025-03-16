import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faCode, faLaptopCode, faComments, 
  faChevronRight, faQuestionCircle, faClock, faTrophy
} from '@fortawesome/free-solid-svg-icons';

const AssessmentStart: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const assessmentTypes = [
    {
      id: 'oj',
      title: 'OJ编程评测',
      icon: faCode,
      color: 'bg-blue-100 text-blue-600',
      description: '通过AI智能评测系统，测试您的编程能力和算法思维',
      benefits: ['掌握常见算法题解法', '提高编码效率和准确性', '获得个性化改进建议'],
      duration: '30-60分钟',
      path: '/ai-assessment/oj'
    },
    {
      id: 'project',
      title: '项目实验评测',
      icon: faLaptopCode,
      color: 'bg-purple-100 text-purple-600',
      description: '完成实际项目或实验，接受AI综合评价和建议',
      benefits: ['应用理论知识解决实际问题', '锻炼项目设计和实现能力', '获得全面的项目反馈'],
      duration: '1-7天',
      path: '/ai-assessment/project'
    },
    {
      id: 'interview',
      title: 'AI模拟面试',
      icon: faComments,
      color: 'bg-green-100 text-green-600',
      description: '与AI进行真实面试模拟，提升面试技巧和信心',
      benefits: ['掌握面试常见问题的回答技巧', '提前适应面试压力和节奏', '获得详细的表现反馈'],
      duration: '15-30分钟',
      path: '/ai-assessment/interview'
    }
  ];
  
  const handleAssessmentSelect = (id: string) => {
    setSelectedType(id);
  };
  
  const handleStartAssessment = () => {
    if (!selectedType) return;
    
    setIsSubmitting(true);
    
    // 模拟加载
    setTimeout(() => {
      setIsSubmitting(false);
      const selectedAssessment = assessmentTypes.find(type => type.id === selectedType);
      if (selectedAssessment) {
        navigate(selectedAssessment.path);
      }
    }, 1000);
  };

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-[1100px] px-4 py-8">
        <div className="mb-6">
          <Link to="/ai-assessment" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            返回测评中心
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-2">开始您的评测之旅</h1>
        <p className="text-gray-600 mb-8">选择适合您的评测类型，开始提升您的技能</p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {assessmentTypes.map(type => (
            <div 
              key={type.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedType === type.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleAssessmentSelect(type.id)}
            >
              <div className={`p-5 ${type.color} flex items-center justify-center`}>
                <FontAwesomeIcon icon={type.icon} className="text-3xl" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-400" />
                    预计时间: {type.duration}
                  </div>
                </div>
                
                <ul className="space-y-1 mb-4">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-5 rounded-lg mb-8">
          <div className="flex">
            <FontAwesomeIcon icon={faQuestionCircle} className="text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="font-medium text-blue-800 mb-2">评测须知</h3>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>评测过程中请保持网络连接稳定</li>
                <li>编程评测需要在限定时间内完成</li>
                <li>模拟面试建议在安静环境中进行，并开启麦克风权限</li>
                <li>项目评测可能需要几天时间完成，您可以分多次进行</li>
                <li>所有评测结果将保存在您的个人账户中，方便日后查看</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-5 bg-white shadow rounded-lg">
          <div>
            <h3 className="font-medium">准备好开始您选择的评测了吗？</h3>
            {selectedType ? (
              <p className="text-gray-600 text-sm">
                您已选择: <span className="font-medium">{assessmentTypes.find(t => t.id === selectedType)?.title}</span>
              </p>
            ) : (
              <p className="text-red-600 text-sm">请先选择一个评测类型</p>
            )}
          </div>
          <button 
            onClick={handleStartAssessment}
            disabled={!selectedType || isSubmitting}
            className={`px-6 py-2 rounded-md text-white flex items-center ${
              !selectedType || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>处理中...</>
            ) : (
              <>
                开始评测
                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </>
            )}
          </button>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
            <FontAwesomeIcon icon={faTrophy} className="text-2xl" />
          </div>
          <h2 className="text-xl font-bold mb-2">获得证书和认证</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            完成评测后，您可以获得相应的技能证书和认证，这些证书可以添加到您的简历中，
            向潜在雇主展示您的专业技能和学习成果。
          </p>
          <Link to="/ai-assessment/certificates" className="text-blue-600 hover:underline">
            了解更多关于证书的信息
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssessmentStart; 