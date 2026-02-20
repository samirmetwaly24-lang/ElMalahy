import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.attractions.list.path, async (req, res) => {
    const allAttractions = await storage.getAttractions();
    res.json(allAttractions);
  });

  app.get(api.packages.list.path, async (req, res) => {
    const allPackages = await storage.getPackages();
    res.json(allPackages);
  });

  app.get(api.events.list.path, async (req, res) => {
    const allEvents = await storage.getEvents();
    res.json(allEvents);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      // Coerce the date and guests field to the correct type for the schema
      const schemaWithCoercion = api.bookings.create.input.extend({
        date: z.coerce.date(),
        guests: z.coerce.number(),
        packageId: z.coerce.number()
      });
      const input = schemaWithCoercion.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Optional: Seed the database on startup if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingAttractions = await storage.getAttractions();
  if (existingAttractions.length === 0) {
    const { db } = await import("./db");
    const { attractions, packages, events } = await import("@shared/schema");

    // Insert sample attractions
    await db.insert(attractions).values([
      {
        name: "Dragon Force",
        description: "Experience the thrilling twists and turns of the mighty Dragon Force roller coaster.",
        type: "ride",
        category: "thrill",
        minHeight: 140,
        image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9"
      },
      {
        name: "Monster Ride",
        description: "A wild spinning adventure that will leave you dizzy with excitement.",
        type: "ride",
        category: "thrill",
        minHeight: 130,
        image: "https://images.unsplash.com/photo-1533514088921-2fc5e1104e6c"
      },
      {
        name: "Air Trance",
        description: "Soar high above the park and take in the breathtaking views.",
        type: "ride",
        category: "family",
        minHeight: 120,
        image: "https://images.unsplash.com/photo-1505531238466-9ab5d43e5c9b"
      },
      {
        name: "Horror House",
        description: "Brave the spooky corridors and try to make it out without screaming.",
        type: "ride",
        category: "thrill",
        minHeight: 130,
        image: "https://images.unsplash.com/photo-1518296316260-26462740449a"
      },
      {
        name: "Carnival Games",
        description: "Test your skills at our classic carnival games and win big prizes!",
        type: "game",
        category: "family",
        minHeight: null,
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26"
      }
    ]);

    // Insert sample packages
    await db.insert(packages).values([
      {
        name: "Starter Fun Package",
        description: "Perfect for a quick visit. Includes access to all Balance rides and bonus credit for special attractions.",
        price: 52500, // $525.00 represented in cents, or just EGP 525
        features: ["Access to all Balance rides", "Bonus credit for special attractions", "Valid for 30 days", "Single person entry"],
        popular: false
      },
      {
        name: "Ultimate Thrill Package",
        description: "For the true thrill-seekers. Get maximum ride access, extra bonus credit, and priority access.",
        price: 75000,
        features: ["Maximum ride access", "Extra bonus credit", "Priority access benefits", "Best value for money"],
        popular: true
      }
    ]);

    // Insert sample events
    await db.insert(events).values([
      {
        title: "Summer Splash Festival",
        description: "Join us for our annual summer celebration with water rides, live music, and amazing food.",
        date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        image: "https://images.unsplash.com/photo-1496843916299-5904cb0c8e17"
      },
      {
        title: "Spooky Nights",
        description: "Our park transforms into a haunted wonderland. Special nighttime rides and scare zones.",
        date: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb"
      }
    ]);
  }
}