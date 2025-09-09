import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import EpisodeCard from "@/components/episode-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

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

const categories = ["All", "Personal Growth", "Career", "Relationships", "Adventure", "Entrepreneurship"];

export default function Episodes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: episodes, isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"]
  });

  const filteredEpisodes = episodes?.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || true; // In real app, episodes would have categories
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Podcast Episodes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Real conversations about finding your direction, overcoming challenges, and creating meaningful change.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search episodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-episodes"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`button-filter-${category.toLowerCase()}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl p-8 animate-pulse">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredEpisodes && filteredEpisodes.length > 0 ? (
              <div className="space-y-8">
                {filteredEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4">No Episodes Found</h3>
                {searchTerm ? (
                  <p className="text-muted-foreground mb-6">
                    No episodes match your search for "{searchTerm}". Try adjusting your search terms.
                  </p>
                ) : (
                  <p className="text-muted-foreground mb-6">
                    New episodes are coming soon! Subscribe to be notified when they're available.
                  </p>
                )}
                <Button onClick={() => setSearchTerm("")} data-testid="button-clear-search">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Never Miss an Episode
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Get notified when new conversations go live, plus exclusive behind-the-scenes content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button variant="secondary" size="lg" className="flex-1" data-testid="button-subscribe-apple">
                Subscribe on Apple Podcasts
              </Button>
              <Button variant="secondary" size="lg" className="flex-1" data-testid="button-subscribe-spotify">
                Follow on Spotify
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
