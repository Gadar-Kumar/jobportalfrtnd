import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

// DUMMY USERS
const dummyConnections = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  lastMessage: `Last message from User ${i + 1}`,
  unread: Math.random() < 0.5,
}));

// INITIAL MESSAGES
const initialMessages = {};

for (let i = 1; i <= 15; i++) {
  initialMessages[i] = [
    {
      from: `User ${i}`,
      text: `Welcome to chat ${i}`,
      time: "10:00 AM",
    },
    {
      from: "You",
      text: `Hello User ${i}`,
      time: "10:02 AM",
    },
  ];
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const messagesEndRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, selectedChat]);

  // SEND MESSAGE
  const handleSend = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      from: "You",
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [
        ...(prev[selectedChat] || []),
        newMessage,
      ],
    }));

    setMessageInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* SIDEBAR */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
        {/* SEARCH */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none"
          />
        </div>

        {/* USERS */}
        <div className="flex-1 overflow-y-auto">
          {dummyConnections.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedChat(user.id)}
              className={`flex items-center justify-between px-4 py-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                selectedChat === user.id
                  ? "bg-gray-200 dark:bg-gray-700"
                  : ""
              }`}
            >
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {user.name}
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 truncate w-52">
                  {messages[user.id]?.[
                    messages[user.id].length - 1
                  ]?.text}
                </div>
              </div>

              {user.unread && (
                <div className="w-3 h-3 rounded-full bg-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {
              dummyConnections.find(
                (u) => u.id === selectedChat
              )?.name
            }
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100 dark:bg-gray-900">
          {messages[selectedChat]?.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.from === "You"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl break-words shadow-sm ${
                  msg.from === "You"
                    ? "bg-emerald-500 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
              >
                <div>{msg.text}</div>

                <div className="text-xs opacity-70 mt-2 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type message..."
              value={messageInput}
              onChange={(e) =>
                setMessageInput(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none"
            />

            <button
              onClick={handleSend}
              className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;