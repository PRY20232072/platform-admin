"use client";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";
import { CustomNavigationClient } from "../../lib/utils/NavigationClient";
import { useRouter } from "next/navigation";
 
export const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize().then(() => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && (event.payload as any)?.account ) {
      const account = (event.payload as any).account ;
      msalInstance.setActiveAccount(account);
    }
  });
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const navigationClient = new CustomNavigationClient(router);
  msalInstance.setNavigationClient(navigationClient);
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
