import { title, subtitle } from "@/components/primitives";

export default function ContactPage() {
  return (
    <div className="max-w-lg text-center">
      <h1 className={title({ color: "turqoise", size: "sm" })}>Contact Me</h1>
      <h2 className={subtitle()}>
        Reach out to me easily through the contact form or my social media
        profiles.
      </h2>
    </div>
  );
}
