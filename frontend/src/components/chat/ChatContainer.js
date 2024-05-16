import ChatHeader from './ChatHeader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getConversationMessages } from '../../features/chatSlice'
import ChatActions from './ChatActions'
import ChatMessages from './ChatMessages'
import { checkOnlineStatus } from '../../utils/chat'

export default function ChatContainer({ onlineUsers, typing }) {
  const dispatch = useDispatch()
  const { activeConversation } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)
  const { token } = user
  const values = {
    token,
    convo_id: activeConversation?._id,
  }
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values))
    }
  }, [activeConversation])
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/*Container*/}
      <div>
        {/*Chat header*/}
        <ChatHeader online={checkOnlineStatus(onlineUsers, user, activeConversation.users)} />
        {/*Chat messages*/}
        <ChatMessages typing={typing} />
        {/* Chat Actions */}
        <ChatActions />
      </div>
    </div>
  )
}
