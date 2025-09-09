export const siteConfig = {
  name: "You Are The Compass",
  tagline: "You are the compass.",
  description: "Podcasting, personal growth, and real-world adventures to help you move forward. Find your direction—one step, one story.",
  url: process.env.SITE_URL || "https://youarethecompass.com",
  
  founder: {
    name: "Jessye Clayton",
    bio: "Sydney startup founder and host of You Are The Compass podcast",
    email: "hello@youarethecompass.com",
    location: "Sydney, Australia"
  },
  
  brand: {
    colors: {
      primary: "#2E7D32",
      secondary: "#A5D6A7", 
      accent: "#A5D6A7",
      background: "#F8FAFC",
      charcoal: "#111827"
    },
    fonts: {
      heading: "Playfair Display",
      body: "Inter"
    }
  },
  
  social: {
    instagram: "https://instagram.com/youarethecompass",
    tiktok: "https://tiktok.com/@youarethecompass", 
    youtube: "https://youtube.com/@youarethecompass",
    spotify: "https://open.spotify.com/show/youarethecompass",
    apple: "https://podcasts.apple.com/podcast/youarethecompass"
  },
  
  services: [
    {
      id: "podcasting",
      name: "Podcasting",
      description: "Show production & distribution"
    },
    {
      id: "education", 
      name: "Self-Help & Education",
      description: "Courses, workshops & coaching"
    },
    {
      id: "adventure",
      name: "Adventure Treks", 
      description: "Guided experiences"
    }
  ],
  
  seo: {
    defaultTitle: "You Are The Compass - Find Your Direction",
    defaultDescription: "Podcasting, personal growth, and real-world adventures to help you move forward. Find your direction—one step, one story.",
    defaultImage: "/images/og-image.jpg",
    twitterHandle: "@youarethecompass"
  }
} as const;

export type SiteConfig = typeof siteConfig;
