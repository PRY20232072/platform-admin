import { UsersTable } from "@/components/users-table";
import { PatientsModal } from "./[patientId]/components/patients-modal";
import { Card, CardBody } from "@nextui-org/react";

export default function PatientsPage() {
  return (
    <div className='flex flex-col items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32'>
      <div className='justify-between items-center  border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap'>
        <div className='flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full'>
          <div className='mb-4 text-4xl font-bold leading-10 max-md:max-w-full'>
            Pacientes
          </div>
        </div>
      </div>
      <Card className='self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full'>
        <CardBody>
          <PatientsModal />
          <UsersTable userType='Patient' />
        </CardBody>
      </Card>
    </div>
  );
}
