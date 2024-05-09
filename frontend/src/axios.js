import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  function (config) {
    const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).user
    if (user && user?.token) {
      const accessToken = user?.token
      config.headers = { authorization: `Bearer ${accessToken}` }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/refresh`, null, {
          withCredentials: true,
        })
        const { token } = response.data.user
        const parsedData = JSON.parse(localStorage.getItem('persist:root'))
        const userData = JSON.parse(parsedData.user)
        userData.user.token = token
        parsedData.user = JSON.stringify(userData)
        localStorage.setItem('persist:root', JSON.stringify(parsedData))
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axios(originalRequest)
      } catch (error) {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/logout`, null, {
          withCredentials: true,
        })
      }
    }

    return Promise.reject(error)
  }
)

export default instance
