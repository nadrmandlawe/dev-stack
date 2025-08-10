import { Suspense } from "react";
import PlaygroundEditor from "@/components/playground";
import Loader from "@/components/loader";

export default function Builder() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] flex-1">
      <div className="container mx-auto px-4 py-8 w-full">
        <Suspense fallback={<Loader size={32} />}>
          <PlaygroundEditor />
        </Suspense>
      </div>
    </div>
  );
}
