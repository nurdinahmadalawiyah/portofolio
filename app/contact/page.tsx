import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export default function ContactPage() {
  return (
    <>
      <div className="max-w-lg text-center">
        <h1 className={title({ color: "turqoise", size: "sm" })}>Contact Me</h1>
        <h2 className={subtitle()}>
          Reach out to me easily through the contact form or my social media
          profiles.
        </h2>
      </div>
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            width={270}
          />
        </CardBody>
      </Card>
    </>
  );
}
