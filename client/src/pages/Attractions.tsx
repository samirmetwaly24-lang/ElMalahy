import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAttractions } from "@/hooks/use-attractions";
import { AttractionCard } from "@/components/AttractionCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Attractions() {
  const { data: attractions, isLoading } = useAttractions();
  const [filter, setFilter] = useState<'all' | 'thrill' | 'family' | 'kids' | 'game'>('all');

  const filteredAttractions = attractions?.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'game') return a.type === 'game';
    return a.category === filter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold text-primary mb-6"
          >
            Rides & Games
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            From heart-stopping coasters to classic carnival games, we have something for everyone!
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'all', label: 'All Fun' },
              { id: 'thrill', label: 'Thrill Rides' },
              { id: 'family', label: 'Family Fun' },
              { id: 'kids', label: 'For Kids' },
              { id: 'game', label: 'Games' },
            ].map((f) => (
              <Button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                variant={filter === f.id ? "default" : "outline"}
                className={`rounded-full px-6 transition-all duration-300 ${
                  filter === f.id 
                    ? "bg-primary text-white shadow-lg scale-105" 
                    : "hover:bg-primary/10"
                }`}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions?.map((attraction, index) => (
              <AttractionCard key={attraction.id} attraction={attraction} index={index} />
            ))}
            
            {filteredAttractions?.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl font-display text-muted-foreground">No attractions found in this category yet!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
