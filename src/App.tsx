import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Calculator, Mail, Lock, Eye, EyeOff, LogOut } from 'lucide-react';
import logoImg from './assets/logo1.png';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isLoggedIn ? (
        <LoginScreen key="login" onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <CalculatorScreen key="calculator" onLogout={() => setIsLoggedIn(false)} />
      )}
    </AnimatePresence>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.toLowerCase().includes('gmail.com') && !email.toLowerCase().includes('google')) {
      setError('Por favor, use um e-mail do Google.');
      return;
    }

    if (view === 'forgot') {
      setSuccessMsg('Um e-mail de recuperação foi enviado!');
      return;
    }

    if (password.length >= 4) {
      if (view === 'register') {
        setSuccessMsg('Conta criada com sucesso! Faça login.');
        setView('login');
        setPassword('');
      } else {
        onLogin();
      }
    } else {
      setError('A senha deve ter pelo menos 4 caracteres.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center p-4 font-sans select-none overflow-hidden touch-none" 
      style={{ background: 'radial-gradient(circle, #330000, #000000)' }}
    >
      <div className="w-full h-full max-h-[700px] max-w-[380px] p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-[0_0_20px_rgba(255,0,0,0.5)] flex flex-col items-center text-center text-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/20 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="mt-6 mb-2 w-full flex justify-center relative z-10 flex-col items-center">
          <div className="text-red-500 font-bold text-xl uppercase tracking-widest text-center mb-2">
             PREFEITURA DE MARICÁ<br/>
             <span className="text-white text-lg">MUMBUCA EXCHANGE</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex-1 flex flex-col relative z-10">
          <div className="space-y-4 mb-2">
            <div className="flex flex-col text-left">
              <label className="text-[0.75rem] text-[#ffcccc] ml-2 mb-1 uppercase tracking-wide">E-mail Google</label>
              <div className="flex items-center bg-[#1a0000]/50 border border-red-500/50 rounded-[15px] p-3 focus-within:ring-2 focus-within:ring-red-500/50 transition-all">
                <Mail size={18} className="text-red-400 mr-3" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@gmail.com"
                  className="bg-transparent text-white text-[1rem] outline-none w-full"
                  required
                />
              </div>
            </div>

            {view !== 'forgot' && (
              <div className="flex flex-col text-left">
                <label className="text-[0.75rem] text-[#ffcccc] ml-2 mb-1 uppercase tracking-wide">Senha</label>
                <div className="flex items-center bg-[#1a0000]/50 border border-red-500/50 rounded-[15px] p-3 focus-within:ring-2 focus-within:ring-red-500/50 transition-all">
                  <Lock size={18} className="text-red-400 mr-3" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent text-white text-[1rem] outline-none w-full"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-red-400 hover:text-red-300 ml-2 p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-2 px-1">
              {view === 'login' ? (
                <>
                  <button type="button" onClick={() => setView('forgot')} className="text-red-400 text-[0.65rem] hover:text-red-300 uppercase font-semibold tracking-wider p-1">Esqueceu a senha?</button>
                  <button type="button" onClick={() => setView('register')} className="text-red-400 text-[0.65rem] hover:text-red-300 uppercase font-semibold tracking-wider p-1">Criar conta</button>
                </>
              ) : (
                <button type="button" onClick={() => setView('login')} className="text-red-400 text-[0.65rem] hover:text-red-300 uppercase font-semibold tracking-wider p-1 w-full text-center">← Voltar para o Login</button>
              )}
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs text-center mt-2 font-medium"
              >
                {error}
              </motion.p>
            )}
            
            {successMsg && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-xs text-center mt-2 font-medium"
              >
                {successMsg}
              </motion.p>
            )}
          </div>

          <div className="w-full flex justify-center items-center min-h-[90px] my-2">
             <img 
               src={logoImg} 
               alt="Brasão de Maricá" 
               className="w-[60%] max-w-[200px] object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
               onError={(e) => {
                 e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bras%C3%A3o_de_Maric%C3%A1.png";
               }} 
             />
          </div>

          <button 
            type="submit"
            className="w-full mt-auto mb-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-[15px] shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all active:scale-95 uppercase tracking-wider text-[0.95rem]"
          >
            {view === 'login' ? 'ACESSAR SISTEMA' : view === 'register' ? 'CRIAR CONTA' : 'RECUPERAR SENHA'}
          </button>
        </form>

        <div className="font-bold text-[0.65rem] tracking-[3px] text-red-500/60 uppercase relative z-10 py-2">
          MARICÁ TECH SYSTEM
        </div>
      </div>
    </motion.div>
  );
}

function CalculatorScreen({ onLogout }: { onLogout: () => void }) {
  const [valorStr, setValorStr] = useState<string>('1.150,00');
  // Pega apenas os dígitos para calcular o valor real (evita problemas com '.' ou espaços)
  const valor = (parseInt(valorStr.replace(/\D/g, ''), 10) || 0) / 100;

  // Máscara estilo "caixa eletrônico" (autoformatação enquanto digita)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const digits = val.replace(/\D/g, '');
    
    if (!digits) {
      setValorStr('0,00');
      return;
    }
    
    const numericVal = parseInt(digits, 10) / 100;
    
    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericVal);
    
    setValorStr(formatted);
  };

  return (
    // fixed, inset-0 evitam rolagem na webview, bom para app em tela cheia no touch
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center p-4 font-sans select-none overflow-hidden touch-none" 
      style={{ background: 'radial-gradient(circle, #330000, #000000)' }}
    >
      <div className="w-full h-full max-h-[700px] max-w-[380px] p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-[0_0_20px_rgba(255,0,0,0.5)] flex flex-col items-center text-center text-white relative overflow-y-auto hide-scrollbar">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/20 rounded-full blur-[50px] pointer-events-none"></div>

        <button 
          onClick={onLogout}
          className="absolute top-4 right-4 p-2 text-red-500/70 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all z-20"
        >
          <LogOut size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2 mt-4 relative z-10 text-red-500">
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
    </motion.div>
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
      className="bg-red-500/5 border border-red-500/20 p-4 rounded-[16px] relative overflow-hidden backdrop-blur-sm group flex flex-col text-left cursor-pointer"
      onClick={handleCopy}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-bold text-[#ff4d4d] text-[0.7rem] tracking-widest uppercase">
          {dia} <span className="opacity-70">(-{taxa}%)</span>
        </span>
        
        <button 
          className="p-1.5 rounded-full bg-red-900/30 text-red-300 hover:bg-red-500/40 hover:text-white transition-colors active:scale-90 pointer-events-none"
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


