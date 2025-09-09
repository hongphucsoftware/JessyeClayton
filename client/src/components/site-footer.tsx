import { Link } from "wouter";
import SocialIcons from "@/components/social-icons";
import NewsletterForm from "@/components/newsletter-form";
import logoImage from "@assets/image_1757426114065.png";

const navigation = {
  navigate: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Episodes", href: "/episodes" }
  ],
  services: [
    { name: "Podcasting", href: "/services#podcasting" },
    { name: "Education", href: "/services#education" },
    { name: "Adventure Treks", href: "/services#adventure" }
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Links", href: "/links" }
  ],
  connect: [
    { name: "Contact", href: "/contact" },
    { name: "hello@youarethecompass.com", href: "mailto:hello@youarethecompass.com" }
  ]
};

export default function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Logo and tagline */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity">
              <img 
                src={logoImage} 
                alt="You Are The Compass Logo" 
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="font-serif font-semibold text-xl">You Are The Compass</span>
            </Link>
            <p className="text-muted-foreground italic">You are the compass.</p>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center mb-12">
            <SocialIcons />
          </div>
          
          {/* Footer navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navigate</h4>
              <ul className="space-y-2 text-muted-foreground">
                {navigation.navigate.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <NewsletterForm buttonText="Newsletter" variant="link" />
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                {navigation.connect.map((item) => (
                  <li key={item.name}>
                    {item.href.startsWith('mailto:') ? (
                      <a href={item.href} className="hover:text-primary transition-colors">
                        {item.name}
                      </a>
                    ) : (
                      <Link href={item.href} className="hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              © 2024 You Are The Compass. All rights reserved. Made with ❤️ in Sydney.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
