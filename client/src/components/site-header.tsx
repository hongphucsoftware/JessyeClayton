import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NewsletterForm from "@/components/newsletter-form";
import { Menu } from "lucide-react";
import logoImage from "@assets/image_1757426114065.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Episodes", href: "/episodes" },
  { name: "Contact", href: "/contact" }
];

export default function SiteHeader() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border transition-all duration-200 ${
      isScrolled ? 'glass-effect' : 'bg-background'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src={logoImage} 
              alt="You Are The Compass Logo" 
              className="w-10 h-10 rounded-lg object-contain"
            />
            <span className="font-serif font-semibold text-xl hidden sm:block">
              You Are The Compass
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors hover:text-primary ${
                  location === item.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <NewsletterForm buttonText="Subscribe" />
          </div>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center space-x-3 mb-8">
                <img 
                  src={logoImage} 
                  alt="You Are The Compass Logo" 
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <span className="font-serif font-semibold text-lg">
                  You Are The Compass
                </span>
              </div>
              
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg transition-colors hover:text-primary ${
                      location === item.href
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                    data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-8">
                <NewsletterForm buttonText="Subscribe" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
