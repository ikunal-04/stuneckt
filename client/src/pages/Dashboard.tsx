import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

import Posts from "@/components/Posts"

const Dashboard = () => {
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
          <Link to={'/create-posts'}>
            <Button>Create Posts</Button>
          </Link>
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
    </div>
  )
}

export default Dashboard