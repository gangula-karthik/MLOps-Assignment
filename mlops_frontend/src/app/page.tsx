"use client"

import type React from "react"
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FaHome, FaCar, FaTractor, FaRocket, FaYoutube, FaGithub } from "react-icons/fa"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold">MLOps Assignment</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern landing page showcasing three core features: Housing, Car Sales, and Farmer Analytics.
          </p>
        </header>

        <section className="mt-12">
          <Card>
            <CardHeader>Project Resources</CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ResourceLink href="https://deployed-link.com" icon={<FaRocket />} text="Deployed App" />
                <ResourceLink href="https://youtube.com" icon={<FaYoutube />} text="YouTube Demo" />
                <ResourceLink href="https://github.com" icon={<FaGithub />} text="GitHub Repository" />
              </div>
            </CardBody>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaHome className="text-5xl text-primary" />}
            title="House Price Prediction"
            description="Analyzing market trends and pricing for real estate."
          />
          <FeatureCard
            icon={<FaCar className="text-5xl text-secondary" />}
            title="Car Sales Prediction"
            description="Predicting car prices and sales performance."
          />
          <FeatureCard
            icon={<FaTractor className="text-5xl text-accent" />}
            title="Wheat Type Prediction"
            description="Optimizing agricultural production and supply chains."
          />
        </section>
      </div>
    </main>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardBody className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-muted">{icon}</div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </CardBody>
    </Card>
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
      className="flex items-center space-x-2 p-3 bg-card text-card-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </Link>
  )
}

