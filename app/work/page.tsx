import { title, subtitle } from "@/components/primitives";

export default function WorkPage() {
  return (
    <div className="max-w-lg text-center">
      <h1 className={title({ color: "turqoise", size: "sm" })}>
        Work Experience
      </h1>
      <h2 className={subtitle()}>
        A Journey Through Professional Growth and Achievements
      </h2>
    </div>
  );
}
