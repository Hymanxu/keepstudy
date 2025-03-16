import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faVideo, faMicrophone, faVideoSlash, 
  faMicrophoneSlash, faSpinner, faCheck, faInfoCircle,
  faPlayCircle, faRedo, faUserCircle, faDesktop, faChartLine, 
  faLaptopCode, faCodeBranch, faServer, faCertificate
} from '@fortawesome/free-solid-svg-icons';

const InterviewAssessment: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('frontend');
  const [selectedLevel, setSelectedLevel] = useState<string>('junior');
  const [sessionStage, setSessionStage] = useState<'prep' | 'ongoing' | 'feedback'>('prep');
  const [currentTopic, setCurrentTopic] = useState<number>(0);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [responses, setResponses] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 定义技术交流主题
  const topics = {
    frontend: {
      junior: [
        "前端开发的基础技术栈及其应用场景",
        "响应式设计原理及实现方法",
        "CSS盒模型与布局技术",
        "JavaScript闭包及其应用",
        "事件冒泡与事件捕获机制"
      ],
      midlevel: [
        "React组件生命周期及其最佳实践",
        "虚拟DOM工作原理及性能优化",
        "前端状态管理解决方案比较",
        "跨域资源共享(CORS)问题解决方案",
        "前端性能优化策略与实践"
      ],
      senior: [
        "大型前端项目架构设计",
        "微前端架构的应用场景与实现",
        "高性能组件库设计原则",
        "前端工程化体系建设",
        "前端最佳实践推广与团队技术提升"
      ]
    },
    backend: {
      junior: [
        "后端开发的基础技术栈及应用场景",
        "RESTful API设计原则与实践",
        "数据库事务ACID属性与应用",
        "常见安全问题及防护策略",
        "MVC架构模式及其变种"
      ],
      midlevel: [
        "分布式系统CAP理论及应用",
        "关系型数据库与NoSQL选型策略",
        "高并发系统设计原则",
        "微服务架构的优势与挑战",
        "缓存策略及失效处理方案"
      ],
      senior: [
        "大型后端系统架构设计",
        "系统扩展性策略与实践",
        "高可用容错系统设计",
        "DevOps实践与推广",
        "团队技术栈演进与管理"
      ]
    }
  };

  // 认证和证书信息
  const certifications = {
    frontend: {
      junior: {
        name: "HCIA-前端开发工程师",
        organization: "华为技术认证",
        validPeriod: "2年"
      },
      midlevel: {
        name: "HCIP-前端架构师",
        organization: "华为技术认证",
        validPeriod: "3年"
      },
      senior: {
        name: "HCIE-前端高级架构师",
        organization: "华为技术认证",
        validPeriod: "3年"
      }
    },
    backend: {
      junior: {
        name: "HCIA-后端开发工程师",
        organization: "华为技术认证",
        validPeriod: "2年"
      },
      midlevel: {
        name: "HCIP-后端架构师",
        organization: "华为技术认证",
        validPeriod: "3年"
      },
      senior: {
        name: "HCIE-后端高级架构师",
        organization: "华为技术认证",
        validPeriod: "3年"
      }
    }
  };

  useEffect(() => {
    // 清理定时器
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 模拟视频效果
  useEffect(() => {
    if (sessionStage === 'ongoing' && videoRef.current && isVideoEnabled) {
      // 这里实际项目中会调用真实的视频API
      // 这里仅做模拟展示
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // 绘制纯色背景
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制用户占位图
        ctx.fillStyle = '#d0d0d0';
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2 - 50, 80, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制身体轮廓
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - 60, canvas.height/2 + 30);
        ctx.quadraticCurveTo(canvas.width/2, canvas.height/2 + 180, canvas.width/2 + 60, canvas.height/2 + 30);
        ctx.fill();
        
        const stream = canvas.captureStream();
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    }
  }, [sessionStage, isVideoEnabled]);

  const startSession = () => {
    setSessionStage('ongoing');
    setCurrentTopic(0);
    setResponses([]);
    setTimeLeft(300); // 每个主题5分钟
    
    // 启动计时器
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextTopic();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const handleNextTopic = () => {
    // 模拟保存回答
    setResponses(prev => [...prev, "此处将显示您对该主题的讨论内容。在实际实现中，这将是AI对您的语音内容进行处理后的文本记录。"]);
    
    // 如果是最后一个主题，结束会话
    if (currentTopic === topics[selectedTrack as keyof typeof topics][selectedLevel as keyof typeof topics['frontend']].length - 1) {
      setIsProcessing(true);
      
      // 清除计时器
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // 模拟处理评测结果
      setTimeout(() => {
        setFeedback({
          overallScore: 85,
          strengths: [
            "技术理解深入，概念清晰准确",
            "逻辑思维严谨，表达流畅有条理",
            "擅长结合具体案例解释抽象概念",
            "能够从多角度分析技术问题"
          ],
          improvements: [
            "可以进一步拓展前沿技术知识",
            "在架构设计讨论中可强化可扩展性视角",
            "建议增强性能优化相关经验",
            "部分技术方案可提供更多实践验证数据"
          ],
          topicFeedback: [
            { topicIndex: 0, score: 90, comment: "概念清晰，技术点覆盖全面，举例恰当。" },
            { topicIndex: 1, score: 82, comment: "原理理解准确，但实现方法可以更加多样化。" },
            { topicIndex: 2, score: 88, comment: "技术掌握扎实，分析深入，实例讲解生动。" },
            { topicIndex: 3, score: 85, comment: "核心概念把握准确，应用场景描述恰当。" },
            { topicIndex: 4, score: 80, comment: "基本原理清晰，但高级应用场景可以补充。" }
          ]
        });
        setIsProcessing(false);
        setSessionStage('feedback');
      }, 3000);
    } else {
      // 进入下一个主题
      setCurrentTopic(prev => prev + 1);
      setTimeLeft(300); // 重置计时器
    }
  };

  const restartSession = () => {
    setSessionStage('prep');
    setFeedback(null);
  };

  const simulateSession = () => {
    setIsSimulating(true);
    
    // 模拟视频通话3秒后进入评测环节
    setTimeout(() => {
      setIsSimulating(false);
      startSession();
    }, 3000);
  };

  const getCurrentCertification = () => {
    return certifications[selectedTrack as keyof typeof certifications][selectedLevel as keyof typeof certifications['frontend']];
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

        <h1 className="text-2xl font-bold mb-2">实时在线评测</h1>
        <p className="text-gray-600 mb-6">通过实时视频沟通方式，与AI专家进行技术交流，获取即时反馈和指导</p>

        {sessionStage === 'prep' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">准备技术评测</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择技术方向
                </label>
                <select 
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="frontend">前端开发</option>
                  <option value="backend">后端开发</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择能力级别
                </label>
                <select 
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="junior">初级 (0-2年经验)</option>
                  <option value="midlevel">中级 (2-5年经验)</option>
                  <option value="senior">高级 (5年以上经验)</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faCertificate} className="text-yellow-600 mr-2" />
                <h3 className="font-medium text-yellow-800">评测通过可获得认证</h3>
              </div>
              <div className="bg-white p-3 rounded border border-yellow-100">
                <p className="text-sm">
                  <span className="font-medium">{getCurrentCertification().name}</span> · 
                  <span className="text-gray-600 ml-1">{getCurrentCertification().organization}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">有效期: {getCurrentCertification().validPeriod}</p>
              </div>
            </div>
            
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex">
                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">评测说明</h3>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>评测将通过实时视频方式与AI专家进行技术交流</li>
                    <li>将讨论5个核心技术主题，每个主题约5分钟</li>
                    <li>请确保您的摄像头和麦克风正常工作</li>
                    <li>评测过程中可以分享屏幕展示代码或项目</li>
                    <li>评测结束后，AI系统将提供详细的技能评估报告</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={simulateSession}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center"
              >
                <FontAwesomeIcon icon={faVideo} className="mr-2" />
                开始视频评测
              </button>
            </div>
          </div>
        )}

        {isSimulating && (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <FontAwesomeIcon icon={faSpinner} className="text-blue-600 text-4xl animate-spin mb-6" />
            <h2 className="text-xl font-medium mb-4">正在连接视频...</h2>
            <p className="text-gray-600">
              正在与AI技术专家建立连接，请稍候...
            </p>
          </div>
        )}

        {sessionStage === 'ongoing' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 视频通话区域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100">
              <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                {isVideoEnabled ? (
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <FontAwesomeIcon icon={faUserCircle} className="text-gray-600 text-6xl" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex space-x-2">
                  <button 
                    onClick={toggleVideo}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isVideoEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    <FontAwesomeIcon icon={isVideoEnabled ? faVideo : faVideoSlash} size="sm" />
                  </button>
                  <button 
                    onClick={toggleAudio}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isAudioEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    <FontAwesomeIcon icon={isAudioEnabled ? faMicrophone : faMicrophoneSlash} size="sm" />
                  </button>
                </div>
              </div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faLaptopCode} className="text-white text-3xl" />
                  </div>
                  <p className="font-medium text-xl mb-1">AI技术专家</p>
                  <p className="text-sm text-white/70">已连接</p>
                </div>
              </div>
            </div>
            
            {/* 控制和信息区域 */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">主题 {currentTopic + 1}/5</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {selectedTrack === 'frontend' ? '前端开发' : '后端开发'} - 
                    {selectedLevel === 'junior' ? '初级' : 
                     selectedLevel === 'midlevel' ? '中级' : '高级'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-mono ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-xs text-gray-500">剩余时间</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-3">当前讨论主题：</h3>
                <p className="text-gray-800 text-lg">
                  {topics[selectedTrack as keyof typeof topics][selectedLevel as keyof typeof topics['frontend']][currentTopic]}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center">
                  <FontAwesomeIcon icon={faDesktop} className="mr-2" />
                  分享屏幕
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center">
                  <FontAwesomeIcon icon={faCodeBranch} className="mr-2" />
                  代码演示
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                  性能分析
                </button>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={handleNextTopic}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  {currentTopic === topics[selectedTrack as keyof typeof topics][selectedLevel as keyof typeof topics['frontend']].length - 1 
                    ? '完成评测' 
                    : '下一个主题'}
                </button>
              </div>
            </div>
          </div>
        )}

        {sessionStage === 'feedback' && (
          <div className="bg-white rounded-lg shadow-md">
            {isProcessing ? (
              <div className="p-12 text-center">
                <FontAwesomeIcon icon={faSpinner} className="text-blue-600 text-4xl animate-spin mb-4" />
                <h2 className="text-xl font-medium mb-2">正在分析您的技术表现...</h2>
                <p className="text-gray-600">
                  我们的AI系统正在对您的技术能力进行全面评估，请稍候...
                </p>
              </div>
            ) : (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">技术能力评估报告</h2>
                
                <div className="bg-blue-50 p-5 rounded-lg mb-8">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-blue-600 mb-2">{feedback.overallScore}</div>
                    <p className="text-gray-600">总体评分</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-green-700 mb-2 flex items-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        技术优势
                      </h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {feedback.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-gray-700">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-700 mb-2">提升建议</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {feedback.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="text-gray-700">{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg mb-8 flex items-center">
                  <FontAwesomeIcon icon={faCertificate} className="text-yellow-600 text-2xl mr-4" />
                  <div>
                    <h3 className="font-medium">恭喜！您已获得：</h3>
                    <p className="font-bold text-xl text-blue-800">{getCurrentCertification().name}</p>
                    <p className="text-sm text-gray-600">
                      {getCurrentCertification().organization} · 有效期: {getCurrentCertification().validPeriod}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-blue-600 cursor-pointer hover:underline">点击查看电子证书</span> · 
                      <span className="text-blue-600 cursor-pointer hover:underline ml-2">下载PDF版本</span>
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4">详细能力评估</h3>
                
                {feedback.topicFeedback.map((tFeedback: any, index: number) => (
                  <div key={index} className="mb-6 border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">主题 {index + 1}:</h4>
                        <p className="text-gray-700">
                          {topics[selectedTrack as keyof typeof topics][selectedLevel as keyof typeof topics['frontend']][tFeedback.topicIndex]}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          tFeedback.score >= 80 ? 'bg-green-100 text-green-800' :
                          tFeedback.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tFeedback.score}分
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">您的讨论要点:</p>
                    <p className="bg-gray-50 p-3 rounded text-gray-700 mb-3 text-sm">
                      {responses[index]}
                    </p>
                    <p className="text-blue-700 text-sm">
                      <span className="font-medium">AI评估: </span>
                      {tFeedback.comment}
                    </p>
                  </div>
                ))}
                
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={restartSession}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-4"
                  >
                    <FontAwesomeIcon icon={faRedo} className="mr-2" />
                    重新开始评测
                  </button>
                  <Link 
                    to="/ai-assessment" 
                    className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    返回评测中心
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* 权威认证说明 */}
        {sessionStage === 'prep' && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <FontAwesomeIcon icon={faCertificate} className="text-yellow-500 mr-2" />
              权威认证体系
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-700">华为认证</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>HCIA - 华为认证助理工程师</li>
                  <li>HCIP - 华为认证高级工程师</li>
                  <li>HCIE - 华为认证专家级工程师</li>
                  <li>全球技术认可度高</li>
                </ul>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-700">工信部认证</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>软件设计师</li>
                  <li>系统架构设计师</li>
                  <li>系统规划与管理师</li>
                  <li>国家权威认可资质</li>
                </ul>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-700">认证优势</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>行业通用技能证明</li>
                  <li>就业加分项</li>
                  <li>薪资谈判筹码</li>
                  <li>职业发展路径规划</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewAssessment; 