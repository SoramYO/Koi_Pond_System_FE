import React, { useEffect, useRef, useState } from 'react';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import parse from 'html-react-parser';
import { useLocation, useParams } from 'react-router-dom';
import { CalendarOutlined, ClockCircleOutlined, SendOutlined } from '@ant-design/icons';


const CustomerChatPanel = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [completionStatus, setCompletionStatus] = useState({
        staff: false,
        customer: false
    });

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const db = getDatabase();

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (id) {
            const messagesRef = ref(db, `messages/${id}`);
            const unsubscribe = onValue(messagesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const messagesArray = Object.entries(data)
                        .map(([key, value]) => ({
                            id: key,
                            ...value,
                        }))
                        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
                    setMessages(messagesArray);

                    // Mark staff messages as read
                    messagesArray.forEach(msg => {
                        if (msg.sender === 'Staff' && !msg.read) {
                            const messageRef = ref(db, `messages/${id}/${msg.id}`);
                            set(messageRef, { ...msg, read: true });
                        }
                    });
                }
            });

            const completionRef = ref(db, `completionStatus/${id}`);
            const completionUnsubscribe = onValue(completionRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setCompletionStatus(data);
                }
            });

            return () => {
                unsubscribe();
                completionUnsubscribe();
            };
        }
    }, [id, db]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString([], {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const renderSystemMessage = (message) => {
        try {
            if (message.includes('Cuộc tư vấn mới')) {
                const parsedMessage = parse(message);
                return (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-md mx-auto">
                        <div className="flex items-center gap-2 text-blue-600 font-medium mb-3">
                            <CalendarOutlined className="w-4 h-4" />
                            <span>Cuộc tư vấn mới đã được đặt lịch</span>
                        </div>
                        <div className="space-y-2 ml-6">
                            <div className="flex items-center gap-2 text-gray-600">
                                <ClockCircleOutlined className="w-4 h-4 text-blue-500" />
                                {parsedMessage}
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg">
                    {parse(message)}
                </div>
            );
        } catch (error) {
            console.error('Error parsing message:', error);
            return (
                <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg">
                    {message}
                </div>
            );
        }
    };

    const groupMessagesByDate = () => {
        const groups = [];
        let currentGroup = null;
        messages.forEach((message) => {
            const messageDate = new Date(message.timestamp).toDateString();
            if (!currentGroup || currentGroup.date !== messageDate) {
                currentGroup = {
                    date: messageDate,
                    timestamp: message.timestamp,
                    messages: [],
                };
                groups.push(currentGroup);
            }
            currentGroup.messages.push(message);
        });
        return groups;
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() && id) {
            try {
                const messagesRef = ref(db, `messages/${id}`);
                const newMessage = {
                    message: inputMessage.trim(),
                    sender: 'Customer',
                    timestamp: Date.now(),
                    read: false,
                };
                await push(messagesRef, newMessage);
                setInputMessage('');

                // If message is "hoàn thành", update completion status
                if (inputMessage.trim().toLowerCase() === 'hoàn thành') {
                    const completionRef = ref(db, `completionStatus/${id}`);
                    await set(completionRef, {
                        ...completionStatus,
                        customer: true
                    });
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-5rem)] bg-gray-50">
            <div className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
                <div>
                    <h3 className="font-medium text-gray-900">Chat with Feng Shui</h3>
                    <p className="text-sm text-gray-500">Order #{id}</p>
                </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
                {groupMessagesByDate().map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-4">
                        <div className="flex justify-center">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                                {formatDate(group.timestamp)}
                            </span>
                        </div>
                        {group.messages.map((msg, index) => {
                            const isCustomer = msg.sender === 'Customer';
                            const isSystem = msg.sender === 'System';
                            const showAvatar =
                                index === 0 || group.messages[index - 1]?.sender !== msg.sender;

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} ${isSystem ? 'justify-center' : ''
                                        }`}
                                >
                                    {isSystem ? (
                                        renderSystemMessage(msg.message)
                                    ) : (
                                        <div
                                            className={`flex ${isCustomer ? 'flex-row-reverse' : 'flex-row'
                                                } items-end max-w-[70%] gap-2`}
                                        >
                                            {showAvatar && !isCustomer && (
                                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white text-sm font-medium">
                                                        FS
                                                    </span>
                                                </div>
                                            )}
                                            <div
                                                className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'
                                                    }`}
                                            >
                                                {showAvatar && (
                                                    <span className="text-xs text-gray-500 mb-1">
                                                        {isCustomer ? 'You' : 'FS'}
                                                    </span>
                                                )}
                                                <div
                                                    className={`rounded-lg px-4 py-2 max-w-full break-words ${isCustomer
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white border border-gray-200 text-gray-900'
                                                        }`}
                                                >
                                                    {msg.message}
                                                </div>
                                                <span className="text-xs text-gray-400 mt-1">
                                                    {formatTimestamp(msg.timestamp)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-end gap-2">
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="w-full bg-transparent px-4 py-3 max-h-32 resize-none focus:outline-none"
                            rows={1}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <SendOutlined className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerChatPanel;