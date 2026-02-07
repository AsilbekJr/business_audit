import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Progress } from '../components/ui/progress';
import { Card, CardContent } from '../components/ui/card';
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
    onSubmit(formData as AuditInputs);
  };

  const updateField = (key: keyof AuditInputs, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const progressValue = ((currentStep) / steps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="space-y-4">
        <Progress value={progressValue} className="h-2" />
        <div className="flex justify-between px-1">
             {steps.map((step) => (
                <div key={step.id} className={`flex items-center gap-2 text-sm font-medium ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${currentStep >= step.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                        {currentStep > step.id ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                    <span className="hidden md:inline">{step.title}</span>
                </div>
             ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="glass-card min-h-[400px]">
        <CardContent className="p-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="mb-6 space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">{steps[currentStep - 1].title}</h2>
                        <p className="text-muted-foreground">{steps[currentStep - 1].desc}</p>
                    </div>

                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-base">Biznes egasimisiz?</Label>
                                <RadioGroup 
                                    value={formData.isBusinessOwner ? "yes" : "no"} 
                                    onValueChange={(val) => updateField('isBusinessOwner', val === "yes")}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div>
                                        <RadioGroupItem value="yes" id="owner-yes" className="peer sr-only" />
                                        <Label
                                            htmlFor="owner-yes"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center"
                                        >
                                            Ha
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="no" id="owner-no" className="peer sr-only" />
                                        <Label
                                            htmlFor="owner-no"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center"
                                        >
                                            Yo'q
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            
                            <div className="space-y-3">
                                <Label htmlFor="field">Biznesingiz qaysi sohada?</Label>
                                <Input 
                                    id="field"
                                    placeholder="Masalan: O'quv markazi, Kiyim do'koni..."
                                    value={formData.field || ''}
                                    onChange={(e) => updateField('field', e.target.value)}
                                    className="h-12 text-lg bg-background/50"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-base">CRM tizimi bormi?</Label>
                                    <RadioGroup 
                                        value={formData.hasCrm ? "yes" : "no"} 
                                        onValueChange={(val) => updateField('hasCrm', val === "yes")}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="crm-yes" />
                                            <Label htmlFor="crm-yes">Mavjud</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="crm-no" />
                                            <Label htmlFor="crm-no">Yo'q</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-base">Sotuv bo'limi bormi?</Label>
                                     <RadioGroup 
                                        value={formData.hasSalesTeam ? "yes" : "no"} 
                                        onValueChange={(val) => updateField('hasSalesTeam', val === "yes")}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="sales-yes" />
                                            <Label htmlFor="sales-yes">Ha</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="sales-no" />
                                            <Label htmlFor="sales-no">Yo'q</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="space-y-3">
                                 <Label className="text-base">Ijtimoiy tarmoqlar holati?</Label>
                                 <div className="grid grid-cols-3 gap-4">
                                    {(['good', 'bad', 'none'] as const).map((status) => (
                                        <Button
                                            key={status}
                                            type="button"
                                            variant={formData.socialMediaStatus === status ? 'default' : 'outline'}
                                            onClick={() => updateField('socialMediaStatus', status)}
                                            className="h-12 capitalize"
                                        >
                                            {status === 'good' ? "Zo'r" : status === 'bad' ? "O'rtacha" : "Yo'q"}
                                        </Button>
                                    ))}
                                 </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="platform">Asosiy reklama platformangiz?</Label>
                                <Input 
                                    id="platform"
                                    placeholder="Instagram, Facebook, Google..."
                                    value={formData.platform || ''}
                                    onChange={(e) => updateField('platform', e.target.value)}
                                    className="h-12 bg-background/50"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="revenue">Oylik DAROMAD maqsadingiz? ($)</Label>
                                <Input 
                                    id="revenue"
                                    type="number"
                                    placeholder="10000"
                                    value={formData.monthlyRevenueGoal || ''}
                                    onChange={(e) => updateField('monthlyRevenueGoal', Number(e.target.value))}
                                    className="h-12 text-lg bg-background/50 font-mono"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="check">O'rtacha chek miqdori? ($)</Label>
                                <Input 
                                    id="check"
                                    type="number"
                                    placeholder="60"
                                    value={formData.avgCheck || ''}
                                    onChange={(e) => updateField('avgCheck', Number(e.target.value))}
                                    className="h-12 text-lg bg-background/50 font-mono"
                                />
                            </div>
                             <div className="space-y-3">
                                <Label htmlFor="conversion">Sotuv konversiyasi (%)</Label>
                                <Input 
                                    id="conversion"
                                    type="number"
                                    placeholder="30"
                                    value={formData.conversionRate || ''}
                                    onChange={(e) => updateField('conversionRate', Number(e.target.value))}
                                    className="h-12 text-lg bg-background/50 font-mono"
                                />
                            </div>
                        </div>
                    )}

                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button 
                    variant="ghost" 
                    onClick={handleBack} 
                    disabled={currentStep === 1}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Ortga
                </Button>
                <Button onClick={handleNext} variant="gradient" size="lg" className="px-8">
                    {currentStep === 3 ? 'Auditni Yakunlash' : 'Keyingisi'}
                    {currentStep !== 3 && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
