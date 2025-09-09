import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Episodes from "@/pages/episodes";
import EpisodeDetail from "@/pages/episode-detail";
import Contact from "@/pages/contact";
import Links from "@/pages/links";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/episodes" component={Episodes} />
      <Route path="/episodes/:slug" component={EpisodeDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/links" component={Links} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
