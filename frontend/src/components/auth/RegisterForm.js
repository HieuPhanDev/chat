import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from '../../utils/validation'
import AuthInput from './AuthInput'
import { useDispatch, useSelector } from 'react-redux'
import PulseLoader from 'react-spinners/PulseLoader'
import { Link, useNavigate } from 'react-router-dom'
import { changeStatus, registerUser } from '../../features/userSlice'
import { useState } from 'react'
import Picture from './Picture'
import axios from 'axios'
const cloud_name = process.env.REACT_APP_CLOUD_NAME
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET
export default function RegisterForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.user)
  const [picture, setPicture] = useState()
  const [readablePicture, setReadablePicture] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })
  const onSubmit = async (data) => {
    dispatch(changeStatus('loading'))
    if (picture) {
      //upload to cloudinary and then register user
      await uploadImage().then(async (response) => {
        let res = await dispatch(registerUser({ ...data, picture: response.secure_url }))
        if (res?.payload?.user) {
          navigate('/')
        }
      })
    } else {
      let res = await dispatch(registerUser({ ...data, picture: '' }))
      if (res?.payload?.user) {
        navigate('/')
      }
    }
  }
  const uploadImage = async () => {
    let formData = new FormData()
    formData.append('upload_preset', cloud_secret)
    formData.append('file', picture)
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    return data
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-2 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-2 text-3xl font-bold">Halo xin chào!</h2>
          <p className="mt-2 text-2xl">Đăng Kí</p>
        </div>
        {/*Form*/}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <AuthInput
            name="name"
            type="text"
            placeholder="Họ và tên"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput name="email" type="text" placeholder="Email " register={register} error={errors?.email?.message} />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Mật khẩu"
            register={register}
            error={errors?.password?.message}
          />
          {/* Picture */}
          <Picture readablePicture={readablePicture} setReadablePicture={setReadablePicture} setPicture={setPicture} />
          {/*if we have an error*/}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          {/*Submit button*/}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300
          "
            type="submit"
          >
            {status === 'loading' ? <PulseLoader color="#fff" size={16} /> : 'ĐĂNG KÍ'}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Đã có tài khoản ?</span>
            <Link to="/login" className=" hover:underline cursor-pointer transition ease-in duration-300">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
