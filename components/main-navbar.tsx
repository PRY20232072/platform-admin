"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import msgraphService from "@/services/msgraphService";
import { useState, useEffect } from "react";
export function MainNavbar({
  className,

  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [graphData, setGraphData] = useState<any>(null);

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
  const pathname = usePathname();
  const params = useParams();

  const admin_routes = [
    {
      href: `/`,
      label: "Información General",
      active: pathname === `/`,
    },
    {
      href: `/admin/${graphData?.id}/patients`,
      label: "Pacientes",
      active: pathname === `/admin/${graphData?.id}/patients`,
    },
    {
      href: `/admin/${graphData?.id}/practitioners`,
      label: "Profesionales de la salud",
      active: pathname === `/admin/${graphData?.id}/practitioners`,
    },
  ];

  const routes = admin_routes;

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-black dark:text-white"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
