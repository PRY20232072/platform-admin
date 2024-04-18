"use client";

import { useParams } from "next/navigation";
import Heading from "@/components/heading-user-info";
import msgraphService from "@/services/msgraphService";
import { useEffect, useState } from "react";
import PatientBasicInformation from "./components/patient-basic-information";
import Loading from "@/components/ui/loading";

export default function PatientPage() {
  const [userData, setUserData] = useState({} as any);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await msgraphService.getUserById(
          params.patientId as string
        );
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
        setUserData({});
      }
    };

    fetchData();
  }, [params.patientId]);
  return (
    <div className='flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch'>
      {Object.keys(userData).length > 0 ? (
        <>
          <Heading userData={userData} userType='paciente' />
          <PatientBasicInformation userData={userData} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
