'use client'

import { useState } from 'react'
import { supabaseForClientComponent } from '@/lib/supabase.client';
import { useRouter } from 'next/navigation';
import { User } from '@/types/types';

interface Props {
  userEmail: string
}

const AddBusinessForm = ({userEmail}:Props) => {
    const [title,setTitle] = useState('');
    const router = useRouter();

    const handleSubmit = async (e:any) => {
      e.preventDefault()
  
      const { data, error } = await supabaseForClientComponent
        .from('businesses')
        .insert({ title: title, user_email: userEmail })
  
        router.push('/businesses')
        router.refresh();
    }


  return (
    <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleSubmit}
        >
           <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            className="ring-1 ring-gray-500 rounded-md bg-gray-100 p-2 text-center text-2xl"
          />
        
            <div className="flex m-5 gap-5">
              <button className="bg-green-500 text-gray-100 p-1 rounded-md w-24">Add</button>
              <button className="bg-gray-500 text-gray-100 p-1 rounded-md w-24">Cancel</button>
            </div>
        </form>
  )
}

export default AddBusinessForm