"use client";
import { useGraphData } from "@/hooks/useGraphData";
import msgraphService from "@/services/msgraphService";
import { useState, useEffect } from "react";
import { emptyAdmin } from "@/data/data";

export default function Welcome() {
  const [graphData, setGraphData] = useState({} as any);

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
  return (
    <>
      <div className='flex flex-col  border-b border-gray-200 items-start gap-10 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-10 relative flex-[0_0_auto]'>
        <div className='w-full sm:w-3/4 z-10 font-bold text-4xl leading-12 relative mt-[-1.00px]'>
          Bienvenido {graphData?.displayName}
        </div>
      </div>
    </>
  );
}
