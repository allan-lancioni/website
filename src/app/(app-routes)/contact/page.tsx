'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'
import { firstMessage } from './firstMessage'
import { toast } from 'react-toastify'
import TextAreaMessage from '@/components/TextAreaMessage'

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
  const [isTyping, setIsTyping] = useState(false)
  const textAreaRef = useRef(null)
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
        { content, role: 'assistant', id: prevMessages.length },
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

  const sendMessage = async value => {
    if (messages.length > 20) {
      toast(
        'Too many messages! Please refresh the page to start a new conversation. 🚫😅💸',
        { type: 'error', icon: false }
      )
      return
    }

    const userMessage: Message = {
      content: value,
      role: 'user',
      id: messages.length,
    }
    const updatedMessages: Message[] = [...messages, userMessage]
    setMessages(updatedMessages)

    // Clear input after sending
    textAreaRef.current.clear()

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
      const botMessage = (await response.json()) as Message
      setMessages([
        ...updatedMessages,
        { ...botMessage, id: updatedMessages.length },
      ])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsTyping(false)
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
      <div className="absolute bottom-0 left-4 right-4 mb-4 md:m-8">
        <TextAreaMessage onSearch={sendMessage} limit={150} ref={textAreaRef} />
      </div>
    </section>
  )
}

export default ChatInterface
