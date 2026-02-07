
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight, BarChart3, TrendingUp, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeProps {
  onStart: () => void;
}

export const Home = ({ onStart }: HomeProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm md:text-base text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Professional Business Audit
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Aniqlik va <span className="text-gradient">Kelajak</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Marketing va moliyaviy holatingizni to‘liq tahlil qiling. 
          Biznesingizdagi "teshik"larni toping va o‘sish nuqtalarini aniqlang.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {[
            { icon: BarChart3, title: "Marketing Audit", desc: "Reklama samaradorligini o'lchash" },
            { icon: TrendingUp, title: "Moliyaviy Reja", desc: "Aniq byudjet va daromad prognozi" },
            { icon: ShieldAlert, title: "Xavf Tahlili", desc: "Biznesingizdagi zaif nuqtalar" }
        ].map((item, idx) => (
             <Card key={idx} className="glass-card hover:bg-white/10 transition-colors border-white/5">
                <CardHeader>
                    <div className="flex justify-center mb-2">
                        <item.icon className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
             </Card>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button size="lg" variant="gradient" onClick={onStart} className="group text-lg px-8 h-14">
          Auditni Boshlash
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  );
};
