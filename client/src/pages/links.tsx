import SocialIcons from "@/components/social-icons";
import NewsletterForm from "@/components/newsletter-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Instagram, MessageCircle, Youtube } from "lucide-react";
import logoImage from "@assets/image_1757426114065.png";
import { useEffect } from "react";

const links = [
  {
    title: "Latest Podcast Episode",
    description: "Finding Your True North",
    href: "/episodes/finding-your-true-north",
    icon: <Headphones className="h-6 w-6" />,
    color: "bg-primary"
  },
  {
    title: "Follow on Instagram",
    description: "@youarethecompass",
    href: "https://instagram.com/youarethecompass",
    icon: <Instagram className="h-6 w-6" />,
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    title: "TikTok",
    description: "Quick tips & inspiration",
    href: "https://tiktok.com/@youarethecompass",
    icon: <MessageCircle className="h-6 w-6" />,
    color: "bg-black"
  },
  {
    title: "YouTube Channel",
    description: "Video episodes & behind the scenes",
    href: "https://youtube.com/@youarethecompass",
    icon: <Youtube className="h-6 w-6" />,
    color: "bg-red-600"
  },
  {
    title: "Subscribe to Newsletter",
    description: "Weekly insights & updates",
    action: "subscribe",
    icon: <img src={logoImage} alt="Logo" className="h-6 w-6 rounded object-contain" />,
    color: "bg-secondary"
  }
];

export default function Links() {
  // Enable dark mode for links page
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-accent/20 p-4">
      <div className="max-w-md mx-auto py-8">
        {/* Avatar and Bio */}
        <div className="text-center mb-8">
          <img 
            src={logoImage} 
            alt="You Are The Compass Logo" 
            className="w-24 h-24 rounded-full mx-auto mb-6 object-contain bg-white"
          />
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            You Are The Compass
          </h1>
          <p className="text-muted-foreground">
            Find your direction—one step, one story.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            link.action === "subscribe" ? (
              <Card key={index} className="p-0 overflow-hidden hover-lift">
                <div className={`${link.color} p-4`}>
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex-shrink-0">
                      {link.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{link.title}</h3>
                      <p className="text-sm opacity-90 truncate">{link.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <NewsletterForm buttonText="Subscribe" />
                  </div>
                </div>
              </Card>
            ) : (
              <a
                key={index}
                href={link.href}
                target={link.href?.startsWith('http') ? '_blank' : '_self'}
                rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                data-testid={`link-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card className="p-0 overflow-hidden hover-lift transition-transform hover:scale-105">
                  <div className={`${link.color} p-6`}>
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex-shrink-0">
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{link.title}</h3>
                        <p className="text-sm opacity-90">{link.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            )
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground text-sm italic">
            You are the compass.
          </p>
          
          <div className="flex justify-center">
            <SocialIcons />
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2024 You Are The Compass
          </p>
        </div>
      </div>
    </div>
  );
}
