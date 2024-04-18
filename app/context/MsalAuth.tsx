"use client";

import { MsalAuthenticationTemplate } from "@azure/msal-react";
import {
  InteractionType,
} from "@azure/msal-browser";
import { loginRequest } from "@/authConfig";

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
