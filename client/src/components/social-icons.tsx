import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/youarethecompass",
    icon: "fab fa-instagram",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@youarethecompass",
    icon: "fab fa-tiktok",
    bgColor: "bg-black"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@youarethecompass",
    icon: "fab fa-youtube",
    bgColor: "bg-red-600"
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/youarethecompass",
    icon: "fab fa-spotify",
    bgColor: "bg-green-500"
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/podcast/youarethecompass",
    icon: "fab fa-apple",
    bgColor: "bg-gray-600"
  }
];

export default function SocialIcons() {
  return (
    <div className="flex justify-center space-x-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
          aria-label={`Follow on ${social.name}`}
          data-testid={`social-${social.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <i className={`${social.icon} text-lg group-hover:text-primary-foreground`}></i>
        </a>
      ))}
    </div>
  );
}
