import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider, Skeleton } from "@nextui-org/react";

export default function CardSkeleton() {
  return (
    <Card className="!flex-1 !max-w-[535px] !min-w-[355px] !w-[unset] !grow">
      <CardHeader className="self-stretch p-5 border-b border-zinc-300 justify-start items-center gap-2.5 inline-flex">
        <Skeleton className="w-14 h-14 relative" />
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row justify-start items-start space-x-6">
        <div className="flex-1 flex-col justify-start p-5 items-start gap-2.5 inline-flex">
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="flex-1 flex-col justify-start p-5 items-start gap-2.5 inline-flex">
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 w-1/2 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
}
