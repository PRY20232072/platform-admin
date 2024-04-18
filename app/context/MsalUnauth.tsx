"use client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";
import { CustomNavigationClient } from "../../lib/utils/NavigationClient";
import { useRouter } from "next/navigation";

import { SessionProvider } from "next-auth/react";
import { UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest, graphConfig } from "@/authConfig";

 
export default function MsalUnauth({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UnauthenticatedTemplate>{children}</UnauthenticatedTemplate>;
}
