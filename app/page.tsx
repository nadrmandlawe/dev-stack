import PlaygroundEditor from "@/components/playground";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-12rem)] ">
      <div className="container mx-auto px-4 py-8">
        <PlaygroundEditor />
      </div>
    </div>
  );
}