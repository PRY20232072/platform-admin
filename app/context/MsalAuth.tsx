"use client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";
import { CustomNavigationClient } from "../../lib/utils/NavigationClient";
import { useRouter } from "next/navigation";

import { SessionProvider } from "next-auth/react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest, graphConfig } from "@/authConfig";

const ErrorComponent = ({ error }: { error: any }) => {
  return (
    <h6 className='mt-5'>
      <center>Inicia sesión para acceder al panel de control.</center>
    </h6>
  );
};

const Loading = () => {
  return (
    <h6 className='mt-5'>
      <center>Validando credenciales...</center>
    </h6>
  );
};

export default function MsalAuth({
  children,
  interactionType,
}: {
  children: React.ReactNode;
  interactionType: string;
}) {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={
        interactionType === "Redirect"
          ? InteractionType.Redirect
          : InteractionType.Silent
      }
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
}
