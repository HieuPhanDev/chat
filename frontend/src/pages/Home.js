import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { getConversations } from '../features/chatSlice'
import ChatHome from '../components/chat/ChatHome'
import ChatContainer from '../components/chat/ChatContainer'

export default function Home() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token))
    }
  }, [user])
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="container h-screen flex ">
        {/*Sidebar*/}
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <ChatHome />}
      </div>
    </div>
  )
}
