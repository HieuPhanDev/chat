import * as Yup from 'yup'

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required('Tên không được để trống.')
    .matches(/^[a-zA-ZÀ-ỹ ]+$/g, 'Tên không hợp lệ.')
    .min(2, 'Tên phải từ 2 đến 16 ký tự.')
    .max(16, 'Tên phải từ 2 đến 16 ký tự.'),
  email: Yup.string().required('Email không được để trống').email('Email không hợp lệ.'),
  status: Yup.string().max(64, 'Status không được quá 64 ký tự.'),
  password: Yup.string()
    .required('Mật khẩu không được để trống.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
    ),
})
export const signInSchema = Yup.object({
  email: Yup.string().required('Email không được để trống').email('Email không hợp lệ.'),
  password: Yup.string().required('Mật khẩu không được để trống.'),
})
