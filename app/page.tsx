import { Suspense } from "react";
import PlaygroundEditor from "@/components/playground";
import Loader from "@/components/loader";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-12rem)] ">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loader size={32} />}>
          <PlaygroundEditor />
        </Suspense>
      </div>
    </div>
  );
}