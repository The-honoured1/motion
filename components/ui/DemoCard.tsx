"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  className?: string;
}

export function DemoCard({ title, description, category, image, className }: DemoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass transition-all duration-500 hover:glow-primary",
        className
      )}
    >
      <div className="aspect-video w-full overflow-hidden bg-muted relative">
        {/* Placeholder for dynamic animation or image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
             <ArrowUpRight className="text-primary w-8 h-8" />
           </div>
        </div>
      </div>
      
      <div className="p-6">
        <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2 block">
          {category}
        </span>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
