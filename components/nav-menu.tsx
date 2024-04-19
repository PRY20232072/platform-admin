"use client";
import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
} from "@nextui-org/navbar";
import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { MainNavbar } from "@/components/main-navbar";

import { useIsAuthenticated } from "@azure/msal-react";
import SignInSignOutButton from "./signin-signout-button";


import dotenv from "dotenv";
dotenv.config();

interface NavMenuProps {
  userEmail: any;
}

export default function NavMenu({ userEmail }: NavMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isAuthenticated = useIsAuthenticated();


  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'
      className='h-20 py-5 shadow justify-center inline-flex'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className='sm:hidden'
        />
        <NavbarBrand as='li' className='gap-5 max-w-fit'>
          <Link className='flex justify-start items-center gap-5 ' href='/'>
            <div className='w-10 h-10 bg-black bg-opacity-10 rounded-[100px]' />
            <p className='grow shrink basis-0 text-blue-600 text-[28px] font-bold leading-9'>
              Plataforma
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className='hidden  sm:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        {isAuthenticated ? (
          <MainNavbar className='mx-2'   />
        ) : (
          ""
        )}

        <ThemeSwitch />
        <SignInSignOutButton />
      </NavbarContent>
    </NextUINavbar>
  );
}
