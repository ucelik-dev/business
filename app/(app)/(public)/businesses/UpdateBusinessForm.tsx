'use client'

import { useState } from 'react'
import { supabaseForClientComponent } from '@/lib/supabase.client';
import { useRouter } from 'next/navigation';
import { Business, User } from '@/types/types';



const UpdateBusinessForm = ({business, email}:{business: Business, email: String}) => {
    const [title,setTitle] = useState<string>(business.title!);
    const router = useRouter();

    const handleSubmit = async (e:any) => {
      e.preventDefault()
  
      const { data, error } = await supabaseForClientComponent
        .from('businesses')
        .update({ title })
        .eq('id', business.id)
  
        router.push('/businesses')
        router.refresh();
    }

    async function deleteBusiness() {
      const { error } = await supabaseForClientComponent
      .from('businesses')
      .delete()
      .eq('id', business.id)
      router.push('/businesses')
  }




  return (
    <form
          className="flex flex-col items-center justify-center gap-5"
          key={business.id}
          onSubmit={handleSubmit}
        >
          {business.user_email === email ? (
            <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            defaultValue={title}
            className="ring-1 ring-gray-500 rounded-md bg-gray-100 p-2 text-center text-2xl"
          />
          ):(
            <div className="text-2xl font-bold">{business.title}</div>
          )}
          
          <div className="text-xl">{business.created_at?.slice(0, 10)}</div>
          <div className="text-xl">{business.user_email}</div>
          {business.user_email === email ? (
            <div className="flex m-5 gap-5">
              <button className="bg-green-500 text-gray-100 p-1 rounded-md w-24">Update</button>
              <button 
                onClick={() => deleteBusiness() }
                className="bg-rose-500 text-gray-100 p-1 rounded-md w-24">
                Delete
              </button>
              <button className="bg-gray-500 text-gray-100 p-1 rounded-md w-24">Cancel</button>
            </div>
          ):(
            <div className="flex m-5 gap-5">
              <button className="bg-gray-500 text-gray-100 p-1 rounded-md w-24">Close</button>
            </div>
          )}
        </form>
  )
}

export default UpdateBusinessForm