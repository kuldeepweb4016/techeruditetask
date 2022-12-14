import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext }from './datashareContext';
function Login() {
  const[mail,setMail]= useState('')
  const[password,setPassword]= useState('')
  const[message,setMessage] = useState('')
  const{setCustomerlocalstorage,setCustomerstatus}= useContext(loginContext)
  const navigat= useNavigate()
  function hadlefrom(e){
    e.preventDefault()
    console.log(mail,password)
    const formData= {mail,password}

    fetch('/api/customer/singin',{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(formData)
  })
  .then((res)=>{return res.json()})
  .then((data)=>{
    console.log(data.email)
    console.log(data.message)
    if(data.message=='login with another page!'){
      setMessage("You are not allowed to login from here!")
    }
   else if(data.email){
        localStorage.setItem('username',data.email)
        setCustomerlocalstorage(localStorage.getItem('username'))
      
        localStorage.setItem('status',2)
        setCustomerstatus(localStorage.getItem('status'))

      setMessage(' User has been created')
      navigat('/home')
  }
  else{
      setMessage(`Wrong credentials` )
  }
 })



  }
    return ( 
        <>
       <div className='container mt-5' >
       <div className='row' >
       <div className='col-md-3' >    <Link  className="btn btn-primary px-5" to="/" >Home page</Link></div>
       <div className='col-md-6' >

       <main className="form-signin">
  <form method='post' className='mt-5' onSubmit={(e)=>{hadlefrom(e)}} >
    <h1 className="h3 mb-3 fw-normal">Customer/Sign in</h1>
    <p className='text-center dark' >{message}</p>
    

    <div className="form-floating row">   
      <div className='col-md-12 mb-3' >
      <input type="email" className="form-control"  placeholder="name@example.com"
       value={mail} onChange={(e)=>{setMail(e.target.value)}}
      />
      </div>
      <div className='col-md-12 mb-4' >
      <input type="password" className="form-control"  placeholder="Password"
       value={password} onChange={(e)=>{setPassword(e.target.value)}}
      />
      </div>
    </div>
    <button  type="submit" className="w-100 btn btn-primary">Sign in</button>
  </form>
  <p>Don't have an account? <Link to="/customer/singup"> Sign up</Link></p>
</main>


       </div>
       <div className='col-md-3' ></div>
       </div>
       </div>


        </>
     );
}

export default Login;