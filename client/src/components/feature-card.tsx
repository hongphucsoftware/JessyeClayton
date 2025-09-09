import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  action?: string;
  linkText: string;
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  link, 
  action,
  linkText 
}: FeatureCardProps) {
  return (
    <Card className="p-8 hover-lift border border-border">
      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
        {icon}
      </div>
      
      <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
        {title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>
      
      {action === "subscribe" ? (
        <NewsletterForm buttonText={linkText} variant="link" />
      ) : link ? (
        <Link href={link} className="text-primary font-semibold hover:underline inline-flex items-center">
          {linkText} <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      ) : null}
    </Card>
  );
}
