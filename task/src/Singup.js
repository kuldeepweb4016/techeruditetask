import { useState } from 'react';
import { useContext } from 'react'
import { loginContext }from './datashareContext'
import { Link, useNavigate }from 'react-router-dom'
function Reg() {
    const[mail,setMail] =useState('')
    const[firstname,setFirstname] =useState('')
    const[lastname,setLastname] =useState('')
    const[email,setEmail] =useState('')
    const[password,setPassword] =useState('')
    const[message,setMessage] =useState('')
    const{setCustomerlocalstorage,setCustomerstatus}= useContext(loginContext)
    const navigat= useNavigate('')
   
    function handleform(e){
        e.preventDefault()
        const formData= {firstname,lastname,email,password}
        console.log(formData)
        fetch('/api/customer/singup',{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(formData)
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
          console.log(data.firstName)
          if(data.firstName){
              localStorage.setItem('username',data.firstName)
              setCustomerlocalstorage(localStorage.getItem('username'))

              localStorage.setItem('status',1)
              setCustomerstatus(localStorage.getItem('status'))


            setMessage(' User has been created')
            navigat('/home')
        }
        else{
            setMessage('Already Exist')
        }

          
       })

    }
    return ( 
        <>
        <div className='container mt-5' >
       <div className='row' >
       <div className='col-md-3'>    <Link  className="btn btn-primary px-5" to="/" >Home page</Link></div>
       
       <div className='col-md-6' >

             <main className="form-signin">
  <form method='post' className='mt-5' onSubmit={(e)=>{handleform(e)}} >
 
    <h1 className="h3 mb-3 fw-normal">Customer/Sign up</h1>
    <p className='text-center dark' >{message}</p>



    <div className="form-floating row">
      <div className='col-md-6 mb-3 ' >
      <input type="text" className="form-control" placeholder="First Name"
     value={firstname} onChange={(e)=>{setFirstname(e.target.value)}}
      />
      </div>
      <div className='col-md-6 mb-3' >
      <input type="text" className="form-control"  placeholder="Last Name"
      value={lastname} onChange={(e)=>{setLastname(e.target.value)}}
      />
      </div>
      <div className='col-md-6 mb-4' >
      <input type="email" className="form-control"  placeholder="name@example.com"
      value={email} onChange={(e)=>{setEmail(e.target.value)}}
      />
      </div>
      <div className='col-md-6 mb-4' >
      <input type="password" className="form-control"  placeholder="Password"
      value={password} onChange={(e)=>{setPassword(e.target.value)}}
      />
      </div>
    </div>
    <button type="submit" className="w-100 btn btn-primary" >Sign up</button>
  </form>
  <p> have an account? <Link to="/" > Sign in</Link></p>
</main>
</div>
<div className='col-md-3' ></div>
</div>
</div>
        </>
     );
}

export default Reg;
<>

</>