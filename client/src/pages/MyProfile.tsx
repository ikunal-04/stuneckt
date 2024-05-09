import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const MyProfile = () => {
  interface MyProfileProps {
    name: String;
    email: String;
    followers: [];
    following: [];
  }
  const [myProfile, setMyProfile] = useState<MyProfileProps>({name: '', email: '', followers: [], following: []});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const config = {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  };

  useEffect(() => {
    axios.get('https://stuneckt-kunal-gargs-projects.vercel.app/api/user/profile', config)
    .then((response: any) => {
      console.log(response.data.user);
      setMyProfile(response.data.user);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const handleChange = (e: any, setter: any) => {
    const value = e.target.value;
    setter(value);
  }

  async function handleUpdate(e: any) {
    e.preventDefault();
    // console.log("Form Values");
        await axios.put("https://stuneckt-kunal-gargs-projects.vercel.app/api/user/update", {
            name: name,
            email: email,
        },config).then(async (res) => {
        console.log(res.data.message);
        toast({
          description: res.data.message,
        });
    })
  }
  
  return (
    <div className='bg-black h-screen'>
      <div className='flex justify-between p-4'>
        <div>
          <h1 className='text-white text-2xl text-center'>My Profile</h1>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Update Profile</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" onChange={(e) => handleChange(e, setName)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" onChange={(e) => handleChange(e, setEmail)} />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleUpdate} type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />
      
      <div className='flex justify-center items-center h-max my-48'>
        <div className='flex flex-col gap-y-2 bg-white p-6 rounded-lg'>
          <div>
            <Label>Username</Label>
            <p>{myProfile.name}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p>{myProfile.email}</p>
          </div>
          <div>
            <Label>Followers</Label>
            <p>{myProfile.followers.length}</p>
          </div>
          <div>
            <Label>Following</Label>
            <p>{myProfile.following.length}</p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default MyProfile