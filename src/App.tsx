import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [valorStr, setValorStr] = useState<string>('1150');
  const valor = parseFloat(valorStr.replace(',', '.')) || 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir apenas números e vírgula/ponto
    const val = e.target.value.replace(/[^0-9.,]/g, '');
    setValorStr(val);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans select-none" style={{ background: 'radial-gradient(circle, #330000, #000000)' }}>
      <div className="w-full max-w-[380px] p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-[0_0_15px_rgba(255,0,0,0.7)] text-center text-white relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-[40px] pointer-events-none"></div>

        <h2 className="text-[1.5rem] font-bold uppercase tracking-widest text-white drop-shadow-[0_0_10px_#ff0000] mb-5 relative z-10">
          MUMBUCA EXCHANGE
        </h2>
        
        <div className="mb-6 relative z-10">
          <label className="block text-[0.8rem] mb-2 text-[#ffcccc] uppercase tracking-wide">Quanto deseja trocar?</label>
          <div className="flex justify-center items-center bg-white/5 border border-red-500 rounded-[10px] shadow-[inset_0_0_5px_#ff0000] focus-within:ring-2 focus-within:ring-red-500/50 transition-all p-3">
            <span className="text-white/70 text-[1.2rem] font-medium mr-2">R$</span>
            <input 
              type="text" 
              inputMode="decimal"
              value={valorStr} 
              onChange={handleInputChange} 
              placeholder="0,00"
              className="bg-transparent text-white text-[1.2rem] outline-none font-sans m-0 p-0 text-left min-w-[50px]"
              style={{ 
                width: `${Math.max(4, valorStr.length + 1)}ch`
              }}
            />
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <OptionCard 
            dia="HOJE" 
            taxa={14} 
            valorTotal={valor} 
          />
          <OptionCard 
            dia="AMANHÃ" 
            taxa={13} 
            valorTotal={valor} 
          />
          <OptionCard 
            dia="DEPOIS DE AMANHÃ" 
            taxa={12} 
            valorTotal={valor} 
          />
        </div>

        <div className="mt-5 font-bold text-[0.7rem] tracking-[2px] text-[#ff0000] uppercase relative z-10">
          MARICÁ TECH SYSTEM
        </div>
      </div>
    </div>
  );
}

function OptionCard({ dia, taxa, valorTotal }: { dia: string, taxa: number, valorTotal: number }) {
  const valorFinal = valorTotal * (1 - (taxa / 100));
  const perda = valorTotal - valorFinal;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-red-500/10 hover:bg-red-500/20 border border-white/20 p-[15px] rounded-[15px] transition-all backdrop-blur-sm group"
    >
      <span className="block font-bold text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors text-[0.75rem] tracking-wide uppercase mb-1">
        {dia} (-{taxa}%)
      </span>
      <span className="block text-[1.6rem] font-bold text-white drop-shadow-[0_0_8px_#ffffff] leading-tight">
        {formatCurrency(valorFinal)}
      </span>
      <span className="text-[0.7rem] text-white/60 font-medium block mt-[5px]">
        Você perde: {formatCurrency(perda)}
      </span>
    </motion.div>
  );
}

