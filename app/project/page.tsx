import { title, subtitle } from "@/components/primitives";

export default function ProjectPage() {
  return (
    <div className="max-w-lg text-center">
      <h1 className={title({ color: "turqoise", size: "sm" })}>Project</h1>
      <h2 className={subtitle()}>From Ideas to Solutions</h2>
    </div>
  );
}
