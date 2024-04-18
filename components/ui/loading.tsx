import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Spinner size="lg" />
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    </div>
  );
}