"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";

export default function AdminProfileDetails({ graphData }: { graphData: any }) {
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
