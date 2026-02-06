import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[128px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[128px] opacity-40 animate-pulse delay-1000" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
};
