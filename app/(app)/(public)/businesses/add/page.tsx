import { supabaseWithServiceRoleForServer } from "@/lib/supabase.server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddBusinessForm from "../AddBusinessForm";
import { redirect } from "next/navigation";

const AddBusiness = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  const userEmail = session?.user?.email!;

  if(!session?.user) redirect('/businesses');

  return (
    <div>
        <AddBusinessForm userEmail={userEmail}/>
    </div>
  );
};

export default AddBusiness;
