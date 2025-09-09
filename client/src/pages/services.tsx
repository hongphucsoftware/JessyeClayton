import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQAccordion from "@/components/faq-accordion";
import NewsletterForm from "@/components/newsletter-form";
import { Mic, GraduationCap, Mountain, Clock, Users, MapPin } from "lucide-react";

const services = [
  {
    id: "podcasting",
    icon: <Mic className="h-12 w-12" />,
    title: "Podcasting",
    subtitle: "Show Production & Distribution",
    description: "From concept to distribution, we help you create authentic podcast content that resonates with your audience.",
    features: [
      "Content strategy and planning",
      "Professional recording and editing",
      "Distribution across all major platforms",
      "Guest booking and interview coaching",
      "Analytics and growth strategies"
    ],
    pricing: "Custom packages available"
  },
  {
    id: "education",
    icon: <GraduationCap className="h-12 w-12" />,
    title: "Self-Help & Education",
    subtitle: "Courses, Workshops & Coaching",
    description: "Practical tools and frameworks for personal growth, designed for real-world application.",
    features: [
      "Interactive workshops and seminars",
      "One-on-one coaching sessions",
      "Online courses and resources",
      "Group accountability programs",
      "Custom corporate training"
    ],
    pricing: "Starting from $200/session"
  },
  {
    id: "adventure",
    icon: <Mountain className="h-12 w-12" />,
    title: "Adventure Treks",
    subtitle: "Guided Experiences",
    description: "Transformative outdoor experiences that combine adventure with personal reflection and growth.",
    features: [
      "Multi-day hiking and camping trips",
      "Mindfulness and reflection sessions",
      "Small group experiences (max 8 people)",
      "All equipment and meals provided",
      "Professional guides and safety support"
    ],
    pricing: "From $800 for 3-day experiences",
    cta: "Join Waitlist"
  }
];

const faqs = [
  {
    question: "How do I know which service is right for me?",
    answer: "Great question! Each service serves different needs. If you're looking to share your story or grow your business, podcasting might be perfect. For personal development and skill-building, our education offerings are ideal. And if you're feeling stuck and need a transformative experience, our adventure treks provide space for breakthrough moments. Feel free to book a discovery call to discuss your specific goals."
  },
  {
    question: "Do you offer virtual options for workshops and coaching?",
    answer: "Absolutely! While we love in-person connections, we understand the need for flexibility. Most of our workshops and coaching sessions are available virtually, and we've designed them to be just as engaging and effective as our in-person offerings."
  },
  {
    question: "What's included in the adventure trek experiences?",
    answer: "Our adventure treks include all camping equipment, meals, professional guides, safety equipment, and structured reflection/growth activities. We handle all the logistics so you can focus on your journey. Each trek is limited to 8 participants to ensure a personalized experience."
  },
  {
    question: "How far in advance do I need to book?",
    answer: "For workshops and coaching, we recommend booking 2-4 weeks in advance. Adventure treks typically book out 2-3 months ahead due to limited spots and seasonal considerations. Podcasting projects vary based on scope—we'll discuss timelines during your consultation."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible payment options for most of our services. For larger packages like podcasting projects or adventure treks, we can arrange installment plans. Reach out to discuss what works best for your situation."
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Find Your Path Forward
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Three ways to discover your direction, develop your voice, and take meaningful action.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            {services.map((service, index) => (
              <Card key={service.id} className={`p-12 hover-lift ${index % 2 === 1 ? 'bg-muted/30' : ''}`}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mr-6 text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                          {service.title}
                        </h2>
                        <p className="text-lg text-primary font-medium">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2 mb-8">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {service.pricing}
                      </p>
                      {service.cta === "Join Waitlist" ? (
                        <NewsletterForm buttonText="Join Waitlist" />
                      ) : (
                        <Button data-testid={`button-learn-more-${service.id}`}>
                          Learn More
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          {service.id === "podcasting" && <Mic className="h-16 w-16 mx-auto mb-4 text-primary/50" />}
                          {service.id === "education" && <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary/50" />}
                          {service.id === "adventure" && <Mountain className="h-16 w-16 mx-auto mb-4 text-primary/50" />}
                          <p className="text-sm">{service.title} Visual</p>
                          <p className="text-xs opacity-75 mt-1">Image placeholder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A simple process designed to get you moving in the right direction
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-xl">
                  1
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">Discovery Call</h3>
                <p className="text-muted-foreground">
                  We start with a conversation about where you are and where you want to go.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-xl">
                  2
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">Custom Plan</h3>
                <p className="text-muted-foreground">
                  Together, we design an approach that fits your goals, timeline, and learning style.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-xl">
                  3
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">Take Action</h3>
                <p className="text-muted-foreground">
                  With support and accountability, you'll implement what you learn and see real progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about our services
              </p>
            </div>
            
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
