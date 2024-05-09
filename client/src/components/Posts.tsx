import { useState, useEffect } from "react"
import axios from "axios"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface Post {
  _id: string;
  description: string;
  userId: {
    _id: string;
    name?: string;
  };
}

const Posts = () => {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const [totalUserPage, setTotalUserPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [userloading, setUserloading] = useState(true);

    const config = {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    };
  
    useEffect(() => {
      axios.get(`https://stuneckt-kunal-gargs-projects.vercel.app/api/posts/allposts?page=${currentPage}&limit=10`, config)
      .then((response: any) => {
        // console.log(response.data.posts);
        setAllPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      })
    },[currentPage]);

    useEffect(() => {
      axios.get(`https://stuneckt-kunal-gargs-projects.vercel.app/api/posts/userposts?page=${currentPage}&limit=10`, config)
      .then((response: any) => {
        console.log(response.data);
        setUserPosts(response.data.post);
        setTotalUserPage(response.data.totalPages);
        setUserloading(false);
      }).catch((error) => {
        console.log(error);
        setUserloading(false);
      })
    },[currentUserPage]);

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextUserPage = () => {
      if (currentUserPage < totalUserPage) {
        setCurrentUserPage(currentUserPage + 1);
      }
    };
  
    const handlePrevUserPage = () => {
      if (currentUserPage > 1) {
        setCurrentUserPage(currentUserPage - 1);
      }
    };

  return (
    <div>
        <Tabs defaultValue="All posts" className="w-[400px]">
            <TabsList className='w-[400px]'>
              <TabsTrigger value="All posts" className='w-[400px]'>All posts</TabsTrigger>
              <TabsTrigger value="Your posts" className='w-[400px]'>Your posts</TabsTrigger>
            </TabsList>
            <TabsContent value="All posts">
              <ScrollArea className="h-[500px] rounded-md border p-4 text-white">
                <div>
                  {loading ? (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      {allPosts.map(post => (
                        <div key={post._id} className='grid mb-3'>
                          <div className="border rounded-lg px-2 grid gap-y-2 py-1">
                            <h3>Tweet: {post.description}</h3>
                            <p>User: {post.userId.name}</p>
                          </div>
                          
                        </div>
                      ))}
                      
                    </div>
                  )}
                </div>           
              </ScrollArea>
              <div className="flex justify-between">
                <button onClick={handlePrevUserPage} disabled={currentPage === 1} className='text-white'>Previous Page</button>
                <button onClick={handleNextUserPage} disabled={currentPage === totalPages} className='text-white'>Next Page</button>
              </div>
              
            </TabsContent>

            <TabsContent value="Your posts">
            <ScrollArea className="h-[500px] rounded-md border p-4 text-white">
                <div>
                  {userloading ? (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      {userPosts.map(post => (
                        <div key={post._id} className='grid mb-3'>
                          <div className="border rounded-lg px-2 grid gap-y-2 py-1">
                            <h3>Tweet: {post.description}</h3>
                            <p>User: {post.userId.name}</p>
                          </div>
                          
                        </div>
                      ))}
                      
                    </div>
                  )}
                </div>           
              </ScrollArea>
              <div className="flex justify-between">
                <button onClick={handlePrevPage} disabled={currentUserPage === 1} className='text-white'>Previous Page</button>
                <button onClick={handleNextPage} disabled={currentUserPage === totalPages} className='text-white'>Next Page</button>
              </div>
            </TabsContent>
        </Tabs>
    </div>
  )
};

export default Posts;