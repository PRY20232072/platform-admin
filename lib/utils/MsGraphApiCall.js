import { loginRequest, graphConfig } from "../../authConfig";
import { msalInstance } from "@/app/context/AuthProvider";

export async function callMsGraph(endpoint, method = "GET", body = null) {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });

  const headers = new Headers();
  const bearer = `Bearer ${response.accessToken}`;

  headers.append("Authorization", bearer);

  if (method === "POST") {
    headers.append("Content-Type", "application/json");
  }
  const options = {
    method: method,
    headers: headers,
  };

  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(body);
  }
  const url = `https://graph.microsoft.com/beta/${endpoint}`;

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`MS Graph API call failed: ${response.statusText}`);
      }
      return method === "DELETE" ? response : response.json();
    })
    .catch((error) => {
      console.log("MS Graph API call failed", error);
      throw error;
    });

}
