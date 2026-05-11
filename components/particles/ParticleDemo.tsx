"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParticleDemoProps {
  title: string;
  description: string;
  code: string;
  component: React.ReactNode;
}

export function ParticleDemo({ title, description, code, component }: ParticleDemoProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primary">{title}</h2>
          <p className="text-white/60 leading-relaxed">{description}</p>
        </div>

        <div className="relative aspect-video glass rounded-2xl overflow-hidden group">
          {component}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="glass p-2 rounded-lg text-primary hover:bg-primary hover:text-black transition-all">
              <Play size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Source Code</span>
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-primary transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
        
        <div className="flex-1 glass rounded-2xl p-6 font-mono text-xs overflow-auto max-h-[400px] scrollbar-hide">
          <pre className="text-white/80">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
