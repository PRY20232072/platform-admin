"use client";
import React from "react";
import Link from "next/link";
import {
  Card as CardNextUI,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Tooltip,
} from "@nextui-org/react";

interface CardProps {
  link: string;
  card_title: string;
  icon: React.ReactNode;
  heading_one: string;
  heading_two: string;
  cardData: { col1: string; col2: string }[];
}

export const Card: React.FC<CardProps> = ({
  link,
  card_title,
  icon,
  heading_one,
  heading_two,
  cardData,
}) => {
  return (
    <CardNextUI className='!flex-1 !max-w-[535px] !min-w-[355px] !w-[unset] !grow'>
      <CardHeader className='self-stretch p-5 border-b border-zinc-300 justify-start items-center gap-2.5 inline-flex'>
        <div className='w-14 h-14 relative'>
          <div className='w-14 h-14 left-0 top-0 absolute bg-blue-600 rounded-xl' />
          <div className='w-6 h-6 left-[16px] top-[16px] absolute'>{icon}</div>
        </div>

        <div className=' text-base font-bold leading-normal'>{card_title}</div>

        <div className='flex-grow flex-shrink flex-basis-0 h-8 justify-end items-center gap-2.5 flex'>
          <Button
            className='
              bg-sky-100 text-blue-600 text-sm font-medium justify-center items-center gap-3 flex
            '
            color='primary'
            radius='lg'
            size='sm'
            variant={"solid"}
          >
            <Link href={link}>Ver más</Link>
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='flex flex-row justify-start items-start space-x-6 '>
        <div className='flex-1 flex-col justify-start p-5 items-start gap-2.5 inline-flex'>
          <div className='self-stretch text-sm font-bold leading-normal'>
            {heading_one}
          </div>
          {cardData.map((data, index) => (
            <div key={index} className=' text-sm font-normal leading-normal'>
              {data.col1}
            </div>
          ))}
        </div>

        <div className='flex-1 w-40 self-stretch p-5 border-l border-zinc-300 flex-col justify-start items-start gap-2.5 inline-flex'>
          <div className='self-stretch  text-sm font-bold leading-normal'>
            {heading_two}
          </div>
          {cardData.map((data, index) => (
            <Tooltip key={index} content={data.col2} placement='top'>
              <div key={index} className=' text-sm font-normal leading-normal'>
                {data.col2.substring(0, 8) + "..."}
              </div>
            </Tooltip>
          ))}
        </div>
      </CardBody>
    </CardNextUI>
  );
};
