import { supabaseWithServiceRoleForServer } from "@/lib/supabase.server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UpdateBusinessForm from "../UpdateBusinessForm";
import { Business } from "@/types/types";

const SingleBusiness = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  const email = session?.user?.email!;

  const { data } = await supabaseWithServiceRoleForServer
    .from("businesses")
    .select("*")
    .eq("id", parseInt(params.id));


  return (
    <div>
      {data?.map((business:Business) => (
        <UpdateBusinessForm business={business} email={email} key={business.id}/>
      ))}
    </div>
  );
};

export default SingleBusiness;
