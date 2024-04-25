import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "@/providers/providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { Footer } from "@/components/footer";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: ["https://vercel.pub/favicon.ico"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <AuthProvider>
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className='relative flex flex-col h-screen'>
              <Navbar isLoggedIn={true} />

              <main className='container mx-auto px-4 sm:px-6 md:px-8 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-grow'>
                {children}
              </main>
              <Footer isLoggedIn={true} />
            </div>
          </Providers>
          <ToastContainer />
        </body>
      </AuthProvider>
    </html>
  );
}
