import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function TestimonialCard({ name, role, content, avatar }: TestimonialCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="p-8 border border-border hover-lift">
      <div className="flex items-center mb-6">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={avatar} alt={`${name} testimonial`} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-4">
        "{content}"
      </p>
      
      <div className="flex space-x-1 text-primary">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
    </Card>
  );
}
