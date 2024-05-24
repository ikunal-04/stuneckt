import { useState } from 'react'
import { Heading } from '@/components/ui/Heading'
import { SubHeading } from '@/components/ui/SubHeading'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: any, setter: any) => {
    const value = e.target.value;
    // console.log(value);
    setter(value);
  }

  async function handleSignin(e: any) {
    e.preventDefault();
    // console.log("Form Values");
        await axios.post("https://stuneckt-kunal-gargs-projects.vercel.app/api/user/login", {
            name: name,
            email: email,
            password: password,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
        // console.log(res.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
    })
  }

  return (
    <div className='flex justify-center items-center bg-black h-screen'>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
            <div className=" rounded-3xl bg-white w-80 sm:w-96 text-center p-2 h-max sm:px-4">  
              <Heading title="Sign-in" />
              <SubHeading title="Welcome back!" />
              <form onSubmit={handleSignin}>
                <div className='grid gap-y-5 mt-6 mb-6'>
                <div className='flex flex-col items-start gap-3'>
                  <Label htmlFor="name">Your Name</Label>
                  <Input type="name" id="name" placeholder="Enter your Name" onChange={(e) => handleChange(e, setName)}/>
                </div>        
                
                <div className='flex flex-col items-start gap-3'>
                  <Label htmlFor="email">Your email address</Label>
                  <Input type="email" id="email" placeholder="Enter your Email" onChange={(e) => handleChange(e, setEmail)} />
                </div>
                
                
                <div className='flex flex-col items-start gap-3'>
                  <Label htmlFor="password">Your Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" onChange={(e) => handleChange(e, setPassword)}/>
                </div>
                </div>
                
                
                <div className="mt-4">
                      <Button type="submit">Sign In</Button>
                  </div>
              </form> 
              <div className='mt-4'>
              Demo Credentials- <br />
                <p>Name: test</p>
                <p>Email: test@gmail.com</p>
                <p>Password: test1234</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login