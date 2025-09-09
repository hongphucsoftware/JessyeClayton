import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema, type InsertSubscriber } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Compass } from "lucide-react";

interface NewsletterFormProps {
  buttonText?: string;
  inline?: boolean;
  variant?: "default" | "link";
}

export default function NewsletterForm({ 
  buttonText = "Subscribe", 
  inline = false,
  variant = "default"
}: NewsletterFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: ""
    }
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      return await apiRequest("POST", "/api/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive a confirmation email shortly."
      });
      form.reset();
      setIsOpen(false);
      setConsent(false);
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertSubscriber) => {
    if (!inline && !consent) {
      toast({
        title: "Please agree to receive emails",
        description: "You must consent to receive emails to continue.",
        variant: "destructive"
      });
      return;
    }
    subscribeMutation.mutate(data);
  };

  if (inline) {
    return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <Input 
          type="email" 
          placeholder="Enter your email address" 
          {...form.register("email")}
          required
          className="flex-1 px-6 py-4 rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary-foreground focus:outline-none"
          data-testid="input-newsletter-email"
        />
        <Button 
          type="submit" 
          className="bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap"
          disabled={subscribeMutation.isPending}
          data-testid="button-newsletter-submit"
        >
          {subscribeMutation.isPending ? "Subscribing..." : buttonText}
        </Button>
      </form>
    );
  }

  if (variant === "link") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="hover:text-primary transition-colors text-left" data-testid="button-newsletter-modal">
            {buttonText}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Compass className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center font-serif text-2xl">Stay on Course</DialogTitle>
            <p className="text-center text-muted-foreground">
              Get weekly insights and updates delivered to your inbox
            </p>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                {...form.register("email")}
                required
                className="w-full"
                data-testid="input-modal-email"
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="consent" 
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className="mt-1"
                data-testid="checkbox-consent"
              />
              <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                I agree to receive emails from You Are The Compass. I can unsubscribe at any time.
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={subscribeMutation.isPending}
              data-testid="button-modal-submit"
            >
              {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" data-testid="button-subscribe-trigger">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
              <Compass className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center font-serif text-2xl">Stay on Course</DialogTitle>
          <p className="text-center text-muted-foreground">
            Get weekly insights and updates delivered to your inbox
          </p>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              {...form.register("email")}
              required
              className="w-full"
              data-testid="input-modal-email"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="consent" 
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-1"
              data-testid="checkbox-consent"
            />
            <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
              I agree to receive emails from You Are The Compass. I can unsubscribe at any time.
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={subscribeMutation.isPending}
            data-testid="button-modal-submit"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
