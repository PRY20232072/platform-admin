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

  //hearder for post request
  if (method === "POST") {
    headers.append("Content-Type", "application/json");
  }
  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  };

  if (method === "GET") delete options.body;
  return fetch("https://graph.microsoft.com/beta/" + endpoint, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log("MS Graph API call failed ", error);
      throw error;
    });
}
