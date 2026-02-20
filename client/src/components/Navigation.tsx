import { Link, useLocation } from "wouter";
import { Ticket, Calendar, Mail, MapPin, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: null },
    { href: "/attractions", label: "Rides & Games", icon: <Gamepad2 className="w-4 h-4 mr-2" /> },
    { href: "/packages", label: "Packages", icon: <Ticket className="w-4 h-4 mr-2" /> },
    { href: "/events", label: "Events", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-primary/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Ticket className="w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            FunLand
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center",
              location === link.href 
                ? "bg-primary text-white shadow-md transform scale-105" 
                : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
            )}>
              {link.icon}
              {link.label}
            </Link>
          ))}
          <Link href="/booking" className="ml-4 px-6 py-2 rounded-full bg-secondary text-secondary-foreground font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 transform active:scale-95">
            Book Now!
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Menu className="w-6 h-6 text-primary" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                      "px-4 py-3 rounded-xl text-lg font-semibold transition-colors flex items-center",
                      location === link.href 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground/70 hover:bg-muted"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <Link 
                  href="/booking" 
                  className="mt-4 w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-center shadow-md active:scale-95 transition-transform"
                  onClick={() => setIsOpen(false)}
                >
                  Book Tickets
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
