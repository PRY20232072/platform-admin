"use client";
import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
// import Button from "@mui/material/Button";
import { Button as BT } from "@nextui-org/react";
/* import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu'; */
import { loginRequest } from "../authConfig";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { useGraphData } from "@/hooks/useGraphData";
import msgraphService from "@/services/msgraphService";
import { emptyAdmin } from "@/data/data";

export const SignOutButton = () => {
  const { instance } = useMsal();
  const router = useRouter();
  const [graphData, setGraphData] = useState<any>({
    identities: [{ issuerAssignedId: "" }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await msgraphService.getMe();
        setGraphData(data);
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.error(`logoutRedirect failed: ${e}`);
    });
  };

  return (
    <div>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            showFallback
            name={graphData?.displayName}
            src='https://images.unsplash.com/broken'
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Menu Actions' variant='flat'>
          <DropdownItem key='email' className='h-14 gap-2'>
            <p className='font-semibold'>Signed in as</p>
            <p className='font-semibold'>
              {graphData?.identities[0].issuerAssignedId}
            </p>
          </DropdownItem>
          <DropdownItem
            key='adminProfile'
            color='primary'
            onClick={() => router.push(`/admin/${graphData?.id}/profile`)}
          >
            Profile
          </DropdownItem>
          <DropdownItem
            key='logoutRedirect'
            color='primary'
            onClick={() => handleLogout()}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
