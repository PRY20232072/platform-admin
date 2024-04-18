interface CustomSuspenseProps {
    isLoading: Boolean;
    fallback: React.JSX.Element;
    children: React.JSX.Element;
}

export default function CustomSuspense({ isLoading, fallback, children }: CustomSuspenseProps): React.JSX.Element {
    if (isLoading) {
        return fallback;
    }
    return <>{children}</>;
}