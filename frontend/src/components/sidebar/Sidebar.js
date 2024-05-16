import { useState } from 'react'
import SidebarNav from './SidebarNav'
import Notifications from './Notification'
import Search from './Search'
import Conversations from '../conversation/Conversations'
import SearchResults from './SearchResults'

export default function Sidebar({ onlineUsers, typing }) {
  const [searchResults, setSearchResults] = useState([])
  return (
    <div className="flex w-[35%] h-full select-none">
      {/*Sidebar Header*/}
      <div className="w-[18%]">
        <SidebarNav />
      </div>
      <div>
        {/*Notifications */}
        <Notifications />
        {/*Search*/}
        <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />
        {searchResults.length > 0 ? (
          <>
            {/*Search results*/}
            <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} />
          </>
        ) : (
          <>
            {/*Conversations*/}
            <Conversations onlineUsers={onlineUsers} typing={typing} />
          </>
        )}
      </div>
    </div>
  )
}
