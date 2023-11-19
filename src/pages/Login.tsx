import { CircularProgress, Snackbar, TextField } from '@mui/material';
import { inputStyle } from '../styles/inputStyle';
import { loginApi } from '../apis/login';
import { redirect } from "react-router-dom";
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate  } from 'react-router-dom';
import login from "./login.module.css"

export const Login = () => {

  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<boolean>(false)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    onSubmit: async (values) => {
      try{
        setLoading(true)
        const user = await loginApi(values)
        localStorage.setItem( 'jwt_bride', user.token)
        navigate("/dashboard")
      }catch(e){
        setError(true)
      }finally{
        setLoading(false)
        setTimeout(()=> setError(false), 3000)
      }
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .email('El correo no tiene un formato válido')
        .required('Campo requerido'),
        password: Yup.string().required('Campo requerido'),
        
            
    })
});

  return (
    <div className={login.body}>
    
    <div className={login.background}>
         <div className={login.shape}></div>
         <div className={login.shape}></div>
     </div>

     { error ? <Snackbar
                  open={error}
                  autoHideDuration={3000}
                  message="Algo salió mal, Ups!!"
            /> :  null}

     <form className={login.form} onSubmit={formik.handleSubmit}>
         <h3 className={login.h3}>Login</h3>
 
         <label className={login.label}>Username</label>
         <TextField
                sx={inputStyle}
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
 
         <label className={login.label}>Password</label>
         <TextField
                sx={inputStyle}
                  id="password"
                  name="password"
                  label="contraseña"
                  type='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
         <button className={login.button} disabled={ loading } type="submit">{loading ? <CircularProgress size={20}/> :'Log In'}</button>
     </form>
 </div>
  )
}
