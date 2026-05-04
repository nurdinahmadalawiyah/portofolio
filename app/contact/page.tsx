"use client";
import { useState } from "react";
import { title, subtitle } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { 
  GithubIcon, 
  LinkedInIcon, 
  InstagramIcon, 
  WhatsAppIcon, 
  MailIcon, 
  MapPinIcon 
} from "@/components/icons";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendMessage = () => {
    const { name, subject, message } = formData;
    const body = `Name: ${name}%0D%0AMessage: ${message}`;
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const contactItems = [
    {
      icon: <WhatsAppIcon className="text-success" size={24} />,
      label: "WhatsApp",
      value: siteConfig.contact.whatsapp.split("/").pop(),
      href: siteConfig.contact.whatsapp,
      color: "bg-green-500/10",
    },
    {
      icon: <LinkedInIcon className="text-primary" size={24} />,
      label: "LinkedIn",
      value: "Nurdin Ahmad Alawiyah",
      href: siteConfig.contact.linkedin,
      color: "bg-blue-600/10",
    },
    {
      icon: <InstagramIcon className="text-danger" size={24} />,
      label: "Instagram",
      value: "@nurdin_ahmad_alawiyah",
      href: siteConfig.contact.instagram,
      color: "bg-pink-500/10",
    },
    {
      icon: <GithubIcon className="text-default-500" size={24} />,
      label: "GitHub",
      value: "nurdinahmadalawiyah",
      href: siteConfig.contact.github,
      color: "bg-default-500/10",
    },
    {
      icon: <MapPinIcon className="text-warning" size={24} />,
      label: "Location",
      value: siteConfig.contact.location,
      href: siteConfig.contact.maps,
      color: "bg-yellow-500/10",
    },
    {
      icon: <MailIcon className="text-primary" size={24} />,
      label: "Quick Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      color: "bg-blue-500/10",
    },
  ];

  return (
    <section id="contact" className="flex flex-col items-center justify-center gap-8 py-12 md:py-20">
      <div className="inline-block max-w-2xl text-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={title({ color: "cyan", size: "lg" })}>Get In Touch</h1>
          <h2 className={subtitle({ className: "mt-4" })}>
            I'm always open to new opportunities, collaborations, or just a friendly chat.
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-16 w-full max-w-4xl px-4 mt-12 mx-auto">
        {/* Social Links Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {contactItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                isExternal
                className="w-full"
              >
                <Card 
                  isPressable 
                  className="w-full border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardBody className="flex flex-row items-center gap-4 p-4">
                    <div className={`p-3 rounded-2xl ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-default-500">{item.label}</span>
                      <span className="text-sm font-medium truncate max-w-[150px]">{item.value}</span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          <div className="flex flex-col gap-6 items-center">
            <div className="flex items-center gap-2 w-full">
               <div className="h-[1px] bg-default-200 flex-1"></div>
               <span className="text-default-400 text-sm font-medium px-4">OR SEND A MESSAGE</span>
               <div className="h-[1px] bg-default-200 flex-1"></div>
            </div>
            
            <Card className="p-6 border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-md shadow-lg w-full">
              <CardBody className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      label="Name"
                      placeholder="Enter your name"
                      variant="bordered"
                      className="flex-1"
                      value={formData.name}
                      onValueChange={(val) => handleInputChange("name", val)}
                    />
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      className="flex-1"
                      value={formData.email}
                      onValueChange={(val) => handleInputChange("email", val)}
                    />
                  </div>
                  <Input
                    label="Subject"
                    placeholder="What is this about?"
                    variant="bordered"
                    value={formData.subject}
                    onValueChange={(val) => handleInputChange("subject", val)}
                  />
                  <Textarea
                    label="Message"
                    placeholder="Write your message here..."
                    variant="bordered"
                    minRows={4}
                    value={formData.message}
                    onValueChange={(val) => handleInputChange("message", val)}
                  />
                  <Button 
                    size="lg" 
                    className="font-bold text-white bg-gradient-to-r from-[#00b7fa] to-[#01cfea] shadow-lg shadow-cyan-500/30 mt-2 w-full"
                    onPress={handleSendMessage}
                  >
                    Send Message
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

