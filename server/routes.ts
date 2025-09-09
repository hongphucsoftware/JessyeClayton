import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      
      // Check for Mailchimp integration
      const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
      const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
      
      if (mailchimpApiKey && mailchimpAudienceId) {
        // TODO: Implement Mailchimp integration
        console.log("Mailchimp integration not implemented yet");
      }
      
      // Store in memory/CSV fallback
      const subscriber = await storage.createSubscriber(data);
      
      // Append to CSV file
      try {
        const csvPath = path.join(process.cwd(), "data", "subscribers.csv");
        const csvLine = `${subscriber.email},${subscriber.createdAt.toISOString()}\n`;
        
        // Ensure data directory exists
        await fs.mkdir(path.dirname(csvPath), { recursive: true });
        
        // Check if file exists to add header
        let fileExists = false;
        try {
          await fs.access(csvPath);
          fileExists = true;
        } catch {
          // File doesn't exist
        }
        
        if (!fileExists) {
          await fs.writeFile(csvPath, "email,created_at\n");
        }
        
        await fs.appendFile(csvPath, csvLine);
      } catch (error) {
        console.error("Failed to write to CSV:", error);
      }
      
      res.json({ success: true, message: "Successfully subscribed!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid email address" });
      } else {
        console.error("Subscription error:", error);
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      
      const contact = await storage.createContact(data);
      
      // Append to CSV file
      try {
        const csvPath = path.join(process.cwd(), "data", "contact.csv");
        const csvLine = `"${contact.name}","${contact.email}","${contact.message.replace(/"/g, '""')}","${contact.createdAt.toISOString()}"\n`;
        
        // Ensure data directory exists
        await fs.mkdir(path.dirname(csvPath), { recursive: true });
        
        // Check if file exists to add header
        let fileExists = false;
        try {
          await fs.access(csvPath);
          fileExists = true;
        } catch {
          // File doesn't exist
        }
        
        if (!fileExists) {
          await fs.writeFile(csvPath, "name,email,message,created_at\n");
        }
        
        await fs.appendFile(csvPath, csvLine);
      } catch (error) {
        console.error("Failed to write contact to CSV:", error);
      }
      
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Please fill out all fields correctly" });
      } else {
        console.error("Contact error:", error);
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  // Episodes API (mock data for now - in real implementation would read from markdown files)
  app.get("/api/episodes", async (req, res) => {
    try {
      const episodes = [
        {
          id: "finding-your-true-north",
          title: "Finding Your True North: A Conversation with Sarah Martinez",
          date: "2024-03-15",
          summary: "In this powerful episode, we dive deep into how life coach Sarah Martinez discovered her calling after a major career pivot. We explore the practical steps she took to rebuild her compass and find her true direction.",
          audioUrl: "/audio/episode-1.mp3",
          platformLinks: {
            spotify: "https://open.spotify.com/episode/example",
            apple: "https://podcasts.apple.com/podcast/example",
            youtube: "https://youtube.com/watch?v=example"
          },
          duration: "47:12"
        }
      ];
      
      res.json(episodes);
    } catch (error) {
      console.error("Episodes error:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
