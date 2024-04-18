import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/react";

export default function FormSkeleton() {
  return (
    <Card className="!flex-1 !min-w-[355px] !w-[unset] !grow">
      <CardBody className="flex flex-row justify-start items-start space-x-6">
        <div className="flex-1 flex-col justify-start p-5 items-start gap-2 inline-flex">
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="flex-1 flex-col justify-start p-5 items-start gap-2 inline-flex">
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="flex-1 flex-col justify-start p-5 items-start gap-2 inline-flex">
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="!w-full rounded-lg">
            <div className="h-[40px] rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
}
