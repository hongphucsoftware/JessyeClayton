import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/newsletter-form";
import logoImage from "@assets/image_1757426114065.png";

export default function Hero() {
  const scrollToEpisodes = () => {
    const episodesSection = document.getElementById('episodes');
    if (episodesSection) {
      episodesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logoImage} 
              alt="You Are The Compass Logo" 
              className="w-24 h-24 rounded-2xl mx-auto mb-6 object-contain"
            />
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Find your direction—<br className="hidden sm:block" />
            <span className="text-primary">one step, one story.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Podcasting, personal growth, and real-world adventures to help you move forward.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NewsletterForm buttonText="Subscribe" />
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToEpisodes}
              className="bg-card text-card-foreground border-border hover:bg-muted/50 w-full sm:w-auto"
              data-testid="button-listen-podcast"
            >
              Listen to the Podcast
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
