'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faRobot } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

const firstMessage: string = `Olá! 👋 Sou o assistente AI de Allan. 🤖  
&nbsp;  
Estou aqui para ajudá-lo a explorar as soluções avançadas de IA de Allan. Se você está interessado em **integração de IA**, _modelos de aprendizado de máquina_, ou **aplicações personalizadas de IA**, estou aqui para responder suas perguntas e fornecer as informações que você precisa!  
&nbsp;  
Sinta-se à vontade para me perguntar qualquer coisa ou entrar em contato diretamente:  
- 📧 Email: [allanlancioni@allanlancioni.com](mailto:allanlancioni@allanlancioni.com)  
- 📞 Telefone: \`(11) 93014-0991\`  
- 💼 LinkedIn: [Veja o perfil de Allan](https://linkedin.com/in/allan-lancioni)  
- 🐱 GitHub: [Siga Allan no GitHub](https://github.com/allan-lancioni)  
&nbsp;  
Se preferir, apenas digite sua pergunta abaixo e pressione o botão enviar! 🔽🔽🔽
` as any

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
    simulateIncomingMessage(firstMessage)
  }, [])

  const simulateIncomingMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length, text, sender: 'bot' },
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
  }, [messages, isTyping])

  const sendMessage = () => {
    if (input.trim() === '') return

    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length, text: input, sender: 'user' },
    ])
    setInput('')
    simulateIncomingMessage("I'm checking that information for you.")
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
            key={message.id}
            className={`message ${message.sender}-message ${message.sender === 'user' ? 'justify-end' : 'justify-start'} my-2 text-white flex`}
          >
            {message.sender === 'bot' && <RobotIcon />}
            <div
              className={`p-4 ${message.sender === 'user' && 'bg-gray-700 rounded-2xl'} text-sm md:text-base max-w-[70%] md:max-w-[40%]`}
            >
              {message.sender === 'bot' ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
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
