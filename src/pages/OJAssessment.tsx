import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faCode, faPaperPlane, faSpinner, faClock, 
  faCheckCircle, faListOl, faTrophy, faFileCode
} from '@fortawesome/free-solid-svg-icons';

const OJAssessment: React.FC = () => {
  const [code, setCode] = useState<string>('// 在这里编写您的代码');
  const [language, setLanguage] = useState<string>('javascript');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<string>("02:45:00"); // 马拉松式考试总时间
  const [remainingProblems, setRemainingProblems] = useState<number>(8); // 剩余未解决问题数量

  // 编程题目数据
  const problems = [
    {
      id: 1,
      title: '两数之和',
      difficulty: '简单',
      category: '数组',
      description: '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: '因为 nums[0] + nums[1] == 9 ，返回 [0, 1]'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: '因为 nums[1] + nums[2] == 6 ，返回 [1, 2]'
        }
      ],
      constraints: [
        '2 <= nums.length <= 104',
        '-109 <= nums[i] <= 109',
        '-109 <= target <= 109',
        '只会存在一个有效答案'
      ]
    },
    {
      id: 2,
      title: '有效的括号',
      difficulty: '中等',
      category: '栈',
      description: '给定一个只包括 \'(\', \')\', \'{\', \'}\', \'[\', \']\' 的字符串 s ，判断字符串是否有效。有效字符串需满足：左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。每个右括号都有一个对应的左括号。',
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: ''
        },
        {
          input: 's = "()[]{}"',
          output: 'true',
          explanation: ''
        },
        {
          input: 's = "(]"',
          output: 'false',
          explanation: ''
        }
      ],
      constraints: [
        '1 <= s.length <= 104',
        's 仅由括号 \'(\', \')\', \'{\', \'}\', \'[\', \']\' 组成'
      ]
    }
  ];

  const currentProblem = problems[currentProblemIndex];

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // 模拟API提交评测
    setTimeout(() => {
      setResult({
        status: 'Success',
        runtime: '56 ms',
        memory: '42.3 MB',
        passedTestCases: 5,
        totalTestCases: 5,
        feedback: '解决方案正确且高效。使用了哈希表存储已遍历的值，时间复杂度为O(n)'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleNextProblem = () => {
    // 重置状态，前往下一题
    setResult(null);
    setCode('// 在这里编写您的代码');
    
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
    } else {
      // 模拟切换到新的问题集
      setCurrentProblemIndex(0);
    }
    
    // 模拟剩余问题数量减少
    if (remainingProblems > 0) {
      setRemainingProblems(prev => prev - 1);
    }
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

        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">基础编程马拉松评测</h1>
            <p className="text-gray-600">通过AI智能评测系统，参与马拉松式编程考试，测试您的编程能力和算法思维</p>
          </div>
          
          <div className="mt-4 md:mt-0 bg-white p-3 rounded-lg shadow-sm flex items-center space-x-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="text-blue-600 mr-2" />
              <div>
                <div className="text-sm text-gray-500">剩余时间</div>
                <div className="font-mono font-medium">{totalTime}</div>
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faListOl} className="text-purple-600 mr-2" />
              <div>
                <div className="text-sm text-gray-500">剩余题目</div>
                <div className="font-medium">{remainingProblems}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 竞赛进度条 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">马拉松进度</h3>
            <span className="text-sm text-gray-500">已完成: 2/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 问题描述 */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="inline-block px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs mr-2">
                  问题 {currentProblem.id}/10
                </span>
                <h2 className="text-xl font-bold inline-block">{currentProblem.title}</h2>
              </div>
              <div className="flex items-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">
                  {currentProblem.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  currentProblem.difficulty === '简单' ? 'bg-green-100 text-green-800' :
                  currentProblem.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentProblem.difficulty}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">问题描述</h3>
              <p className="text-gray-700">{currentProblem.description}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">示例</h3>
              {currentProblem.examples.map((example, index) => (
                <div key={index} className="mb-3 p-3 bg-gray-50 rounded-md">
                  <div className="mb-1"><strong>输入：</strong>{example.input}</div>
                  <div className="mb-1"><strong>输出：</strong>{example.output}</div>
                  {example.explanation && <div><strong>解释：</strong>{example.explanation}</div>}
                </div>
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">约束</h3>
              <ul className="list-disc list-inside text-gray-700">
                {currentProblem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 代码编辑器 */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faFileCode} className="text-gray-500 mr-2" />
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md text-white flex items-center ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      提交解答
                    </>
                  )}
                </button>
              </div>
              
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-800 text-white rounded-md focus:outline-none"
              />
            </div>
            
            {/* 结果显示 */}
            {result && (
              <div className="bg-white rounded-lg shadow-md p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">评测结果</h3>
                  <span className={`px-3 py-1 flex items-center rounded-full text-sm ${
                    result.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status === 'Success' ? (
                      <><FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> 通过</>
                    ) : (
                      <>未通过</>
                    )}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">运行时间</div>
                    <div className="font-medium">{result.runtime}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">内存消耗</div>
                    <div className="font-medium">{result.memory}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">测试用例</div>
                    <div className="font-medium">
                      {result.passedTestCases}/{result.totalTestCases} 通过
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">得分</div>
                    <div className="font-medium text-blue-600">
                      +10 分
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 text-blue-800 rounded-md mb-4">
                  <h4 className="font-medium mb-2">AI反馈</h4>
                  <p>{result.feedback}</p>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={handleNextProblem}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                    继续下一题
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 马拉松赛制说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-5">
          <h3 className="text-lg font-bold mb-3">马拉松赛制说明</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700">赛制规则</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>共10道算法编程题目</li>
                <li>总时长3小时</li>
                <li>难度递增</li>
                <li>可以跳过难题</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700">评分标准</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>代码正确性 (60%)</li>
                <li>时间和空间复杂度 (20%)</li>
                <li>代码质量和风格 (10%)</li>
                <li>解题速度 (10%)</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700">技能认证</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>80分以上：高级算法工程师</li>
                <li>60-80分：中级算法工程师</li>
                <li>40-60分：初级算法工程师</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OJAssessment; 