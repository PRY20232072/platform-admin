import { useEffect, useState } from "react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { callMsGraph } from "@/lib/utils/MsGraphApiCall";
import { loginRequest } from "@/authConfig";

interface GraphData {
  displayName?: string;
  identities?: any;
  id?: string;
}

export function useGraphData(endpoint: any, method: any, body: any) {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph(endpoint, method, body)
        .then((response) => setGraphData(response))
        .catch((e) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount() ?? undefined,
            });
          }
        });
    }
  }, [inProgress, graphData, instance]);

  return graphData;
}