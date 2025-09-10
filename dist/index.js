// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  subscribers;
  contacts;
  constructor() {
    this.subscribers = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
  }
  async createSubscriber(insertSubscriber) {
    const id = randomUUID();
    const subscriber = {
      ...insertSubscriber,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  async getSubscribers() {
    return Array.from(this.subscribers.values());
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getContacts() {
    return Array.from(this.contacts.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var subscribers = pgTable("subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true
});

// server/routes.ts
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
async function registerRoutes(app2) {
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
      const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
      if (mailchimpApiKey && mailchimpAudienceId) {
        console.log("Mailchimp integration not implemented yet");
      }
      const subscriber = await storage.createSubscriber(data);
      try {
        const csvPath = path.join(process.cwd(), "data", "subscribers.csv");
        const csvLine = `${subscriber.email},${subscriber.createdAt.toISOString()}
`;
        await fs.mkdir(path.dirname(csvPath), { recursive: true });
        let fileExists = false;
        try {
          await fs.access(csvPath);
          fileExists = true;
        } catch {
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
  app2.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(data);
      try {
        const csvPath = path.join(process.cwd(), "data", "contact.csv");
        const csvLine = `"${contact.name}","${contact.email}","${contact.message.replace(/"/g, '""')}","${contact.createdAt.toISOString()}"
`;
        await fs.mkdir(path.dirname(csvPath), { recursive: true });
        let fileExists = false;
        try {
          await fs.access(csvPath);
          fileExists = true;
        } catch {
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
  app2.get("/api/episodes", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "localhost", () => {
    log(`serving on port ${port}`);
  });
})();
