"use client";
import { useState } from "react";
import { title, subtitle } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
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
      icon: <WhatsAppIcon size={24} />,
      label: "WhatsApp",
      value: siteConfig.contact.whatsapp.split("/").pop(),
      href: siteConfig.contact.whatsapp,
    },
    {
      icon: <LinkedInIcon size={24} />,
      label: "LinkedIn",
      value: "Nurdin Ahmad Alawiyah",
      href: siteConfig.contact.linkedin,
    },
    {
      icon: <InstagramIcon size={24} />,
      label: "Instagram",
      value: "@nurdin_ahmad_alawiyah",
      href: siteConfig.contact.instagram,
    },
    {
      icon: <GithubIcon size={24} />,
      label: "GitHub",
      value: "nurdinahmadalawiyah",
      href: siteConfig.contact.github,
    },
    {
      icon: <MapPinIcon size={24} />,
      label: "Location",
      value: siteConfig.contact.location,
      href: siteConfig.contact.maps,
    },
    {
      icon: <MailIcon size={24} />,
      label: "Quick Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
  ];

  const inputClasses = "w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none ring-0 focus:ring-0 focus:outline-none focus:border-turquoise/50 transition-colors duration-200 text-foreground placeholder:text-default-400";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="flex flex-col items-center justify-center gap-12 py-16 md:py-24 max-w-6xl mx-auto px-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={title({ color: "turqoise", size: "sm" })}>Get In Touch</h1>
        <h2 className={subtitle({ className: "mt-4 max-w-2xl mx-auto" })}>
          I&apos;m always open to new opportunities, collaborations, or just a friendly chat.
        </h2>
      </motion.div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        {/* Social Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md hover:border-turquoise/50 hover:shadow-[0_0_20px_rgba(44,231,241,0.1)] transition-all duration-300 group overflow-hidden"
            >
              <div className={`p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 group-hover:border-turquoise/30 transition-colors flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[10px] uppercase tracking-widest text-default-500 dark:text-default-400 font-bold truncate">{item.label}</span>
                <span className="text-sm font-semibold text-foreground group-hover:text-turquoise transition-colors truncate" title={item.value}>
                  {item.value}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          <Card className="border border-black/5 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md p-2">
            <CardBody className="p-8 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-turquoise font-black ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-turquoise font-black ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-turquoise font-black ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-turquoise font-black ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onPress={handleSendMessage}
                  className="w-full bg-turquoise text-white dark:text-black font-black uppercase tracking-widest py-6 rounded-xl shadow-[0_0_20px_rgba(44,231,241,0.3)] hover:shadow-[0_0_30px_rgba(44,231,241,0.5)] transition-all duration-300"
                >
                  Send Message
                </Button>
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
