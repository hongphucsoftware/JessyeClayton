import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const values = [
  {
    title: "Authenticity",
    description: "Real conversations, honest stories, and genuine connections that inspire meaningful change."
  },
  {
    title: "Growth Mindset",
    description: "Every challenge is an opportunity to learn, grow, and discover new directions."
  },
  {
    title: "Community",
    description: "We're all navigating this journey together. Support, encouragement, and shared wisdom matter."
  },
  {
    title: "Action-Oriented",
    description: "Practical tools and actionable insights that you can implement in your daily life."
  },
  {
    title: "Adventure",
    description: "Life is meant to be explored. Whether it's a mountain trail or a new career path."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">You Are The Compass</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Every journey begins with a single step—and the courage to trust your own direction.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Photo placeholder */}
              <div className="order-2 lg:order-1">
                <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-serif text-primary">JC</span>
                      </div>
                      <p className="text-sm">Founder Photo</p>
                      <p className="text-xs opacity-75 mt-1">Upload your photo here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Meet Jessye Clayton
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Hey there! I'm Jessye, the voice behind You Are The Compass. Like many of you, I've experienced those moments where life feels uncertain—where the path forward isn't clear, and you're not sure which direction to take.
                  </p>
                  <p>
                    My journey started in corporate Sydney, where I thought I had everything figured out. But something was missing. That compass inside me was spinning, and I knew I needed to make a change. So I did what felt impossible at the time—I left the safety of my corporate job to pursue something more meaningful.
                  </p>
                  <p>
                    Through podcasting, I discovered the power of authentic conversation. Every guest who shared their story reminded me that we all have an inner compass—we just need to learn how to trust it. That's what this platform is about: helping you find your direction through real stories, practical tools, and maybe a few adventures along the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
              Our Mission
            </h2>
            <Card className="p-12 hover-lift">
              <p className="text-xl leading-relaxed text-muted-foreground">
                To create a community where people feel empowered to trust their own direction. Through authentic conversations, practical education, and transformative experiences, we help individuals navigate life's transitions with confidence and clarity.
              </p>
              <div className="mt-8">
                <Badge variant="secondary" className="px-6 py-2 text-lg">
                  You are the compass.
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-8 hover-lift">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
              Why "You Are The Compass"?
            </h2>
            <div className="text-lg leading-relaxed space-y-6 opacity-90">
              <p>
                A compass doesn't tell you where to go—it shows you which direction you're facing. It's a tool for navigation, but the journey is entirely yours to make.
              </p>
              <p>
                We believe that everyone has an inner compass, an intuitive sense of direction that, when trusted, leads to authentic fulfillment. Sometimes that compass gets clouded by external expectations, fear, or simply the noise of daily life.
              </p>
              <p>
                Our role isn't to be your compass—it's to help you rediscover and trust your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
