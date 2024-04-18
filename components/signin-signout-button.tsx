import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "@/components/signin-button";
import { InteractionStatus } from "@azure/msal-browser";
import { SignOutButton } from "@/components/signout-button";

const SignInSignOutButton = () => {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return <SignOutButton />;
    }else if (inProgress !== InteractionStatus.Startup && inProgress !== InteractionStatus.HandleRedirect) {
        return <SignInButton isHome={false}/>;
    } else {
        return null;
    }
}

export default SignInSignOutButton;