"use client";

import { Card, CardBody } from "@nextui-org/react";
import CustomSuspense from "@/components/ui/custom-suspense";
import FormSkeleton from "@/components/ui/skeletons/form-skeleton";
import { Input } from "@nextui-org/react";

export default function PatientBasicInformation({ userData } : { userData: any }) {
  return (
    <CustomSuspense isLoading={userData === null} fallback={<FormSkeleton />}>
      <Card>
        <CardBody className='items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full'>
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
                value={userData.givenName}
              />
              <Input
                isReadOnly
                type='email'
                label='Correo'
                labelPlacement='outside'
                placeholder='No disponible'
                value={userData?.identities[0].issuerAssignedId}
              />
              <Input
                isReadOnly
                type='phone'
                label='Teléfono'
                labelPlacement='outside'
                placeholder='No disponible'
                value={
                  userData.extension_25549976ad3f4b408bd442ed65100575_PhoneNumber
                }
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}
