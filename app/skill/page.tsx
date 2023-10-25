import { title, subtitle } from "@/components/primitives";

export default function SkillPage() {
  return (
    <div className="max-w-lg text-center">
      <h1 className={title({ color: "turqoise", size: "sm" })}>My Skills</h1>
      <h2 className={subtitle()}>Shaping My Expertise</h2>
    </div>
  );
}
