// Messages.jsx
import React, { useState } from 'react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [newMessage, setNewMessage] = useState('');

  // Messages data
  const conversations = [
    {
      id: 1,
      contactName: 'Sarah Chen',
      contactRole: 'Designer',
      contactAvatar: 'SC',
      project: 'Hilton Hotel Elevator Modernization',
      projectId: 'E-1042',
      lastMessage: 'The panel specifications look great. Can we schedule a review?',
      timestamp: '2026-07-15T14:30:00',
      unread: 2,
      status: 'online',
      messages: [
        {
          id: 1,
          sender: 'Sarah Chen',
          senderRole: 'Designer',
          message: 'Hi John, I reviewed the panel specifications for the Hilton project.',
          timestamp: '2026-07-15T14:25:00',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Sarah Chen',
          senderRole: 'Designer',
          message: 'The stainless steel finish looks perfect. Can we schedule a review meeting?',
          timestamp: '2026-07-15T14:27:00',
          isOwn: false
        },
        {
          id: 3,
          sender: 'You',
          senderRole: 'Fabricator',
          message: 'Sure, I\'m available tomorrow afternoon. What time works for you?',
          timestamp: '2026-07-15T14:32:00',
          isOwn: true
        },
        {
          id: 4,
          sender: 'Sarah Chen',
          senderRole: 'Designer',
          message: 'Great! How about 2 PM? I\'ll send you the meeting link.',
          timestamp: '2026-07-15T14:35:00',
          isOwn: false
        }
      ],
      projectDetails: '4 passenger elevators with custom interior finishes'
    },
    {
      id: 2,
      contactName: 'Michael Rodriguez',
      contactRole: 'Project Handler',
      contactAvatar: 'MR',
      project: 'City Tower Commercial Elevators',
      projectId: 'E-1045',
      lastMessage: 'We need to expedite the fabrication timeline.',
      timestamp: '2026-07-15T12:15:00',
      unread: 0,
      status: 'away',
      messages: [
        {
          id: 1,
          sender: 'Michael Rodriguez',
          senderRole: 'Project Handler',
          message: 'The client is asking for an updated timeline on the City Tower project.',
          timestamp: '2026-07-15T12:10:00',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Michael Rodriguez',
          senderRole: 'Project Handler',
          message: 'We need to expedite the fabrication timeline if possible.',
          timestamp: '2026-07-15T12:15:00',
          isOwn: false
        },
        {
          id: 3,
          sender: 'You',
          senderRole: 'Fabricator',
          message: 'Let me check with the production team. I\'ll get back to you within the hour.',
          timestamp: '2026-07-15T12:20:00',
          isOwn: true
        }
      ],
      projectDetails: '4 high-speed elevators for 35-story commercial building'
    },
    {
      id: 3,
      contactName: 'Emily Watson',
      contactRole: 'Designer',
      contactAvatar: 'EW',
      project: 'Green Valley Mall Escalators',
      projectId: 'E-1048',
      lastMessage: 'The escalator specs have been updated. Please review.',
      timestamp: '2026-07-15T10:45:00',
      unread: 3,
      status: 'online',
      messages: [
        {
          id: 1,
          sender: 'Emily Watson',
          senderRole: 'Designer',
          message: 'Hi, I\'ve updated the escalator specifications based on client feedback.',
          timestamp: '2026-07-15T10:40:00',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Emily Watson',
          senderRole: 'Designer',
          message: 'The step clearance has been adjusted to 2200mm.',
          timestamp: '2026-07-15T10:42:00',
          isOwn: false
        },
        {
          id: 3,
          sender: 'Emily Watson',
          senderRole: 'Designer',
          message: 'Please review the changes and let me know if you have any questions.',
          timestamp: '2026-07-15T10:45:00',
          isOwn: false
        }
      ],
      projectDetails: '2 custom escalators with glass balustrades'
    },
    {
      id: 4,
      contactName: 'David Kim',
      contactRole: 'Project Handler',
      contactAvatar: 'DK',
      project: 'Sunset Residence Elevators',
      projectId: 'E-1050',
      lastMessage: 'The client is very happy with the progress!',
      timestamp: '2026-07-14T16:20:00',
      unread: 0,
      status: 'offline',
      messages: [
        {
          id: 1,
          sender: 'David Kim',
          senderRole: 'Project Handler',
          message: 'Just wanted to let you know that the client visited the site today.',
          timestamp: '2026-07-14T16:15:00',
          isOwn: false
        },
        {
          id: 2,
          sender: 'David Kim',
          senderRole: 'Project Handler',
          message: 'They are very happy with the progress on the Sunset Residence project.',
          timestamp: '2026-07-14T16:18:00',
          isOwn: false
        },
        {
          id: 3,
          sender: 'You',
          senderRole: 'Fabricator',
          message: 'That\'s great to hear! We\'re on track for the July 20 completion.',
          timestamp: '2026-07-14T16:22:00',
          isOwn: true
        },
        {
          id: 4,
          sender: 'David Kim',
          senderRole: 'Project Handler',
          message: 'Excellent! Keep up the good work.',
          timestamp: '2026-07-14T16:25:00',
          isOwn: false
        }
      ],
      projectDetails: 'Luxury residential elevator with custom wood paneling'
    },
    {
      id: 5,
      contactName: 'Lisa Park',
      contactRole: 'Designer',
      contactAvatar: 'LP',
      project: 'Tech Hub Office Elevators',
      projectId: 'E-1053',
      lastMessage: 'The smart panel interface needs redesign. Can we discuss?',
      timestamp: '2026-07-14T11:30:00',
      unread: 1,
      status: 'online',
      messages: [
        {
          id: 1,
          sender: 'Lisa Park',
          senderRole: 'Designer',
          message: 'The client wants changes to the smart panel interface.',
          timestamp: '2026-07-14T11:25:00',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Lisa Park',
          senderRole: 'Designer',
          message: 'Can we discuss this on a call tomorrow?',
          timestamp: '2026-07-14T11:30:00',
          isOwn: false
        }
      ],
      projectDetails: '3 smart elevators with digital interfaces'
    }
  ];

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' && conv.unread > 0) ||
                         (filterType === 'designers' && conv.contactRole === 'Designer') ||
                         (filterType === 'handlers' && conv.contactRole === 'Project Handler');
    const matchesSearch = conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.projectId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get status color
  const statusColors = {
    'online': 'bg-emerald-500',
    'away': 'bg-amber-500',
    'offline': 'bg-slate-400'
  };

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 24) return date.toLocaleDateString();
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="h-full flex bg-slate-50">
      {/* Left Panel - Conversation List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold text-slate-900">Messages</h1>
            <button className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700">
              <i className="fas fa-pen"></i>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-1 mt-3">
            {['all', 'unread', 'designers', 'handlers'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  filterType === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter === 'all' ? 'All' : 
                 filter === 'unread' ? 'Unread' :
                 filter === 'designers' ? 'Designers' : 'Handlers'}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedChat(conv)}
              className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition ${
                selectedChat?.id === conv.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {conv.contactAvatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[conv.status]}`}></div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-sm text-slate-900">{conv.contactName}</span>
                      <span className="text-xs text-slate-400 ml-2">{conv.contactRole}</span>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{formatTime(conv.timestamp)}</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">{conv.project}</div>
                  <div className="text-sm text-slate-600 truncate mt-0.5">{conv.lastMessage}</div>
                </div>

                {/* Unread Badge */}
                {conv.unread > 0 && (
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {selectedChat.contactAvatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[selectedChat.status]}`}></div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{selectedChat.contactName}</div>
                  <div className="text-xs text-slate-500">
                    {selectedChat.contactRole} • {selectedChat.projectId}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center">
                  <i className="fas fa-phone"></i>
                </button>
                <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center">
                  <i className="fas fa-video"></i>
                </button>
                <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
              <div className="text-xs text-slate-500">
                <span className="font-medium">Project:</span> {selectedChat.project}
                <span className="mx-2">•</span>
                <span className="text-slate-400">{selectedChat.projectDetails}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.isOwn ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'} rounded-2xl px-4 py-2.5`}>
                    {!msg.isOwn && (
                      <div className="text-xs font-medium text-blue-600 mb-0.5">{msg.sender}</div>
                    )}
                    <div className="text-sm">{msg.message}</div>
                    <div className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-200' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center">
                  <i className="fas fa-paperclip"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      // Add message logic here
                      setNewMessage('');
                    }
                  }}
                />
                <button className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </>
        ) : (
          // No conversation selected
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-comments text-3xl text-slate-300"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No conversation selected</h3>
            <p className="text-sm">Choose a conversation from the list to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;