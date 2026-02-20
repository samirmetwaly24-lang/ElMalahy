import { type Attraction } from "@shared/schema";
import { Ruler, Sparkles, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface AttractionCardProps {
  attraction: Attraction;
  index: number;
}

export function AttractionCard({ attraction, index }: AttractionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 mb-2">
            <Badge variant="secondary" className="font-bold text-xs uppercase tracking-wider">
              {attraction.type}
            </Badge>
            <Badge variant="outline" className="text-white border-white/50 bg-black/20 backdrop-blur-sm">
              {attraction.category}
            </Badge>
          </div>
          <h3 className="text-2xl font-display font-bold text-white text-shadow">{attraction.name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-muted-foreground mb-6 line-clamp-3">{attraction.description}</p>
        
        <div className="flex items-center gap-4 text-sm font-medium text-foreground/80">
          {attraction.minHeight && (
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
              <Ruler className="w-4 h-4 text-primary" />
              <span>Min: {attraction.minHeight}cm</span>
            </div>
          )}
          {attraction.type === 'game' && (
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
              <Gamepad2 className="w-4 h-4 text-accent" />
              <span>Skill Game</span>
            </div>
          )}
          {attraction.category === 'thrill' && (
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>High Thrill</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
