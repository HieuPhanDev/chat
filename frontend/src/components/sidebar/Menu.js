import { useDispatch } from 'react-redux'
import { logout } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Menu({ setShowCreateGroup }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <>
      <div className="absolute bottom-10 z-50 dark:bg-dark_bg_3 dark:text-dark_text_1 shadow-md w-52">
        <ul>
          {/* <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3" onClick={() => setShowCreateGroup(true)}>
            <span>New group</span>
          </li>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
            <span>New community</span>
          </li>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
            <span>Starred messaged</span>
          </li> */}
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
            <span>Cài đặt</span>
          </li>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3" onClick={() => handleLogout()}>
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </>
  )
}
