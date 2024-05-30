import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

interface TextAreaMessageProps {
  limit?: number
  onSearch: (query: string) => void
}

interface TextAreaMessageRef {
  clear: () => void
}

const TextAreaMessage = forwardRef<TextAreaMessageRef, TextAreaMessageProps>(
  function TextAreaMessage({ onSearch, limit = 150 }, ref) {
    const [input, setInput] = useState('')

    useImperativeHandle(ref, () => ({
      clear: () => setInput(''), // Expose the clear method
    }))

    const handleMessageKeyPress = (
      e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        const value = input.trim()
        if (value === '') return
        if (value.length > limit) {
          toast(
            `Too big! Please keep your message under ${limit} characters! 🚫😅💸`,
            { type: 'error', icon: false }
          )
          return
        }

        onSearch(value)
        setInput('') // Optionally clear the input after sending
      }
    }

    return (
      <div className="flex items-center max-w-[100%] rounded-3xl overflow-hidden text-white">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow bg-gray-700 rounded-3xl resize-none p-4 pr-14"
          placeholder="Type your message here..."
          onKeyPress={handleMessageKeyPress}
          rows={1}
        ></textarea>
        <button
          onClick={() => onSearch(input)} // Trigger search function when button is clicked.
          className="bg-white hover:bg-gray-50 text-gray-900 font-bold p-2 rounded-full absolute h-8 w-8 right-4 md:right-6 flex items-center justify-center text-lg"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
        </button>
      </div>
    )
  }
)

export default TextAreaMessage
