import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHashtag, faBell, faPlusCircle, faSearch, faStar, faUserCircle, 
  faVideo, faPhoneAlt, faEllipsisV, faPaperPlane, faMicrophone, 
  faSmile, faPaperclip, faUsers, faQuestionCircle, faCode, faRobot, faThumbtack,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Mock data for channels
const CHANNELS = [
  { id: 1, name: '公告', type: 'text', unread: false },
  { id: 2, name: '新手指南', type: 'text', unread: false },
  { id: 3, name: '学习交流', type: 'text', unread: true },
  { id: 4, name: '项目展示', type: 'text', unread: true },
  { id: 5, name: '资源分享', type: 'text', unread: false },
  { id: 6, name: '职业发展', type: 'text', unread: false },
  { id: 7, name: '语音聊天室', type: 'voice', unread: false },
];

// Mock data for messages in the current channel
const MESSAGES = [
  {
    id: 1,
    author: '张三',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    content: '大家好！我是新加入的学员，目前正在学习Python课程，很高兴认识大家。',
    timestamp: '今天 10:30',
    reactions: [
      { emoji: '👋', count: 5 },
      { emoji: '❤️', count: 3 }
    ]
  },
  {
    id: 2,
    author: '李四',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    content: '欢迎加入！我建议你可以看看平台上的Python实战项目，很有帮助。',
    timestamp: '今天 10:35',
    reactions: [
      { emoji: '👍', count: 4 }
    ]
  },
  {
    id: 3,
    author: 'KeepStudy助手',
    avatar: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    content: '欢迎新同学！我是KeepStudy的AI助手，有任何学习上的问题都可以随时向我提问。这里是一些对新手有帮助的学习资源：\n\n1. Python基础教程：[链接]\n2. 数据科学入门项目：[链接]\n3. 学习路径规划指南：[链接]',
    timestamp: '今天 10:38',
    reactions: [
      { emoji: '🤖', count: 2 },
      { emoji: '🙏', count: 7 }
    ],
    isBot: true
  },
  {
    id: 4,
    author: '王五',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    content: '我最近完成了一个机器学习项目，想找人一起讨论下模型优化的问题，有感兴趣的同学吗？',
    timestamp: '今天 11:15',
    reactions: [
      { emoji: '👀', count: 3 },
      { emoji: '🧠', count: 2 }
    ]
  },
  {
    id: 5,
    author: '赵六',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
    content: '我对这个很感兴趣！我也在做类似的项目，可以分享一下你的经验吗？',
    timestamp: '今天 11:20',
    reactions: []
  },
];

// Mock data for online members
const ONLINE_MEMBERS = [
  { id: 1, name: '张三', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80', status: 'online' },
  { id: 2, name: '李四', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80', status: 'online' },
  { id: 3, name: '王五', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80', status: 'idle' },
  { id: 4, name: '赵六', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80', status: 'online' },
  { id: 5, name: '孙七', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80', status: 'dnd' },
  { id: 6, name: '周八', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80', status: 'online' },
  { id: 7, name: 'KeepStudy助手', avatar: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80', status: 'bot' }
];

const CommunityPage: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState(3); // Default to "学习交流" channel
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(MESSAGES);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (messageInput.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      author: '我',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
      content: messageInput,
      timestamp: '刚刚',
      reactions: []
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="h-screen">
        <div className="h-full bg-gray-800 overflow-hidden">
          <div className="flex h-full">
            {/* Left Sidebar - Channels */}
            <div className="w-64 bg-gray-900 flex flex-col">
              <div className="p-4 border-b border-gray-700 flex items-center">
                <Link to="/" className="text-gray-400 hover:text-white mr-3">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <h2 className="font-bold text-xl text-white">KeepStudy社区</h2>
              </div>
              
              <div className="p-3">
                <div className="bg-gray-800 rounded-md p-1 flex items-center mb-4">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-2 mr-2" />
                  <input 
                    type="text" 
                    placeholder="搜索频道" 
                    className="bg-transparent text-sm text-gray-200 w-full focus:outline-none p-1" 
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto flex-grow">
                <div className="px-3 mb-2">
                  <div className="flex items-center justify-between text-gray-400 text-xs px-2 mb-1">
                    <span>文字频道</span>
                    <FontAwesomeIcon icon={faPlusCircle} className="cursor-pointer hover:text-gray-300" />
                  </div>
                  
                  {CHANNELS.filter(channel => channel.type === 'text').map(channel => (
                    <div 
                      key={channel.id}
                      className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                        selectedChannel === channel.id 
                          ? 'bg-gray-700 text-white' 
                          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                      }`}
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <FontAwesomeIcon icon={faHashtag} className="mr-2 text-xs" />
                      <span className="truncate">{channel.name}</span>
                      {channel.unread && <span className="w-2 h-2 ml-auto bg-white rounded-full"></span>}
                    </div>
                  ))}
                </div>
                
                <div className="px-3">
                  <div className="flex items-center justify-between text-gray-400 text-xs px-2 mb-1">
                    <span>语音频道</span>
                    <FontAwesomeIcon icon={faPlusCircle} className="cursor-pointer hover:text-gray-300" />
                  </div>
                  
                  {CHANNELS.filter(channel => channel.type === 'voice').map(channel => (
                    <div 
                      key={channel.id}
                      className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                        selectedChannel === channel.id 
                          ? 'bg-gray-700 text-white' 
                          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                      }`}
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <FontAwesomeIcon icon={faVideo} className="mr-2 text-xs" />
                      <span className="truncate">{channel.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-3 bg-gray-900 mt-auto border-t border-gray-800">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
                    <FontAwesomeIcon icon={faUserCircle} />
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium text-white">我的账号</div>
                    <div className="text-xs text-gray-400">在线</div>
                  </div>
                  <div className="flex space-x-2 text-gray-400">
                    <FontAwesomeIcon icon={faMicrophone} className="cursor-pointer hover:text-gray-300" />
                    <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer hover:text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col bg-gray-800">
              {/* Channel Header */}
              <div className="border-b border-gray-700 bg-gray-900 p-4 flex items-center justify-between text-white">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faHashtag} className="mr-2 text-gray-400" />
                  <h3 className="font-semibold">{CHANNELS.find(c => c.id === selectedChannel)?.name}</h3>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <FontAwesomeIcon icon={faBell} className="cursor-pointer hover:text-white" />
                  <FontAwesomeIcon icon={faThumbtack} className="cursor-pointer hover:text-white" />
                  <FontAwesomeIcon icon={faUsers} className="cursor-pointer hover:text-white" />
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="搜索聊天记录" 
                      className="bg-gray-800 text-sm rounded-md px-3 py-1 w-40 focus:outline-none focus:ring-1 focus:ring-gray-600" 
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 bg-gray-800 text-white">
                {messages.map(message => (
                  <div key={message.id} className="mb-4 group hover:bg-gray-750 rounded-lg p-2 transition-colors duration-150">
                    <div className="flex">
                      <img 
                        src={message.avatar} 
                        alt={message.author} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <span className={`font-medium mr-2 ${message.isBot ? 'text-green-400' : ''}`}>
                            {message.author}
                            {message.isBot && (
                              <span className="ml-2 text-xs bg-green-500 text-white px-1 py-0.5 rounded">BOT</span>
                            )}
                          </span>
                          <span className="text-xs text-gray-400">{message.timestamp}</span>
                        </div>
                        <div className="mt-1 text-gray-100 whitespace-pre-line">
                          {message.content}
                        </div>
                        {message.reactions.length > 0 && (
                          <div className="flex mt-2 space-x-2">
                            {message.reactions.map((reaction, index) => (
                              <span 
                                key={index} 
                                className="bg-gray-700 hover:bg-gray-600 rounded-full px-2 py-0.5 text-xs cursor-pointer transition-colors duration-150"
                              >
                                {reaction.emoji} {reaction.count}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 bg-gray-900">
                <form onSubmit={handleSendMessage} className="relative">
                  <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
                    <button type="button" className="text-gray-400 hover:text-gray-300 mr-3 transition-colors duration-150">
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                    <input 
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="发送消息到 #学习交流"
                      className="bg-transparent flex-grow text-white focus:outline-none"
                    />
                    <div className="flex items-center space-x-3 text-gray-400">
                      <FontAwesomeIcon icon={faSmile} className="cursor-pointer hover:text-gray-300 transition-colors duration-150" />
                      <FontAwesomeIcon icon={faPaperclip} className="cursor-pointer hover:text-gray-300 transition-colors duration-150" />
                      <button 
                        type="submit" 
                        className={`text-lg ${messageInput.trim() ? 'text-white' : 'text-gray-500'} transition-colors duration-150`}
                        disabled={!messageInput.trim()}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right Sidebar - Members */}
            <div className="w-60 bg-gray-800 text-white border-l border-gray-700">
              <div className="p-3 border-b border-gray-700">
                <div className="bg-gray-700 rounded-md p-1 flex items-center">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-2 mr-2" />
                  <input 
                    type="text" 
                    placeholder="搜索成员" 
                    className="bg-transparent text-sm text-gray-200 w-full focus:outline-none p-1" 
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-full p-3">
                <div className="mb-4">
                  <h4 className="text-xs text-gray-400 px-2 mb-1 uppercase font-semibold">在线成员 — {ONLINE_MEMBERS.length}</h4>
                  {ONLINE_MEMBERS.map(member => (
                    <div key={member.id} className="flex items-center px-2 py-1.5 rounded hover:bg-gray-700 cursor-pointer">
                      <div className="relative mr-2">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-8 h-8 rounded-full"
                        />
                        <span 
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-800 rounded-full ${
                            member.status === 'online' ? 'bg-green-500' : 
                            member.status === 'idle' ? 'bg-yellow-500' : 
                            member.status === 'dnd' ? 'bg-red-500' : 
                            member.status === 'bot' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}
                        ></span>
                      </div>
                      <span className={`text-sm ${member.status === 'bot' ? 'text-green-400' : 'text-gray-300'}`}>
                        {member.name}
                      </span>
                      {member.status === 'bot' && (
                        <span className="ml-2 text-xs bg-green-500 text-white px-1 py-0.5 rounded">BOT</span>
                      )}
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


export default CommunityPage;
