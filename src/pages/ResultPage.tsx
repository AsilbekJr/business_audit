
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { AlertTriangle, CheckCircle, Users, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AuditInputs, AuditResults } from '../logic/auditCalculator';

interface ResultPageProps {
  data: AuditInputs;
  results: AuditResults;
  onRestart: () => void;
}

export const ResultPage = ({ data, results, onRestart }: ResultPageProps) => {
  const riskLevel = results.penalties.totalPenaltyPercent > 0 ? 'high' : 'low';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            📊 MARKETING & BUDJET AUDITI
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Sizning Biznes Auditingiz</h2>
        <p className="text-muted-foreground">{data.field} — {data.platform}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Status */}
        <Card className="glass-card">
            <CardHeader>
                <CardTitle>🏥 Biznes Holati</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">CRM Tizimi</span>
                    <span className={data.hasCrm ? 'text-green-500 flex items-center gap-1' : 'text-destructive flex items-center gap-1'}>
                        {data.hasCrm ? <CheckCircle className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
                        {data.hasCrm ? 'Mavjud' : "Yo'q"}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Sotuv Bo'limi</span>
                    <span className={data.hasSalesTeam ? 'text-green-500 flex items-center gap-1' : 'text-destructive flex items-center gap-1'}>
                        {data.hasSalesTeam ? <CheckCircle className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
                        {data.hasSalesTeam ? 'Mavjud' : "Yo'q"}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Ijtimoiy Tarmoq</span>
                    <span className={data.socialMediaStatus === 'good' ? 'text-green-500' : 'text-yellow-500'}>
                        {data.socialMediaStatus === 'good' ? "Zo'r" : data.socialMediaStatus === 'bad' ? "O'rtacha" : "Yo'q"}
                    </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground">Xavf Darajasi</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${riskLevel === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-500'}`}>
                        {riskLevel === 'high' ? 'YUQORI 🔴' : 'PAST 🟢'}
                    </span>
                </div>
            </CardContent>
        </Card>

        {/* Financial Targets */}
        <Card className="glass-card">
            <CardHeader>
                <CardTitle>🎯 Moliyaviy Maqsad</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 p-4 rounded-xl">
                        <div className="text-sm text-muted-foreground mb-1">Oylik Daromad</div>
                        <div className="text-2xl font-bold">{formatCurrency(data.monthlyRevenueGoal)}</div>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-xl">
                        <div className="text-sm text-muted-foreground mb-1">O'rtacha Chek</div>
                        <div className="text-2xl font-bold">{formatCurrency(data.avgCheck)}</div>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-xl col-span-2 flex justify-between items-center">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Kerakli Mijozlar</div>
                            <div className="text-2xl font-bold text-primary">{results.requiredClients} ta</div>
                        </div>
                        <Users className="text-primary/20 w-10 h-10" />
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Funnel & Budget */}
      <Card className="glass-card border-l-4 border-l-yellow-500">
         <CardHeader>
            <CardTitle>📈 Funnel & Byudjet</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Sotuv Konversiyasi</div>
                    <div className="text-xl font-bold">{data.conversionRate}%</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Kerakli Lidlar</div>
                    <div className="text-xl font-bold text-accent">{results.requiredLeads} ta</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Lid Narxi (Tahminiy)</div>
                    <div className="text-xl font-bold">${results.cplMin} - ${results.cplMax}</div>
                </div>
            </div>
            
            <Separator className="bg-white/10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary/30 p-4 rounded-xl border border-white/5">
                    <div className="text-sm text-muted-foreground mb-1">Minimal Byudjet</div>
                    <div className="text-2xl font-bold text-foreground">{formatCurrency(results.minBudget)}</div>
                </div>
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                    <div className="text-sm text-primary mb-1">Optimal Byudjet</div>
                    <div className="text-2xl font-bold text-primary">{formatCurrency(results.optimalBudget)}</div>
                </div>
                <div className={`p-4 rounded-xl border ${riskLevel === 'high' ? 'bg-destructive/10 border-destructive/20' : 'bg-secondary/30 border-white/5'}`}>
                    <div className="text-sm text-muted-foreground mb-1">Real Byudjet (Xavf bilan)</div>
                    <div className={`text-2xl font-bold ${riskLevel === 'high' ? 'text-destructive' : 'text-foreground'}`}>
                        {formatCurrency(results.realBudget)}
                    </div>
                </div>
            </div>
         </CardContent>
      </Card>

      {/* Recommendations */}
      {riskLevel === 'high' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-destructive/10 border border-destructive/20"
          >
            <h3 className="text-lg font-bold text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Muhim Ogohlantirishlar (Samaradorlik Jarimasi)
            </h3>
            <div className="space-y-3">
                {results.penalties.noCrm && (
                    <div className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-destructive font-bold">❌ CRM yo'qligi:</span>
                        <span>Lidlar yo'qolishi va nazoratsizlik sababli reklama byudjeti +20% ga oshadi.</span>
                    </div>
                )}
                {results.penalties.noSalesTeam && (
                    <div className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-destructive font-bold">❌ Sotuvchilar yo'qligi:</span>
                        <span>Mijozlar bilan ishlash sifati tushib, konversiya pasayadi (+20% xarajat).</span>
                    </div>
                )}
                <div className="mt-4 pt-4 border-t border-destructive/20 text-sm text-destructive font-medium">
                    Jami yo'qotish ehtimoli: {results.penalties.totalPenaltyPercent}% qimmatroq lid narxi.
                </div>
            </div>
          </motion.div>
      )}

      {/* Action Plan */}
      <Card className="glass-card">
         <CardHeader><CardTitle>✅ Tavsiyalar</CardTitle></CardHeader>
         <CardContent>
            <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                    <div className="bg-primary/20 p-1 rounded text-primary mt-1"><CheckCircle className="w-4 h-4" /></div>
                    <span className="text-muted-foreground">
                        <strong>CRM Tizimi (AmoCRM/Bitrix24) o'rnating:</strong> Bu byudjetni {results.penalties.noCrm ? '20%' : ''} tejaydi va mijozlar bazasini shakllantiradi.
                    </span>
                </li>
                <li className="flex gap-3 items-start">
                    <div className="bg-primary/20 p-1 rounded text-primary mt-1"><Users className="w-4 h-4" /></div>
                    <span className="text-muted-foreground">
                    <strong>Sotuv Menejeri:</strong> Lidlar kuyib ketmasligi uchun alohida mutaxassis yollang.
                    </span>
                </li>
                <li className="flex gap-3 items-start">
                    <div className="bg-primary/20 p-1 rounded text-primary mt-1"><AlertTriangle className="w-4 h-4" /></div>
                    <span className="text-muted-foreground">
                    <strong>Test Reklama:</strong> Reklamani kichik summa (${Math.round(results.cplMax * 50)}) bilan boshlab, real CPL ni aniqlang.
                    </span>
                </li>
            </ul>
         </CardContent>
      </Card>
      
      <div className="flex justify-center pt-8">
        <Button onClick={onRestart} variant="outline" size="lg">
            <RefreshCw className="mr-2 w-5 h-5" />
            Qayta Hisoblash
        </Button>
      </div>
    </div>
  );
};
