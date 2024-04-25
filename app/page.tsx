import AdminHome from "@/components/admin/admin-home";
import MsalAuth from "./context/MsalAuth";
import MsalUnauth from "./context/MsalUnauth";

import Welcome from "@/components/admin/Welcome";
import { SignInButton } from "@/components/signin-button";

export default function Home() {
  return (
    <>
      <MsalAuth interactionType='Silent'>
        <div className='flex-col'>
          <Welcome />
          <AdminHome />
        </div>
      </MsalAuth>
      <MsalUnauth>
        <center>
          <SignInButton isHome={true}/>
        </center>
      </MsalUnauth>
    </>
  );
}
