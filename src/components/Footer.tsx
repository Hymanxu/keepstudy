import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faWeibo, faWeixin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-[1100px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">KeepStudy</h3>
            <p className="text-gray-300 mb-4">
              新一代AI辅助实践学习平台，让学习更高效、更有趣。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faWeibo} size="lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faWeixin} size="lg" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">平台</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                  课程广场
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-white transition-colors">
                  交流社区
                </Link>
              </li>
              <li>
                <Link to="/workspace" className="text-gray-300 hover:text-white transition-colors">
                  学习工作台
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">支持</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  文档中心
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  博客
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  教程
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  合作伙伴
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            {new Date().getFullYear()} KeepStudy. 保留所有权利。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
