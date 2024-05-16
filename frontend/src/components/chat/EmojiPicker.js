import EmojiPicker from 'emoji-picker-react'
import { CloseIcon, EmojiIcon } from '../../svg'

export default function EmojiPickerApp({ setMessage, showPicker, setShowPicker, setShowAttachments }) {
  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData
    setMessage((prev) => prev + emoji)
  }
  return (
    <li className="w-full">
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowAttachments(false)
          setShowPicker((prev) => !prev)
        }}
      >
        {showPicker ? <CloseIcon className="dark:fill-dark_svg_1" /> : <EmojiIcon className="dark:fill-dark_svg_1" />}
      </button>
      {/*Emoji picker*/}
      {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      ) : null}
    </li>
  )
}
