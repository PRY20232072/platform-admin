import { Pencil, User2 } from "lucide-react";
import CustomSuspense from "@/components/ui/custom-suspense";
import Loading from "@/components/ui/loading";
import { useState, useEffect } from "react";

export default function AdminProfileBasicInfo({graphData}: {graphData: any}) {
  return (
    <CustomSuspense isLoading={graphData === null} fallback={<Loading />}>
      <div className='justify-between items-center  border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap'>
        <div className='flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full'>
          <div className='text-4xl font-bold leading-10 max-md:max-w-full'>
            Perfil
          </div>
          <div className='justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full'>
            {graphData?.displayName}
          </div>
          <div className='justify-center text-neutral-400 text-base leading-10 max-md:max-w-full'>
            ID: {graphData?.id}
          </div>
        </div>
        <div className='relative w-[116px] h-[115.5px]'>
          <div className='w-24 h-24 px-1.5 py-1.5 left-0 top-[15.50px] absolute bg-blue-600 rounded-2xl justify-center items-center inline-flex'>
            <User2
              className='w-12 h-12 px-2.5 py-1 flex-col justify-start items-center gap-0.5 inline-flex'
              color='white'
            />
          </div>
          <div className='w-8 h-8 left-[84px] top-0 absolute'>
            <div className='w-8 h-8 left-0 top-0 absolute bg-blue-100 rounded-full'>
              <Pencil
                className='w-4 h-4  top-1/4 left-1/4 absolute'
                color='black'
              />
            </div>
          </div>
        </div>
      </div>
    </CustomSuspense>
  );
}
