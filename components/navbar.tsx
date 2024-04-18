//'use client';
import React from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { ThemeSwitch } from '@/components/theme-switch';

import { Logo } from '@/components/ui/icons';
import { MainNavbar } from '@/components/main-navbar';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import  NavMenu  from '@/components/nav-menu';
const menuItems = [
  'Profile',
  'Dashboard',
  'Activity',
  'Analytics',
  'System',
  'Deployments',
  'My Settings',
  'Team Settings',
  'Help & Feedback',
  'Log Out',
];

interface NavbarProps {
  isLoggedIn: any;
}

export const Navbar = ({isLoggedIn}: NavbarProps) => {
  
  return <NavMenu userEmail={isLoggedIn}/>;
};
