"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  addressTypes,
  civilStatus,
  emptyPractitioner,
  genders,
} from "@/data/data";
import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { Button, Input } from "@nextui-org/react";
import CustomSuspense from "@/components/ui/custom-suspense";
import Loading from "@/components/ui/loading";
import { toast } from "react-toastify";

export default function AdminProfileDetails({ graphData }: { graphData: any }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const validatePhone = (phone: string) => phone.match(/^9\d{8}$/);
  const [practitioner, serPractitioner] = useState(emptyPractitioner);
  const [provincesOptions, setProvincesOptions] = useState<
    { id: string; name: string; department_id: string }[]
  >([]);
  const [districtsOptions, setDistrictsOptions] = useState<
    { id: string; name: string; province_id: string }[]
  >([]);

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='mb-8'>
        <div className='mb-4 font-bold text-2xl tracking-[0] leading-[24px]'>
          Información general
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Input
            isReadOnly
            type='text'
            label='Nombre completo'
            labelPlacement='outside'
            placeholder='No disponible'
            value={graphData.givenName}
          />
          <Input
            isReadOnly
            type='email'
            label='Correo'
            labelPlacement='outside'
            placeholder='No disponible'
            value={graphData?.identities[0].issuerAssignedId}
          />
          <Input
            isReadOnly
            type='phone'
            label='Teléfono'
            labelPlacement='outside'
            placeholder='No disponible'
            value={graphData.mobilePhone}
          />
        </div>
      </div>
      <div className='mb-8'>
        <div className='mb-4 font-bold  text-2xl tracking-[0] leading-[24px]'>
          Información de la organización
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Input
            isReadOnly
            type='text'
            label='Nombre'
            labelPlacement='outside'
            placeholder='No disponible'
            value={graphData.companyName}
          />
          <Input
            isReadOnly
            type='text'
            label='Dirección'
            labelPlacement='outside'
            placeholder='No disponible'
            value={graphData.streetAddress}
          />
          <Input
            isReadOnly
            type='email'
            label='Correo institucional'
            labelPlacement='outside'
            placeholder='No disponible'
            value={graphData?.identities[1]?.issuerAssignedId}
          />
          <Input
            isReadOnly
            type='Telefono'
            label='Número de telefono'
            labelPlacement='outside'
            placeholder='No disponible'
            value={graphData.businessPhones[0]}
          />
        </div>
      </div>
    </div>
  );
}
