"use client";
import { useEffect, useState } from "react";
import AdminProfileBasicInfo from "./components/profile-basic-info";
import AdminProfileDetails from "./components/profile-details";
import msgraphService from "@/services/msgraphService";
import Loading from "@/components/ui/loading";

export default function AdminProfile() {
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
    <div className='flex flex-col  items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32'>
      {Object.keys(graphData).length > 0 ? (
        <>
          <AdminProfileBasicInfo graphData={graphData} />
          <AdminProfileDetails graphData={graphData} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
