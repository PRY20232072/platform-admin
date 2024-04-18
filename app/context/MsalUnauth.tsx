"use client";

import { UnauthenticatedTemplate } from "@azure/msal-react";

 
export default function MsalUnauth({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UnauthenticatedTemplate>{children}</UnauthenticatedTemplate>;
}
