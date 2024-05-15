"use client";

import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomSuspense from "../ui/custom-suspense";
import CardSkeleton from "../ui/skeletons/card-skeleton";
import msgraphService from "@/services/msgraphService";

export default function CardHome({ title }: { title: string }) {
  const [patientsList, setPatientsList] = useState<any>([]);
  const [practitionerList, setPractitionerList] = useState<any>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await msgraphService.getPatientList();
        if (data && data.value.length > 0) {
          const updatedList = data.value.map((patient: any) => ({
            col1: patient.givenName,
            col2: patient.id ? patient.id : "N/A",
          }));
          setPatientsList(updatedList);
        } else {
          setPatientsList([]);
        }
      } catch (error) {
        console.error("Failed to get patient list:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await msgraphService.getPractitionerList();
        if (data && data.value.length > 0) {
          const updatedList = data.value.map((practitioner: any) => ({
            col1: practitioner.givenName,
            col2: practitioner.id ? practitioner.id : "N/A",
          }));
          setPractitionerList(updatedList);
        } else {
          setPractitionerList([]);
        }
      } catch (error) {
        console.error("Failed to get practitioner list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomSuspense
      isLoading={patientsList === null || practitionerList === null}
      fallback={<CardSkeleton />}
    >
      <Card
        link={`admin/${graphData?.id}/${title === 'Pacientes' ? 'patients' : 'practitioners'}`}
        card_title={title}
        icon={
          <User
            color='white'
            className='w-5 h-[18px] left-[2px] top-[3px] absolute'
          />
        }
        heading_one='Nombre Completo'
        heading_two='ID'
        cardData={title === "Pacientes" ? patientsList : practitionerList}
      />
    </CustomSuspense>
  );
}
