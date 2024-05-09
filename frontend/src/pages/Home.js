import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/sidebar/Sidebar'
import { useEffect, useRef, useState } from 'react'
import { getConversations } from '../features/chatSlice'
import ChatHome from '../components/chat/ChatHome'
import ChatContainer from '../components/chat/ChatContainer'
import SocketContext from '../context/SocketContext'
import { updateMessagesAndConversations } from '../features/chatSlice'

function Home({ socket }) {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [typing, setTyping] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  //get Conversations
  useEffect(() => {
    socket.emit('join', user._id)
    //get online users
    socket.on('get-online-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])
  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token))
    }
  }, [user])
  const isMounted = useRef(true)
  useEffect(() => {
    //lsitening to receiving a message
    // socket.on('receive message', (message) => {
    //   dispatch(updateMessagesAndConversations(message))
    // })
    if (isMounted.current) {
      socket.on('receive message', (message) => {
        dispatch(updateMessagesAndConversations(message))
      })
      isMounted.current = false // Mark as unmounted after the first render
    }
    //listening when a user is typing
    socket.on('typing', (conversation) => setTyping(conversation))
    socket.on('stop typing', () => setTyping(false))
  }, [])
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="container h-screen flex ">
        {/*Sidebar*/}
        <Sidebar onlineUsers={onlineUsers} typing={typing} />
        {activeConversation._id ? <ChatContainer onlineUsers={onlineUsers} typing={typing} /> : <ChatHome />}
      </div>
    </div>
  )
}
const HomeWithSocket = (props) => (
  <SocketContext.Consumer>{(socket) => <Home {...props} socket={socket} />}</SocketContext.Consumer>
)
export default HomeWithSocket
