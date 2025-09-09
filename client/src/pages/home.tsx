import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Hero from "@/components/hero";
import FeatureCard from "@/components/feature-card";
import EpisodeCard from "@/components/episode-card";
import TestimonialCard from "@/components/testimonial-card";
import NewsletterForm from "@/components/newsletter-form";
import { useQuery } from "@tanstack/react-query";
import { Mic, GraduationCap, Mountain } from "lucide-react";

interface Episode {
  id: string;
  title: string;
  date: string;
  summary: string;
  audioUrl: string;
  platformLinks: {
    spotify: string;
    apple: string;
    youtube: string;
  };
  duration: string;
}

const testimonials = [
  {
    name: "Emily Chen",
    role: "Marketing Director",
    content: "Jessye's podcast helped me navigate a major career transition. Her practical approach and genuine warmth made all the difference in finding my new direction.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Marcus Thompson",
    role: "Entrepreneur",
    content: "The adventure trek was life-changing. It wasn't just about the hike—it was about rediscovering who I am and what truly matters to me.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Sarah Kim",
    role: "Writer & Coach",
    content: "The workshops provided me with tools I actually use every day. Jessye has a gift for making complex concepts feel simple and actionable.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

export default function Home() {
  const { data: episodes, isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"]
  });

  const featuredEpisode = episodes?.[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <Hero />
      
      {/* What We Do Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Do
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three ways to help you navigate your journey forward
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Mic className="h-8 w-8" />}
                title="Podcasting"
                description="Conversations and stories that spark action. Real talk about growth, challenges, and finding your path."
                link="/episodes"
                linkText="Listen Now"
              />
              
              <FeatureCard
                icon={<GraduationCap className="h-8 w-8" />}
                title="Self-Help & Education"
                description="Workshops and resources for practical growth. Learn tools that actually work in real life."
                link="/services"
                linkText="Learn More"
              />
              
              <FeatureCard
                icon={<Mountain className="h-8 w-8" />}
                title="Adventure Treks"
                description="Guided experiences to reconnect with nature—and yourself. Find clarity through adventure."
                action="subscribe"
                linkText="Join Waitlist"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episode Section */}
      <section id="episodes" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Episode
              </h2>
              <p className="text-xl text-muted-foreground">
                Latest conversation to inspire your journey
              </p>
            </div>
            
            {isLoading ? (
              <div className="bg-card rounded-2xl p-8 animate-pulse">
                <div className="h-64 bg-muted rounded-xl mb-6"></div>
                <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ) : featuredEpisode ? (
              <EpisodeCard episode={featuredEpisode} featured />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No episodes available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Stay on Course
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Get weekly insights, episode updates, and practical tools for your growth journey delivered straight to your inbox.
            </p>
            
            <NewsletterForm inline />
            
            <p className="text-sm opacity-75 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                What People Are Saying
              </h2>
              <p className="text-xl text-muted-foreground">
                Stories from fellow travelers on the journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
