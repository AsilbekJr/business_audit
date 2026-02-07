import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden selection:bg-primary/30">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[128px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[128px] opacity-40 animate-pulse delay-1000" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-5xl">
        {children}
      </div>
    </div>
  );
};
