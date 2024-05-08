import { useState } from 'react'
import SidebarHeader from './SidebarHeader'
import Notifications from './Notification'
import Search from './Search'
import Conversations from '../conversation/Conversations'
import SearchResults from './SearchResults'

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([])
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/*Sidebar Header*/}
      <SidebarHeader />
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
          <Conversations />
        </>
      )}
    </div>
  )
}
