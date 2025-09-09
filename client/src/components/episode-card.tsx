import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Play, Calendar, Clock, ExternalLink } from "lucide-react";
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

interface EpisodeCardProps {
  episode: Episode;
  featured?: boolean;
}

export default function EpisodeCard({ episode, featured = false }: EpisodeCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control audio playback
  };

  if (featured) {
    return (
      <Card className="rounded-2xl overflow-hidden shadow-lg hover-lift border border-border">
        {/* Episode image */}
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground mb-3">
              New Episode
            </Badge>
            <p className="text-sm opacity-90">
              {new Date(episode.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className="p-8">
          <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">
            {episode.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            {episode.summary}
          </p>
          
          {/* Audio player */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-4">
              <Button
                size="icon"
                onClick={handlePlay}
                className="w-12 h-12 rounded-full"
                data-testid="button-play-episode"
              >
                <Play className="h-5 w-5 ml-0.5" />
              </Button>
              <div className="flex-1">
                <div className="bg-border h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-1/3 rounded-full transition-all duration-300"></div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                15:42 / {episode.duration}
              </span>
            </div>
          </div>
          
          {/* Platform links */}
          <div className="flex flex-wrap gap-3">
            <a 
              href={episode.platformLinks.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-muted px-4 py-2 rounded-lg hover:bg-muted/70 transition-colors"
              data-testid="link-spotify-featured"
            >
              <div className="w-5 h-5 bg-green-500 rounded"></div>
              <span className="text-sm font-medium">Spotify</span>
            </a>
            <a 
              href={episode.platformLinks.apple} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-muted px-4 py-2 rounded-lg hover:bg-muted/70 transition-colors"
              data-testid="link-apple-featured"
            >
              <div className="w-5 h-5 bg-gray-600 rounded"></div>
              <span className="text-sm font-medium">Apple Podcasts</span>
            </a>
            <a 
              href={episode.platformLinks.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-muted px-4 py-2 rounded-lg hover:bg-muted/70 transition-colors"
              data-testid="link-youtube-featured"
            >
              <div className="w-5 h-5 bg-red-600 rounded"></div>
              <span className="text-sm font-medium">YouTube</span>
            </a>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 hover-lift">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 flex-shrink-0">
          <div className="aspect-square bg-muted rounded-xl overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400')"
              }}
            >
              <div className="w-full h-full bg-black/20 flex items-center justify-center">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handlePlay}
                  className="w-16 h-16 rounded-full bg-white/90 hover:bg-white"
                  data-testid={`button-play-${episode.id}`}
                >
                  <Play className="h-6 w-6 ml-1 text-black" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <Badge variant="secondary">Episode</Badge>
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
          
          <Link href={`/episodes/${episode.id}`}>
            <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground hover:text-primary transition-colors cursor-pointer">
              {episode.title}
            </h3>
          </Link>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            {episode.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <a 
                href={episode.platformLinks.spotify} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid={`link-spotify-${episode.id}`}
              >
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
              </a>
              <a 
                href={episode.platformLinks.apple} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid={`link-apple-${episode.id}`}
              >
                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
              </a>
              <a 
                href={episode.platformLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid={`link-youtube-${episode.id}`}
              >
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Y</span>
                </div>
              </a>
            </div>
            
            <Link href={`/episodes/${episode.id}`}>
              <Button variant="outline" size="sm" data-testid={`button-view-episode-${episode.id}`}>
                View Episode <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
