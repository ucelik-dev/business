import { supabaseWithServiceRoleForServer } from "@/lib/supabase.server"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link";

const Businesses = async() => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  const { data } = await supabaseWithServiceRoleForServer
  .from('businesses')
  .select('*')
  .order('created_at')


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.map((business) => (
          
          <div className="cursor-pointer" key={business.id}>
            <Link
              href={`/businesses/${business.id}`}
            >
              <div className={`${business.user_email === user?.email ? 'bg-sky-100 hover:bg-sky-200':'bg-gray-100 hover:bg-gray-300'} flex flex-col items-center justify-center gap-3 m-1 p-3 rounded-md hover:drop-shadow-lg hover:shadow-xl hover:border-none hover:transition-all`}>
                <div className="flex items-center justify-center text-2xl">
                  {business.title}
                </div>
                <div className="flex items-center justify-center">
                  {business.user_email}
                </div>
                <div className="flex items-center justify-center">
                  {business.created_at?.slice(0,10)}
                </div>
              </div>
            </Link>
          </div>

        ))}
    </div>
  )
}

export default Businesses