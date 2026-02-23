import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Ticket, Star, CalendarDays, ShieldAlert, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAttractions } from "@/hooks/use-attractions";
import heroVideo from "@assets/Background_Reel_2_1771725606869.mp4";
import axisImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.4_1771725386466.jpeg";
import tasweraImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.17__1771725386467.jpeg";
import koveImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.17_A_1771725386468.jpeg";
import filtrdImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.17_AM_1771725386468.jpeg";
import generalRulesImg from "@assets/General_Rules_English_1771806156439.jpg";
import disclaimerImg from "@assets/3-_90_cm_X_130_cm_1_copy_1771806156440.jpg";

export default function Home() {
  const topThrills = [
    {
      id: "axis",
      title: "Axis",
      category: "Restaurant",
      description: "A premium amusement park dining experience with a modern twist on classic favorites.",
      image: axisImg
    },
    {
      id: "taswera",
      title: "Taswera",
      category: "Photography Experience",
      description: "Capture your magical moments in our fun, immersive photo-taking zones throughout the park.",
      image: tasweraImg
    },
    {
      id: "kove",
      title: "Kove",
      category: "Cafe",
      description: "A modern sanctuary offering refreshing beverages and light bites in a vibrant atmosphere.",
      image: koveImg
    },
    {
      id: "filtrd",
      title: "Filtrd",
      category: "Cafe",
      description: "Premium coffee-focused experience for those who appreciate the finer notes of a perfect brew.",
      image: filtrdImg
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-background/90 z-10" />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
              Let The Fun <span className="text-secondary">Begun</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
              Experience heart-pounding rides, magical moments, and unforgettable adventures for the whole family.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" className="rounded-full text-lg h-14 px-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  Get Tickets <Ticket className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/attractions">
                <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-10 bg-white/10 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm font-semibold">
                  View Rides <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Thrill Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Top Thrills</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our premium dining, coffee, and immersive experiences that make every visit extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topThrills.map((item, i) => (
              <Link key={item.id} href={`/top-thrill/${item.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer relative rounded-3xl overflow-hidden aspect-[3/4] shadow-lg flex flex-col h-full bg-card border border-border/50"
                >
                  <div className="relative h-2/3 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-display font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{item.description}</p>
                    <div className="mt-auto">
                      <Button variant="outline" size="sm" className="rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Explore More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
                Upcoming Events
              </h2>
              <p className="text-primary-foreground/90 text-xl mb-8 leading-relaxed">
                From summer concerts to spooky Halloween nights, there's always something happening at ElMalahy. Don't miss out on the magic!
              </p>
              <div className="flex gap-4">
                <Link href="/events">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full h-14 px-8 text-lg">
                    See Calendar <CalendarDays className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent opacity-50 rounded-3xl z-10" />
              <img 
                /* Concert crowd at night */
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
                alt="Events" 
                className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-secondary/10 border border-secondary/20 text-center hover:bg-secondary/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">VIP Experiences</h3>
              <p className="text-muted-foreground">Skip lines and get exclusive access with our VIP passes.</p>
            </div>
            <div className="p-8 rounded-3xl bg-accent/10 border border-accent/20 text-center hover:bg-accent/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Group Discounts</h3>
              <p className="text-muted-foreground">Perfect for schools, companies, and large family reunions.</p>
            </div>
            <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 text-center hover:bg-primary/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CalendarDays className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Seasonal Passes</h3>
              <p className="text-muted-foreground">Unlimited fun all year round for one low price.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Disclaimer Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Safety & Guidelines</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Please review our general rules and disclaimer to ensure a safe and magical experience for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-display font-bold text-primary">General Rules</h3>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group-hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src={generalRulesImg} 
                  alt="General Rules" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-6 flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-secondary" />
                <h3 className="text-2xl font-display font-bold text-secondary">Disclaimer</h3>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group-hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src={disclaimerImg} 
                  alt="Disclaimer" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready for the Adventure of a Lifetime?
            </h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 font-medium leading-relaxed">
              Don't wait for the weekend—magical memories are being made every single day at ElMalahy!
            </p>
            <Link href="/booking">
              <Button size="lg" className="h-16 px-10 rounded-full bg-secondary text-secondary-foreground text-xl font-bold shadow-2xl hover:shadow-secondary/50 hover:scale-110 transition-all duration-500 group">
                BOOK YOUR ADVENTURE NOW
                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
