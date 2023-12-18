import { supabaseWithServiceRoleForServer } from "@/lib/supabase.server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UpdateBusinessForm from "../UpdateBusinessForm";

const SingleBusiness = async ({ params }: { params: { id: number } }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  const email = session?.user?.email!;

  const { data } = await supabaseWithServiceRoleForServer
    .from("businesses")
    .select("*")
    .eq("id", params.id);


  return (
    <div>
      {data?.map((business) => (
        <UpdateBusinessForm business={business} email={email} key={business.id}/>
      ))}
    </div>
  );
};

export default SingleBusiness;
