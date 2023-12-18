
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const NavBar = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  return (
    <>
      <nav className="border-b shadow-md mb-5 p-4 pt-2 flex-no-wrap z-10 fixed top-0 flex w-full items-center justify-between bg-gray-50 dark:bg-black">
        <div className="flex mt-4 items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <ul className="flex gap-6 ml-5">
              <li>
                <Link className="text-sm transition-colors" href="/businesses">
                  Businesses
                </Link>
              </li>
              {user && 
                <li>
                  <Link className="text-sm transition-colors" href="/businesses/add">
                    Add New
                  </Link>
                </li>
              }
            </ul>
          </div>

          <div className="flex justify-between items-center gap-5">
            {user ? (
              <form action='/sign-out' method="post">
                <button 
                  className="cursor-pointer bg-gray-500 mr-2 px-2 py-1 rounded-lg text-gray-100">
                  Logout 
                </button>({user.email})
              </form>
            ) : (
              <Link href={"/sign-in"}>
                <button className="cursor-pointer bg-sky-500 mr-2 px-2 py-1 rounded-lg text-gray-100">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
