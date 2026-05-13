import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Calculator } from 'lucide-react';

export default function App() {
  const [valorStr, setValorStr] = useState<string>('1150');
  // Substitui vírgula por ponto para parsing adequado do JS
  const valor = parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) || 0;

  // Aceita números e a primeira vírgula digitada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Remove qualquer caractere que não seja número ou vírgula/ponto
    val = val.replace(/[^0-9.,]/g, '');
    // Troca pontos por vírgulas para padronizar visualização
    val = val.replace(/\./g, ',');
    
    // Garante apenas uma vírgula
    const parts = val.split(',');
    if (parts.length > 2) {
      val = parts[0] + ',' + parts.slice(1).join('');
    }
    
    setValorStr(val);
  };

  return (
    // fixed, inset-0 evitam rolagem na webview, bom para app em tela cheia no touch
    <div className="fixed inset-0 flex items-center justify-center p-4 font-sans select-none overflow-hidden touch-none" style={{ background: 'radial-gradient(circle, #330000, #000000)' }}>
      <div className="w-full h-full max-h-[700px] max-w-[380px] p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-[0_0_20px_rgba(255,0,0,0.5)] flex flex-col items-center text-center text-white relative overflow-y-auto hide-scrollbar">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/20 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-2 relative z-10 text-red-500">
          <Calculator size={24} />
        </div>
        
        <h2 className="text-[1.4rem] font-bold uppercase tracking-widest text-white drop-shadow-[0_0_10px_#ff0000] mb-5 relative z-10">
          MUMBUCA EXCHANGE
        </h2>
        
        <div className="w-full mb-6 relative z-10 shrink-0">
          <label className="block text-[0.8rem] mb-2 text-[#ffcccc] uppercase tracking-wide">Quanto deseja trocar?</label>
          <div className="flex justify-center items-center bg-[#1a0000]/50 border border-red-500/50 rounded-[15px] shadow-[inset_0_0_10px_rgba(255,0,0,0.2)] focus-within:ring-2 focus-within:ring-red-500/50 transition-all p-4">
            <span className="text-red-400 text-[1.4rem] font-medium mr-2">R$</span>
            <input 
              type="text" 
              inputMode="decimal"
              value={valorStr} 
              onChange={handleInputChange} 
              placeholder="0,00"
              className="bg-transparent text-white text-[1.6rem] outline-none font-sans font-bold m-0 p-0 text-left w-full h-[30px]"
            />
          </div>
        </div>

        <div className="w-full space-y-3 relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-4">
          <OptionCard dia="HOJE" taxa={14} valorTotal={valor} />
          <OptionCard dia="AMANHÃ" taxa={13} valorTotal={valor} />
          <OptionCard dia="DEPOIS DE AMANHÃ" taxa={12} valorTotal={valor} />
        </div>

        <div className="mt-auto font-bold text-[0.65rem] tracking-[3px] text-red-500/60 uppercase relative z-10 py-2">
          MARICÁ TECH SYSTEM
        </div>
      </div>
    </div>
  );
}

function OptionCard({ dia, taxa, valorTotal }: { dia: string, taxa: number, valorTotal: number }) {
  const [copied, setCopied] = useState(false);
  
  const valorFinal = valorTotal * (1 - (taxa / 100));
  const perda = valorTotal - valorFinal;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleCopy = () => {
    // Tenta usar a API do clipboard (em webviews pode precisar de ajustes se nÃ£o for HTTPS, mas na Vercel funciona perfeitamente)
    navigator.clipboard.writeText(formatCurrency(valorFinal));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="bg-red-500/5 border border-red-500/20 p-4 rounded-[16px] relative overflow-hidden backdrop-blur-sm group flex flex-col text-left"
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-bold text-[#ff4d4d] text-[0.7rem] tracking-widest uppercase">
          {dia} <span className="opacity-70">(-{taxa}%)</span>
        </span>
        
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-full bg-red-900/30 text-red-300 hover:bg-red-500/40 hover:text-white transition-colors active:scale-90"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>

      <span className="text-[1.8rem] font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] leading-tight mb-1">
        {formatCurrency(valorFinal)}
      </span>
      
      <div className="flex items-center text-[0.7rem] text-white/50 font-medium">
        Você perde: <span className="text-red-400 ml-1">{formatCurrency(perda)}</span>
      </div>
    </motion.div>
  );
}

