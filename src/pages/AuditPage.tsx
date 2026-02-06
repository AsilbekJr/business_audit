import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import type { AuditInputs } from '../logic/auditCalculator';

interface AuditPageProps {
  onSubmit: (data: AuditInputs) => void;
}

const steps = [
    { id: 1, title: "Biznesingiz haqida", desc: "Asosiy ma'lumotlar" },
    { id: 2, title: "Tizim va Marketing", desc: "CRM va Ijtimoiy tarmoqlar" },
    { id: 3, title: "Moliyaviy Maqsadlar", desc: "Daromad va raqamlar" }
];

export const AuditPage = ({ onSubmit }: AuditPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AuditInputs>>({
    isBusinessOwner: true,
    hasCrm: false,
    hasSalesTeam: false,
    socialMediaStatus: 'good',
    conversionRate: 30, // Default based on prompt
  });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(curr => curr + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(curr => curr - 1);
  };

  const handleSubmit = () => {
    // Validate required fields if necessary
    // For now assuming all filled or defaults are fine
    onSubmit(formData as AuditInputs);
  };

  const updateField = (key: keyof AuditInputs, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-white/5 -z-10 rounded-full" />
        <div 
            className="absolute left-0 top-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center bg-background px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    currentStep >= step.id ? 'border-primary bg-primary text-white' : 'border-white/20 bg-surface text-gray-500'
                }`}>
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className={`text-xs mt-2 font-medium ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}>
                    {step.title}
                </span>
            </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="glass-card min-h-[400px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
                    <p className="text-gray-400">{steps[currentStep - 1].desc}</p>
                </div>

                {currentStep === 1 && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Biznes egasimisiz?</label>
                            <div className="flex gap-4">
                                <Button 
                                    type="button"
                                    variant={formData.isBusinessOwner ? 'primary' : 'secondary'} 
                                    onClick={() => updateField('isBusinessOwner', true)}
                                    className="flex-1"
                                >
                                    Ha
                                </Button>
                                <Button 
                                    type="button"
                                    variant={!formData.isBusinessOwner ? 'primary' : 'secondary'} 
                                    onClick={() => updateField('isBusinessOwner', false)}
                                    className="flex-1"
                                >
                                    Yo'q
                                </Button>
                            </div>
                        </div>
                        <Input 
                            label="Biznesingiz qaysi sohada?" 
                            placeholder="Masalan: O'quv markazi, Kiyim do'koni..."
                            value={formData.field || ''}
                            onChange={(e) => updateField('field', e.target.value)}
                        />
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">CRM tizimi bormi?</label>
                                <div className="flex gap-2">
                                    <Button 
                                        type="button"
                                        variant={formData.hasCrm ? 'primary' : 'secondary'} 
                                        onClick={() => updateField('hasCrm', true)}
                                        className="flex-1"
                                    >
                                        Mavjud
                                    </Button>
                                    <Button 
                                        type="button"
                                        variant={!formData.hasCrm ? 'primary' : 'secondary'} 
                                        onClick={() => updateField('hasCrm', false)}
                                        className="flex-1"
                                    >
                                        Yo'q
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Sotuv bo'limi bormi?</label>
                                <div className="flex gap-2">
                                    <Button 
                                        type="button"
                                        variant={formData.hasSalesTeam ? 'primary' : 'secondary'} 
                                        onClick={() => updateField('hasSalesTeam', true)}
                                        className="flex-1"
                                    >
                                        Ha
                                    </Button>
                                    <Button 
                                        type="button"
                                        variant={!formData.hasSalesTeam ? 'primary' : 'secondary'} 
                                        onClick={() => updateField('hasSalesTeam', false)}
                                        className="flex-1"
                                    >
                                        Yo'q
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-sm text-gray-400">Ijtimoiy tarmoqlar holati?</label>
                             <div className="grid grid-cols-3 gap-2">
                                {(['good', 'bad', 'none'] as const).map((status) => (
                                    <Button
                                        key={status}
                                        type="button"
                                        className="capitalize"
                                        variant={formData.socialMediaStatus === status ? 'primary' : 'secondary'}
                                        onClick={() => updateField('socialMediaStatus', status)}
                                    >
                                        {status === 'good' ? "Zo'r" : status === 'bad' ? "O'rtacha" : "Yo'q"}
                                    </Button>
                                ))}
                             </div>
                        </div>

                        <Input 
                            label="Asosiy reklama platformangiz?" 
                            placeholder="Instagram, Facebook, Google..."
                            value={formData.platform || ''}
                            onChange={(e) => updateField('platform', e.target.value)}
                        />
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-4">
                        <Input 
                            type="number"
                            label="Oylik DAROMAD maqsadingiz? ($)" 
                            placeholder="10000"
                            value={formData.monthlyRevenueGoal || ''}
                            onChange={(e) => updateField('monthlyRevenueGoal', Number(e.target.value))}
                        />
                        <Input 
                            type="number"
                            label="O'rtacha chek miqdori? ($)" 
                            placeholder="60"
                            value={formData.avgCheck || ''}
                            onChange={(e) => updateField('avgCheck', Number(e.target.value))}
                        />
                         <Input 
                            type="number"
                            label="Sotuv konversiyasi (%)" 
                            placeholder="30"
                            value={formData.conversionRate || ''}
                            onChange={(e) => updateField('conversionRate', Number(e.target.value))}
                        />
                    </div>
                )}

            </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <Button 
                variant="ghost" 
                onClick={handleBack} 
                disabled={currentStep === 1}
                className="text-gray-400 hover:text-white"
            >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Ortga
            </Button>
            <Button onClick={handleNext} variant="gradient">
                {currentStep === 3 ? 'Auditni Yakunlash' : 'Keyingisi'}
                {currentStep !== 3 && <ChevronRight className="w-5 h-5 ml-1" />}
            </Button>
        </div>
      </div>
    </div>
  );
};
