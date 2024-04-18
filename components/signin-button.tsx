"use client";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
// import Button from "@mui/material/Button";
import { Button as BT } from "@nextui-org/react";
/* import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu'; */
import { loginRequest } from "../authConfig";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export const SignInButton = ({ isHome }: { isHome: boolean }) => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error(`loginRedirect failed: ${e}`);
    });
  };

  return isHome ? (
    <Button className='mt-5' color='primary' onClick={() => handleLogin()}>
      Iniciar sesión
    </Button>
  ) : (
    <div>
      <Dropdown placement='bottom-end'>
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
    </div>
  );
};
