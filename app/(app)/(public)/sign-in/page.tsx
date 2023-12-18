"use client";

import { useState } from "react";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    if(!email || !password) {
      setError('Invalid credentials!');
      setEmail('');
      setPassword('');
    }

    const data = await supabaseForClientComponent.auth.signInWithPassword({
        email,
        password
    });

    if(!data.error){
      router.push('/businesses');
      router.refresh();
    } else {
      setError('Invalid credentials!');
      setEmail('');
      setPassword('');
    }

}

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-10 sm:mt-20">
      <div className="w-full bg-white dark:bg-gray-400 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-700">
            Sign in to your account
          </h1>

            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            
            {error && <div><p className='text-red-500'>{error}</p></div>}
            
            <button
              onClick={handleSignIn}
              className="w-full text-md text-white rounded-lg bg-sky-500 font-medium !px-2 !py-2.5 text-center dark:bg-gray-200 dark:text-black"
            >
              Sign in
            </button>
            
        </div>
      </div>
    </div>
  );
}
