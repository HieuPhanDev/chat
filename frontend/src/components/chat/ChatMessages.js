import { useSelector } from 'react-redux'
import Message from './Message'
import { useEffect, useRef } from 'react'
import Typing from './Typing'

export default function ChatMessages({ typing }) {
  const { messages, activeConversation } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)
  const divRef = useRef(null)
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })
  return (
    <div
      className="pb-[40px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat
    "
    >
      {/*Container*/}
      <div className="scrollbar overflow_scrollbar overflow-auto px-[5%]">
        {/*Messages*/}
        {messages &&
          messages.map((message) => (
            <Message message={message} key={message._id} me={user._id === message.sender._id} />
          ))}
        {typing === activeConversation._id ? <Typing /> : null}
        <div ref={divRef} />
      </div>
    </div>
  )
}
