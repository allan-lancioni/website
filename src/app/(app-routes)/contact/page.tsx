'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faRobot } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'
import { firstMessage } from './firstMessage'
import { toast } from 'react-toastify'
import { title } from 'process'

interface Message {
  id: number
  content: string
  role: 'user' | 'assistant'
}

const RobotIcon: React.FC = () => {
  return (
    <div className="rounded-full w-12 h-12 mt-4 bg-gray-600 text-gray-300 flex items-center justify-center">
      <FontAwesomeIcon icon={faRobot} className="text-xl" />
    </div>
  )
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatDiv = React.createRef<HTMLDivElement>()

  useEffect(() => {
    // Initial bot message
    setBotMessage(firstMessage)
  }, [])

  const setBotMessage = (content: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { content, role: 'assistant', id: prevMessages.length},
      ])
      setIsTyping(false)
    }, 2000) // Simulates typing delay
  }

  useEffect(() => {
    if (chatDiv.current) {
      chatDiv.current.scroll({
        top: chatDiv.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping, chatDiv])

  const sendMessage = async () => {
    if (input.trim() === '') return

    if (input.length > 150) {
      toast('Too big! Please keep your message under 150 characters! 🚫😅💸', { type: 'error', icon: false })
      return
    }

    if (messages.length > 20) {
      toast('Too many messages! Please refresh the page to start a new conversation. 🚫😅💸', { type: 'error', icon: false })
      return
    }

    const userMessage: Message = { content: input, role: 'user', id: messages.length}
    const updatedMessages: Message[] = [...messages, userMessage]
    setMessages(updatedMessages)

    // Clear input after sending
    setInput('')

    // Send the message to the backend and wait for the response
    setIsTyping(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      const botMessage = await response.json() as Message
      setMessages([...updatedMessages, {...botMessage, id: updatedMessages.length}])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleMessageKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section className="bg-gray-800 rounded-lg shadow-lg p-2 h-[calc(100vh-6rem)] md:h-[calc(100vh-7rem)] relative">
      <div
        className="chat-container overflow-auto p-4 max-h-[calc(100%-90px)] md:max-h-[calc(100%-110px)] mini-scrollbar"
        ref={chatDiv}
      >
        {messages.map(message => (
          <div
            key={'message:' + message.id}
            className={`message ${message.role}-message ${message.role === 'user' ? 'justify-end' : 'justify-start'} my-2 text-white flex`}
          >
            {message.role === 'assistant' && <RobotIcon />}
            <div
              className={`p-4 ${message.role === 'user' && 'bg-gray-700 rounded-2xl'} text-sm md:text-base max-w-[70%] md:max-w-[40%]`}
            >
              {message.role === 'assistant' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex">
            <RobotIcon />
            <div className="typing-indicator">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <div className="input-container absolute bottom-0 left-4 right-4 flex items-center mb-4 md:m-8 max-w-[100%] rounded-3xl overflow-hidden text-white">
        <textarea
          value={input}
          rows={1}
          onChange={e => setInput(e.target.value)}
          className="flex-grow bg-gray-700 rounded-3xl resize-none p-4 pr-14"
          placeholder="Type your message here..."
          onKeyPress={e => handleMessageKeyPress(e)}
        ></textarea>
        <button
          onClick={sendMessage}
          className="bg-white hover:bg-gray-50 text-gray-900 font-bold p-2 rounded-full absolute h-8 w-8 right-4 md:right-6 flex items-center justify-center text-lg"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
        </button>
      </div>
    </section>
  )
}

export default ChatInterface
