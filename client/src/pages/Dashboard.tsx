import { useState } from "react"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import Posts from "@/components/Posts"

const Dashboard = () => {
  const [description, setDescription] = useState('');
  const { toast } = useToast();

    const config = {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    };

    const handleSubmit = async () => {
      try {
        const res = await axios.post('https://stuneckt-kunal-gargs-projects.vercel.app/api/posts/create', 
        { description }, config);
        console.log(res);
        toast({
          description: "Post createad Successfully!!",
        });
        // Optionally, you can reset the description state after successful submission
        setDescription('');
      } catch (error) {
        console.log(error);
      }
    }; 

  const handleChange = (e: any, setter: any) => {
    const value = e.target.value;
    setter(value);
  }

  return (
    <div className="bg-black h-screen">
      <div className="flex justify-between p-4">
        <div className='flex gap-4'>
          <div>
            <Link to={'/my-profile'}>
              <Button>My Profile</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <Dialog>
          <DialogTrigger asChild>
            <Button>Create Posts</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Posts</DialogTitle>
              <DialogDescription>
                Create a new post!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Post
                </Label>
                <Input id="name" placeholder="How's your day!" className="col-span-3" onChange={(e) => handleChange(e, setDescription)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator />
      
      <div>
        <div className="p-4">
          <h1 className="text-white text-5xl font-semibold">All Posts</h1>
        </div>
        <div className='flex justify-center'>
          <Posts />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Dashboard