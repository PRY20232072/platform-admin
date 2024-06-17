require("dotenv").config();

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_B2C_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_B2C_TENANT_ID}` || '',
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    clientCapabilities: ["CP1"],
  },
  policies: {
    authorities: {
      signUpSignIn: {
        authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_B2C_TENANT_ID}`,
      },
    },
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "openid", "profile", "User.ReadWrite.All"],
  extraQueryParameters: {lc: '10'}
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/beta/me",
  graphUsersEndpoint: "https://graph.microsoft.com/beta/users",
};
