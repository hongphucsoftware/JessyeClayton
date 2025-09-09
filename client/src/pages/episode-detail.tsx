import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AudioPlayer from "@/components/audio-player";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

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

export default function EpisodeDetail() {
  const params = useParams();
  const slug = params.slug;

  const { data: episodes, isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"]
  });

  const episode = episodes?.find(ep => ep.id === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">Episode Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The episode you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/episodes">
              <Button data-testid="button-back-to-episodes">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Episodes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Episode Header */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/episodes" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Episodes
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary">New Episode</Badge>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(episode.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {episode.duration}
              </div>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
              {episode.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" data-testid="button-share-episode">
                <Share2 className="h-4 w-4 mr-2" />
                Share Episode
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {/* Episode Image */}
                <div className="aspect-video bg-muted rounded-2xl overflow-hidden mb-8">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600')"
                    }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </div>
                
                {/* Audio Player */}
                <Card className="p-6 mb-8">
                  <AudioPlayer audioUrl={episode.audioUrl} title={episode.title} />
                </Card>
                
                {/* Episode Summary */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-serif text-2xl font-semibold mb-4">About This Episode</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {episode.summary}
                  </p>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                {/* Platform Links */}
                <Card className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-4">Listen On</h3>
                  <div className="space-y-3">
                    <a 
                      href={episode.platformLinks.spotify} 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      data-testid="link-spotify"
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                      <span className="font-medium">Spotify</span>
                    </a>
                    <a 
                      href={episode.platformLinks.apple} 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      data-testid="link-apple"
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A</span>
                      </div>
                      <span className="font-medium">Apple Podcasts</span>
                    </a>
                    <a 
                      href={episode.platformLinks.youtube} 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      data-testid="link-youtube"
                    >
                      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Y</span>
                      </div>
                      <span className="font-medium">YouTube</span>
                    </a>
                  </div>
                </Card>
                
                {/* Subscribe CTA */}
                <Card className="p-6 bg-primary text-primary-foreground">
                  <h3 className="font-serif text-xl font-semibold mb-3">
                    Enjoying the show?
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    Subscribe to never miss an episode and get exclusive content.
                  </p>
                  <Button variant="secondary" className="w-full" data-testid="button-subscribe-sidebar">
                    Subscribe Now
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
