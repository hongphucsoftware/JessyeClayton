import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "wouter";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Link } from "wouter";

// In a real implementation, this would read from markdown files
const blogPosts = {
  "welcome": {
    title: "Welcome to You Are The Compass",
    date: "2024-03-01",
    readTime: "3 min read",
    tags: ["Welcome", "Mission"],
    content: `
      <p>Welcome to You Are The Compass—a space for authentic conversations about finding your direction in life.</p>
      
      <p>I'm Jessye, and I'm so glad you're here. Whether you found me through the podcast, social media, or a friend's recommendation, you've landed in a community that believes in one fundamental truth: you already have everything you need to navigate your journey.</p>
      
      <h2>Why "You Are The Compass"?</h2>
      
      <p>A compass doesn't tell you where to go—it shows you which direction you're facing. It's a tool for navigation, but the journey is entirely yours to make.</p>
      
      <p>Too often, we look outside ourselves for direction. We seek the "right" path in other people's experiences, waiting for someone else to hand us our purpose or tell us which way to turn. But here's what I've learned through my own journey and countless conversations with others: the compass you need is already within you.</p>
      
      <h2>What You'll Find Here</h2>
      
      <p>This space is for real conversations about the messiness and beauty of personal growth. Through the podcast, workshops, and adventure experiences, we'll explore:</p>
      
      <ul>
        <li><strong>Authentic stories</strong> from people who've navigated major life transitions</li>
        <li><strong>Practical tools</strong> for decision-making and personal development</li>
        <li><strong>Honest discussions</strong> about fear, uncertainty, and finding courage</li>
        <li><strong>Adventures</strong> that challenge you to step outside your comfort zone</li>
      </ul>
      
      <h2>The Journey Ahead</h2>
      
      <p>I don't have all the answers—no one does. But I believe deeply in the power of sharing stories, asking better questions, and supporting each other as we figure it out.</p>
      
      <p>Your compass is unique to you. My job isn't to calibrate it—it's to help you remember how to trust it.</p>
      
      <p>Thank you for being here. I can't wait to see where your journey takes you.</p>
      
      <p><em>With gratitude,<br>Jessye</em></p>
    `
  }
};

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug;
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/blog">
              <Button data-testid="button-back-to-blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
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
      
      {/* Article Header */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              
              <Button variant="outline" size="sm" data-testid="button-share-article">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
