import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import PatientHome from "@/components/patient/patient-home";
import PractitionerHome from "@/components/practitioner/practitioner-home";
import AdminHome from "@/components/admin/admin-home";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest, graphConfig } from "@/authConfig";
import MsalAuth from "./context/MsalAuth";
import MsalUnauth from "./context/MsalUnauth";

import Welcome from "@/components/admin/Welcome";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
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
