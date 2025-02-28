"use client"

import React from "react"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FaHome, FaCar, FaTractor, FaRocket, FaYoutube, FaGithub } from "react-icons/fa"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 bg-background">
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
                <ResourceLink href="https://youtube.com" icon={<FaYoutube />} text="YouTube Demo" />
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