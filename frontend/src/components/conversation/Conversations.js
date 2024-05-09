import { useSelector } from 'react-redux'
import Conversation from './Conversation'
import { checkOnlineStatus } from '../../utils/chat'

export default function Conversations({ onlineUsers, typing }) {
  const { conversations, activeConversation } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.user)

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo) => (
              <Conversation
                convo={convo}
                key={convo._id}
                online={checkOnlineStatus(onlineUsers, user, convo.users) ? true : false}
                typing={typing}
              />
            ))}
      </ul>
    </div>
  )
}
