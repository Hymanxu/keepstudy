import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faFileUpload, faCheck, faSpinner, faInfoCircle, 
  faExclamationTriangle, faVideoCamera, faCode, faFileArchive, 
  faLink, faLightbulb, faCloudUploadAlt, faCheckCircle, faTrophy
} from '@fortawesome/free-solid-svg-icons';

const ProjectAssessment: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionComplete, setSubmissionComplete] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [repoLink, setRepoLink] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('description');

  // 项目数据
  const projects = [
    {
      id: 1,
      title: '电商网站前端实现',
      difficulty: '中等',
      category: '前端开发',
      description: '本项目旨在评估学习者在前端开发中的实际应用能力，通过构建一个功能完整的电商网站前端，展示对React框架、状态管理、UI交互设计的掌握程度。',
      deliverables: [
        '功能完整的电商网站前端源码',
        '关键功能的开发过程录屏',
        '项目文档和说明书',
        '项目部署链接（如有）'
      ],
      requirements: [
        '使用React构建SPA电商网站',
        '实现商品列表、详情、购物车、结算流程',
        '使用状态管理（Redux或Context API）',
        '包含响应式设计，适配移动端',
        '至少包含5个以上商品类别'
      ],
      evaluationCriteria: [
        '代码质量与架构设计 (30%)',
        '功能完整性与用户体验 (30%)',
        '开发过程规范性（从录屏评估）(20%)',
        '技术栈应用能力 (10%)',
        '文档完整性 (10%)'
      ],
      expectedTime: '5-7天',
      skills: ['React', 'JavaScript', 'CSS', 'Redux', 'Responsive Design'],
      points: 300,
      certValue: '前端开发工程师认证'
    },
    {
      id: 2,
      title: '天气数据可视化系统',
      difficulty: '中等',
      category: '数据可视化',
      description: '该项目要求学习者利用可视化技术，将天气数据以直观、美观的方式展现，重点考察数据处理能力和可视化实现技巧。',
      deliverables: [
        '完整的可视化系统源码',
        '关键功能的开发过程录屏',
        '项目文档和使用说明',
        '数据接口说明和接入方式'
      ],
      requirements: [
        '使用任意技术栈实现天气数据可视化',
        '展示温度、湿度、风速等多维数据',
        '至少包括折线图、柱状图、热力图等3种以上可视化图表',
        '支持时间范围选择和数据对比',
        '良好的UI设计和交互体验'
      ],
      evaluationCriteria: [
        '数据处理与分析能力 (30%)',
        '可视化效果与交互体验 (30%)',
        '开发过程规范性（从录屏评估）(20%)',
        '技术实现方案 (10%)',
        '代码质量 (10%)'
      ],
      expectedTime: '4-6天',
      skills: ['D3.js/ECharts/Chart.js', 'JavaScript', 'API集成', 'UI设计'],
      points: 280,
      certValue: '数据可视化工程师认证'
    },
    {
      id: 3,
      title: '个人博客系统',
      difficulty: '简单',
      category: '全栈开发',
      description: '这是一个全栈项目，要求实现一个功能基础但完整的博客系统，评估学习者的前后端开发技能以及数据库设计能力。',
      deliverables: [
        '完整的博客系统源码（前后端）',
        '数据库设计文档',
        '开发过程录屏',
        '部署指南'
      ],
      requirements: [
        '实现一个简易博客系统',
        '包含文章发布、编辑、删除功能',
        '实现用户注册、登录功能',
        '支持文章分类和标签',
        '支持Markdown编辑和预览'
      ],
      evaluationCriteria: [
        '系统功能完整性 (25%)',
        '前后端结合能力 (25%)',
        '开发过程规范性（从录屏评估）(20%)',
        '数据库设计 (15%)',
        '用户体验 (15%)'
      ],
      expectedTime: '3-5天',
      skills: ['Node.js', 'Express', 'MongoDB/MySQL', 'React/Vue', 'RESTful API'],
      points: 200,
      certValue: '全栈开发工程师认证'
    }
  ];

  const handleProjectSelect = (projectId: number) => {
    setActiveProject(projectId);
    // 重置提交状态
    setSubmissionComplete(false);
    setUploadedFiles([]);
    setUploadedVideo(null);
    setRepoLink('');
    setActiveTab('description');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedVideo(e.target.files[0]);
    }
  };

  const handleRepoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoLink(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionComplete(true);
    }, 3000);
  };

  const canSubmit = (uploadedFiles.length > 0 || repoLink.trim() !== '') && uploadedVideo !== null;

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-[1100px] px-4 py-8">
        <div className="mb-6">
          <Link to="/ai-assessment" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            返回测评中心
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-2">项目级评测</h1>
        <p className="text-gray-600 mb-6">完成实际项目任务，提交源码与开发过程录屏，接受AI综合评价和建议</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 项目列表 */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <h2 className="text-lg font-bold text-blue-800">选择项目</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {projects.map(project => (
                  <li 
                    key={project.id} 
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${activeProject === project.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleProjectSelect(project.id)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.difficulty === '简单' ? 'bg-green-100 text-green-800' : 
                        project.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">{project.category}</p>
                      <p className="text-sm text-blue-600 font-medium">{project.points} 分</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 项目详情和提交 */}
          <div className="lg:w-2/3">
            {activeProject ? (
              <div className="bg-white rounded-lg shadow-md">
                {submissionComplete ? (
                  <div className="text-center py-8 px-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
                      <FontAwesomeIcon icon={faCheck} className="text-green-600 text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">项目提交成功!</h2>
                    <p className="text-gray-600 mb-6">
                      您的项目已提交评测，我们的AI系统将对您的项目进行全面分析和评估。
                    </p>
                    <p className="text-gray-600 mb-8">
                      评测结果将在24-48小时内通过邮件发送给您，请保持关注。
                    </p>
                    <div className="flex justify-center">
                      <button 
                        onClick={() => setActiveProject(null)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-4"
                      >
                        选择其他项目
                      </button>
                      <Link 
                        to="/ai-assessment" 
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        返回测评中心
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {projects.filter(p => p.id === activeProject).map(project => (
                      <div key={project.id}>
                        <div className="border-b border-gray-200">
                          <div className="p-5 flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h2 className="text-xl font-bold">{project.title}</h2>
                                <span className={`ml-3 px-3 py-1 rounded-full text-sm ${
                                  project.difficulty === '简单' ? 'bg-green-100 text-green-800' : 
                                  project.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {project.difficulty}
                                </span>
                              </div>
                              <p className="text-gray-500 mt-1">{project.category} · {project.expectedTime} · {project.points} 分</p>
                            </div>
                            <div className="bg-blue-50 px-3 py-2 rounded-md">
                              <p className="text-sm text-blue-700">获得: <strong>{project.certValue}</strong></p>
                            </div>
                          </div>
                          
                          <div className="px-1">
                            <nav className="flex">
                              <button 
                                className={`py-3 px-4 border-b-2 text-sm font-medium ${
                                  activeTab === 'description' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                                onClick={() => setActiveTab('description')}
                              >
                                项目描述
                              </button>
                              <button 
                                className={`py-3 px-4 border-b-2 text-sm font-medium ${
                                  activeTab === 'submit' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                                onClick={() => setActiveTab('submit')}
                              >
                                提交项目
                              </button>
                            </nav>
                          </div>
                        </div>
                        
                        {activeTab === 'description' ? (
                          <div className="p-5">
                            <p className="text-gray-700 mb-6">{project.description}</p>
                            
                            <div className="mb-6">
                              <h3 className="text-lg font-medium mb-3">项目要求</h3>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {project.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="text-lg font-medium mb-3">提交物</h3>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {project.deliverables.map((del, index) => (
                                  <li key={index}>{del}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="text-lg font-medium mb-3">评估标准</h3>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {project.evaluationCriteria.map((criterion, index) => (
                                  <li key={index}>{criterion}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="text-lg font-medium mb-3">相关技能</h3>
                              <div className="flex flex-wrap gap-2">
                                {project.skills.map((skill, index) => (
                                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
                              <FontAwesomeIcon icon={faLightbulb} className="text-yellow-600 mr-3 mt-1" />
                              <div>
                                <h4 className="font-medium text-yellow-800 mb-1">录屏说明</h4>
                                <p className="text-sm text-yellow-700">
                                  录制开发过程中的关键节点，如架构设计、核心功能实现、问题解决等。录屏不需要覆盖整个开发过程，
                                  但需要充分展示您的思考过程和实现方法。推荐录制15-30分钟的精华片段。
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-center">
                              <button 
                                onClick={() => setActiveTab('submit')}
                                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              >
                                准备提交项目
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-5">
                            <div className="mb-4 p-4 bg-blue-50 rounded-lg flex items-start">
                              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 mr-3 mt-1" />
                              <div>
                                <p className="text-sm text-blue-800">
                                  请提交以下内容：
                                  <ol className="list-decimal list-inside mt-2 space-y-1">
                                    <li>项目源代码（ZIP压缩包）或GitHub仓库链接</li>
                                    <li>开发过程录屏（MP4格式，建议15-30分钟）</li>
                                  </ol>
                                </p>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                1. 上传项目文件 (.zip, .rar, .7z)
                              </label>
                              <div 
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
                                onClick={() => document.getElementById('fileInput')?.click()}
                              >
                                <input
                                  type="file"
                                  id="fileInput"
                                  className="hidden"
                                  accept=".zip,.rar,.7z"
                                  onChange={handleFileChange}
                                />
                                {uploadedFiles.length > 0 ? (
                                  <div>
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl mb-2" />
                                    <p className="font-medium">{uploadedFiles.map(f => f.name).join(', ')}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {(uploadedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                  </div>
                                ) : (
                                  <div>
                                    <FontAwesomeIcon icon={faFileArchive} className="text-gray-400 text-3xl mb-2" />
                                    <p>点击或拖放文件到此处上传</p>
                                    <p className="text-sm text-gray-500 mt-1">支持 .zip, .rar, .7z 格式</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                2. 上传开发过程录屏 (.mp4, .mov, .avi)
                              </label>
                              <div 
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
                                onClick={() => document.getElementById('videoInput')?.click()}
                              >
                                <input
                                  type="file"
                                  id="videoInput"
                                  className="hidden"
                                  accept="video/*"
                                  onChange={handleVideoChange}
                                />
                                {uploadedVideo ? (
                                  <div>
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl mb-2" />
                                    <p className="font-medium">{uploadedVideo.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                  </div>
                                ) : (
                                  <div>
                                    <FontAwesomeIcon icon={faVideoCamera} className="text-gray-400 text-3xl mb-2" />
                                    <p>点击或拖放视频到此处上传</p>
                                    <p className="text-sm text-gray-500 mt-1">支持常见视频格式，如 .mp4, .mov 等</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                3. 或者提供项目GitHub链接 (可选，与文件上传二选一)
                              </label>
                              <div className="flex items-center">
                                <div className="bg-gray-100 rounded-l-md p-3 border border-gray-300 border-r-0">
                                  <FontAwesomeIcon icon={faLink} className="text-gray-500" />
                                </div>
                                <input 
                                  type="text" 
                                  placeholder="例如: https://github.com/username/project" 
                                  className="flex-1 p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={repoLink}
                                  onChange={handleRepoLinkChange}
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-end">
                              <button 
                                onClick={handleSubmit}
                                disabled={!canSubmit || isSubmitting}
                                className={`px-6 py-2 rounded-md text-white flex items-center ${
                                  !canSubmit || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                              >
                                {isSubmitting ? (
                                  <>
                                    <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                                    提交中...
                                  </>
                                ) : (
                                  <>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                                    提交项目
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-10 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600 text-2xl" />
                </div>
                <h2 className="text-xl font-medium mb-4">请从左侧选择一个项目开始</h2>
                <p className="text-gray-600 mb-4">
                  选择适合您当前技能水平的项目，完成后提交以获取AI专业评估和改进建议。
                </p>
                <p className="text-gray-500 text-sm">
                  通过完成项目级评测，您将获得权威认证和专业技能证书，为您的职业发展增添亮点。
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* 证书与认证说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-5">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 mr-2" />
            权威项目认证
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700">评测流程</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>AI系统自动评估代码质量</li>
                <li>专家团队审核项目成果</li>
                <li>通过录屏分析开发能力</li>
                <li>48小时内完成评测反馈</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700">认证价值</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>行业认可的技能认证</li>
                <li>可添加至简历和求职资料</li>
                <li>提供专业技能验证链接</li>
                <li>合作企业优先考虑</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700">合作机构</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>华为技术认证体系</li>
                <li>工信部教育与考试中心</li>
                <li>中国软件行业协会</li>
                <li>全球数字技能标准联盟</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAssessment; 