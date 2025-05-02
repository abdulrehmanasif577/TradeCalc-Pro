import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, message } = req.body;
      
      // Simple validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      
      // In a production environment, you would configure nodemailer
      // to send actual emails. For this example, we'll just log and return success.
      console.log("Contact form submission:", { name, email, message });
      
      // Respond with success
      res.status(200).json({ 
        message: "Message received! We'll get back to you soon." 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "An error occurred while processing your request" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
