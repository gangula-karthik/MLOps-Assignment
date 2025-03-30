"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FaHome, FaCar, FaTractor, FaRocket, FaYoutube, FaGithub, FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Avatar, AvatarGroup } from "@heroui/avatar";

export default function Home() {
  // Use client-side only state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only run after hydration is complete
  useEffect(() => {
    setMounted(true);
    setIsModalOpen(true);
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 bg-background">
      {/* Welcome Modal - Only render on client side after mounting */}
      {mounted && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} backdrop="blur" size="2xl">
          <ModalContent>
            <ModalHeader className="flex items-center gap-2 border-b border-border py-3 px-4">
              <FaInfoCircle className="text-primary" />
              <span className="font-bold">Welcome to MLOps Project</span>
            </ModalHeader>
            <ModalBody className="py-4 px-5 space-y-3">
                {/* Team Members Avatars */}
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="mb-2">
                    <AvatarGroup isBordered>
                      <Avatar 
                      size="lg" 
                      src="https://media.licdn.com/dms/image/v2/D5603AQGNo_IXOWH0rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1699194129699?e=1749081600&v=beta&t=RXsrqow-3ADtycrh20xMW1EBptrqevYo4npDWfpm6_c" 
                      name="GK"
                      onClick={() => window.open("https://www.linkedin.com/in/karthik-gangula/", "_blank")}
                      />
                      <Avatar 
                      size="lg" 
                      src="https://media.licdn.com/dms/image/v2/D5603AQGKr0iS6ZW8Hw/profile-displayphoto-shrink_400_400/B56ZWzmGiKHQAg-/0/1742474865941?e=1749081600&v=beta&t=5ExdMgbzCaDES2MIDDM1kABdATMyhPTecqb4rBI_SK8" 
                      name="WJ"
                      onClick={() => window.open("https://www.linkedin.com/in/wei-jun-choy/", "_blank")}
                      />
                      <Avatar 
                      size="lg" 
                      src="https://cdn.discordapp.com/avatars/391279681644527629/f3d164772b4d0463d85487f53c7033e0.webp?size=240" 
                      name="GL"
                      onClick={() => window.open("https://github.com/loheegenegabriel", "_blank")}
                      />
                    </AvatarGroup>
                  </div>
                  <p className="text-sm font-medium">Our Team: Karthik, Weijun, and Gabriel</p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Explore our ML models built by Karthik, Weijun, and Gabriel. Backend is taken down due to budget limits, check out the YouTube demo or GitHub repo instead.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="bg-muted/30 border border-border" isHoverable={true}>
                    <CardBody className="p-3">
                      <div className="text-left">
                        <h3 className="font-semibold flex items-center gap-2 text-sm mb-1">
                          <FaYoutube className="text-red-500" />
                          Watch Our Demo
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          Get a quick overview of our project features.
                        </p>
                        <Link 
                          href="https://youtu.be/3A7-HXlz9pw" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline font-medium text-sm"
                        >
                          YouTube Demo <FaExternalLinkAlt className="text-xs" />
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                  
                  <Card className="bg-muted/30 border border-border" isHoverable={true}>
                    <CardBody className="p-3">
                      <div className="text-left">
                        <h3 className="font-semibold flex items-center gap-2 text-sm mb-1">
                          <FaGithub />
                          View our code
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          Look through our code and implementation.
                        </p>
                        <Link 
                          href="https://github.com/gangula-karthik/MLOps-Assignment" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline font-medium text-sm"
                        >
                          Github Link <FaExternalLinkAlt className="text-xs" />
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </div>
            </ModalBody>
            <ModalFooter className="flex justify-between border-t border-border py-3 px-4">
              <Button 
                variant="flat"
                color="danger" 
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
              <Button 
                variant="shadow"
                color="primary"
                size="sm"
                onClick={() => {
                  window.open("https://youtu.be/3A7-HXlz9pw", "_blank");
                  setIsModalOpen(false);
                }}
              >
                Watch Demo
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <div className="w-full max-w-6xl space-y-16">
        {/* Hero Section */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            MLOps Assignment
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A modern platform showcasing three powerful ML models for real-world applications.
          </p>
          <p className="text-sm text-muted-foreground">
            By Karthik, Weijun, and Gabriel
          </p>
        </header>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaHome className="text-4xl text-blue-500" />}
            title="House Price Prediction"
            description="Built by Gangula Karthik to analyze market trends and predict real estate pricing with high accuracy."
            href="/house_pricing_karthik"
          />
          <FeatureCard
            icon={<FaCar className="text-4xl text-green-500" />}
            title="Vehicle Sales Prediction"
            description="Built by Choy Wei Jun to forecast automotive market performance and optimize inventory management."
            href="/car_sales_weijun"
          />
          <FeatureCard
            icon={<FaTractor className="text-4xl text-yellow-500" />}
            title="Wheat Type Prediction"
            description="Built by Gabriel Loh classification algorithms to identify wheat varieties for agricultural optimization."
            href="/wheat_type_gabriel"
          />
        </section>

        {/* Resources Section */}
        <section className="mt-16">
          <Card className="border border-border overflow-hidden shadow-md">
            <CardHeader className="bg-muted/50 border-b border-border font-semibold text-lg px-6 py-4">
              Project Resources
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ResourceLink href="https://ml-ops-assignment.vercel.app/house_pricing_karthik" icon={<FaRocket />} text="Deployed App" />
                <ResourceLink href="https://youtu.be/3A7-HXlz9pw" icon={<FaYoutube />} text="YouTube Demo" />
                <ResourceLink href="https://github.com/gangula-karthik/MLOps-Assignment" icon={<FaGithub />} text="GitHub Repository" />
                <ResourceLink href="https://dagshub.com/gangula-karthik/MLOps-Assignment/experiments" icon={<FaGithub />} text="DAGsHub Repository" />
                <ResourceLink href="https://dagshub.com/gangula-karthik/MLOps-Assignment.mlflow/" icon={<FaGithub />} text="MLflow Remote Server" />
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </main>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 group-hover:transform group-hover:-translate-y-1">
        <CardBody className="p-8 flex flex-col items-center text-center space-y-5">
          <div className="p-4 rounded-full bg-muted/50 border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors duration-300">
            {icon}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{description}</p>
        </CardBody>
      </Card>
    </Link>
  )
}

interface ResourceLinkProps {
  href: string
  icon: React.ReactNode
  text: string
}

function ResourceLink({ href, icon, text }: ResourceLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
      <span className="text-xl text-primary">{icon}</span>
      <span className="font-medium">{text}</span>
    </Link>
  )
}
