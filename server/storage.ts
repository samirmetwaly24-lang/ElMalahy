import { db } from "./db";
import {
  attractions, packages, events, bookings, contactMessages,
  type Attraction, type Package, type Event, type Booking, type ContactMessage,
  type InsertAttraction, type InsertPackage, type InsertEvent, type InsertBooking, type InsertContactMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAttractions(): Promise<Attraction[]>;
  getPackages(): Promise<Package[]>;
  getEvents(): Promise<Event[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getAttractions(): Promise<Attraction[]> {
    return await db.select().from(attractions);
  }

  async getPackages(): Promise<Package[]> {
    return await db.select().from(packages);
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();