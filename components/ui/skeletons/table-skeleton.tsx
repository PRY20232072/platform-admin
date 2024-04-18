import { Card, Skeleton } from "@nextui-org/react";

export default function TableSkeleton() {
  return (
    <Card className="flex p-5 w-full">
      <div className="flex flex-row space-x-6 p-3 rounded-lg bg-[#f4f4f5]">
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
      </div>
      <div className="flex flex-row space-x-6 p-3">
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
      </div>
      <div className="flex flex-row space-x-6 p-3">
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-3 flex-1 rounded-lg" />
        </Skeleton>
      </div>
    </Card>
  );
}