"use client";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Button, Image } from "@nextui-org/react";

export const SignInButton = ({ isHome }: { isHome: boolean }) => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error(`loginRedirect failed: ${e}`);
    });
  };

  return isHome ? (
    <Button
      startContent={
        <Image
          loading='lazy'
          height={24}
          width={24}
          alt='Azure icon'
          src='https://authjs.dev/img/providers/azure.svg'
        />
      }
      className='mt-5'
      color='primary'
      onClick={() => handleLogin()}
    >
      Iniciar sesión con Azure Active Directory B2C
    </Button>
  ) : (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          showFallback
          src='https://images.unsplash.com/broken'
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Menu Actions' variant='flat'>
        <DropdownItem
          key='loginRedirect'
          color='primary'
          onClick={() => handleLogin()}
        >
          Iniciar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
