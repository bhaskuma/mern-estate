import  { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/UserSlice'
import OAuth from '../Component/OAuth'
const Signin = () => {
  const[formData,setFormData]=useState({});
  const {loading,error}=useSelector((state)=>state.user)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
            dispatch(signInStart())
            const res=await fetch('/api/auth/signin',{
              method:'POST',
              headers: {'Content-Type': 'application/json',},
              body: JSON.stringify(formData)
            })
           const data= await res.json();
           if(data.success===false)
           {
            dispatch(signInFailure(data.message))
            return;
           }
          dispatch(signInSuccess(data))
          navigate('/') 
      
    } 
    catch (error) {
      dispatch(signInFailure(error.message))

    }
   
   
  }
  return (
    <div className='p-3 mx-w-lg mx-auto'>
      <h1 className='text-center text-3xl my-9 font-bold'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col  gap-4'>
        <input type='text' placeholder='email' className='border rounded-lg p-3' id='email'onChange={handleChange}/>
        <input type='text' placeholder='password' className='border rounded-lg p-3' id='password'onChange={handleChange}/>
        <button disabled={loading} className='uppercase bg-slate-500 text-white rounded-lg p-3 hover:opacity-70'>{loading? 'Loading...' : 'signup'}</button>

      <OAuth/>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Dont have an account? </p>
       <Link to={"/sign-up"}  >
        <span className='text-blue-700'>Sign up</span>
       </Link>
      </div>
    </div>
  )
}

export default Signin