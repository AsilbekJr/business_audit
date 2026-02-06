import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, CheckCircle, TrendingUp, Users, RefreshCw } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
            📊 MARKETING & BUDJET AUDITI
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Sizning Biznes Auditingiz</h2>
        <p className="text-gray-400">{data.field} — {data.platform}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Status */}
        <Card className="glass-card" title="🏥 Biznes Holati">
            <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">CRM Tizimi</span>
                    <span className={data.hasCrm ? 'text-green-400 flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
                        {data.hasCrm ? <CheckCircle className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
                        {data.hasCrm ? 'Mavjud' : "Yo'q"}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Sotuv Bo'limi</span>
                    <span className={data.hasSalesTeam ? 'text-green-400 flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
                        {data.hasSalesTeam ? <CheckCircle className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
                        {data.hasSalesTeam ? 'Mavjud' : "Yo'q"}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Ijtimoiy Tarmoq</span>
                    <span className={data.socialMediaStatus === 'good' ? 'text-green-400' : 'text-yellow-400'}>
                        {data.socialMediaStatus === 'good' ? "Zo'r" : data.socialMediaStatus === 'bad' ? "O'rtacha" : "Yo'q"}
                    </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">Xavf Darajasi</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${riskLevel === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                        {riskLevel === 'high' ? 'YUQORI 🔴' : 'PAST 🟢'}
                    </span>
                </div>
            </div>
        </Card>

        {/* Financial Targets */}
        <Card className="glass-card" title="🎯 Moliyaviy Maqsad">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Oylik Daromad</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(data.monthlyRevenueGoal)}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">O'rtacha Chek</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(data.avgCheck)}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl col-span-2 flex justify-between items-center">
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Kerakli Mijozlar</div>
                        <div className="text-2xl font-bold text-primary">{results.requiredClients} ta</div>
                    </div>
                    <Users className="text-primary/20 w-10 h-10" />
                </div>
            </div>
        </Card>
      </div>

      {/* Funnel & Budget */}
      <Card className="glass-card border-l-4 border-l-gold" title="📈 Funnel & Byudjet">
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <div className="text-sm text-gray-400">Sotuv Konversiyasi</div>
                    <div className="text-xl font-bold">{data.conversionRate}%</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm text-gray-400">Kerakli Lidlar</div>
                    <div className="text-xl font-bold text-accent">{results.requiredLeads} ta</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm text-gray-400">Lid Narxi (Tahminiy)</div>
                    <div className="text-xl font-bold">${results.cplMin} - ${results.cplMax}</div>
                </div>
            </div>
            
            <div className="h-px bg-white/10 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Minimal Byudjet</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(results.minBudget)}</div>
                </div>
                <div className="bg-primary/20 p-4 rounded-xl border border-primary/30">
                    <div className="text-sm text-primary-200 mb-1">Optimal Byudjet</div>
                    <div className="text-2xl font-bold text-primary-100">{formatCurrency(results.optimalBudget)}</div>
                </div>
                <div className={`p-4 rounded-xl border ${riskLevel === 'high' ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="text-sm text-gray-400 mb-1">Real Byudjet (Xavf bilan)</div>
                    <div className={`text-2xl font-bold ${riskLevel === 'high' ? 'text-red-400' : 'text-white'}`}>
                        {formatCurrency(results.realBudget)}
                    </div>
                </div>
            </div>
         </div>
      </Card>

      {/* Recommendations */}
      {riskLevel === 'high' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20"
          >
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Muhim Ogohlantirishlar (Samaradorlik Jarimasi)
            </h3>
            <div className="space-y-3">
                {results.penalties.noCrm && (
                    <div className="flex items-start gap-3 text-gray-300">
                        <span className="text-red-400 font-bold">❌ CRM yo'qligi:</span>
                        <span>Lidlar yo'qolishi va nazoratsizlik sababli reklama byudjeti +20% ga oshadi.</span>
                    </div>
                )}
                {results.penalties.noSalesTeam && (
                    <div className="flex items-start gap-3 text-gray-300">
                        <span className="text-red-400 font-bold">❌ Sotuvchilar yo'qligi:</span>
                        <span>Mijozlar bilan ishlash sifati tushib, konversiya pasayadi (+20% xarajat).</span>
                    </div>
                )}
                <div className="mt-4 pt-4 border-t border-red-500/20 text-sm text-red-300 font-medium">
                    Jami yo'qotish ehtimoli: {results.penalties.totalPenaltyPercent}% qimmatroq lid narxi.
                </div>
            </div>
          </motion.div>
      )}

      {/* Action Plan */}
      <Card className="glass-card" title="✅ Tavsiyalar">
         <ul className="space-y-4">
            <li className="flex gap-3 items-start">
                <div className="bg-primary/20 p-1 rounded text-primary mt-1"><CheckCircle className="w-4 h-4" /></div>
                <span className="text-gray-300">
                    <strong>CRM Tizimi (AmoCRM/Bitrix24) o'rnating:</strong> Bu byudjetni {results.penalties.noCrm ? '20%' : ''} tejaydi va mijozlar bazasini shakllantiradi.
                </span>
            </li>
            <li className="flex gap-3 items-start">
                <div className="bg-primary/20 p-1 rounded text-primary mt-1"><Users className="w-4 h-4" /></div>
                <span className="text-gray-300">
                   <strong>Sotuv Menejeri:</strong> Lidlar kuyib ketmasligi uchun alohida mutaxassis yollang.
                </span>
            </li>
            <li className="flex gap-3 items-start">
                <div className="bg-primary/20 p-1 rounded text-primary mt-1"><TrendingUp className="w-4 h-4" /></div>
                <span className="text-gray-300">
                   <strong>Test Reklama:</strong> Reklamani kichik summa (${Math.round(results.cplMax * 50)}) bilan boshlab, real CPL ni aniqlang.
                </span>
            </li>
         </ul>
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
