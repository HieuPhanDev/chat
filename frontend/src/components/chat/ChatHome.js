import { Logo } from '../../svg'

export default function WhatsappHome() {
  return (
    <div className="h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
      {/*Container*/}
      <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
        {/* <span>
          <Logo />
        </span> */}
        {/*Infos*/}
        <div className="mt-1 text-center space-y-[12px]">
          <div className="flex justify-center gap-2">
            <p className="text-[32px] dark:text-dark_text_4 font-extralight">Chào mừng đến với </p>
            <h1 className="text-[32px] dark:text-dark_text_4 font-semibold">Halo!</h1>
          </div>

          <p className="text-sm dark:text-dark_text_3 max-w-[415px]">
            Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá cho máy tính
            của bạn.
          </p>
        </div>
        <img
          src="https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png"
          alt=""
          className="max-w-[380px] max-h-[228px] object-cover"
        />
      </div>
    </div>
  )
}
