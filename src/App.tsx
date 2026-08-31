import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Star, ArrowRight, User, ChevronDown, Check, Smartphone, Layers, LayoutGrid, Menu, Plus, Minus, Instagram, MapPin } from 'lucide-react'; import { X } from 'lucide-react'; import { Car, Calendar, Wrench } from 'lucide-react';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ name: '', car: '', service: '' });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Tenho interesse em negociar um veículo.\n\n*Nome:* ${scheduleForm.name}\n*Veículo de interesse:* ${scheduleForm.car}\n*Assunto:* ${scheduleForm.service}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5585986300600?text=${encodedText}`, '_blank');
    setIsScheduleModalOpen(false);
    setScheduleForm({ name: '', car: '', service: '' });
  };


  useEffect(() => {
    const consent = localStorage.getItem('sena_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('sena_cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  const modalContent: Record<string, { title: string, content: React.ReactNode }> = {
    servicos: {
      title: "Nossos Serviços",
      content: (
        <div className="space-y-4">
          <p>Temos as melhores soluções para você sair de carro novo ou seminovo com total segurança:</p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li><strong>Compra:</strong> Avaliação justa e pagamento à vista pelo seu veículo.</li>
            <li><strong>Venda:</strong> Estoque rigorosamente selecionado e com garantia.</li>
            <li><strong>Troca:</strong> Aceitamos seu carro na troca com a melhor avaliação do mercado.</li>
            <li><strong>Financiamento:</strong> Parceria com os principais bancos para oferecer as melhores taxas.</li>
          </ul>
        </div>
      )
    },
    avaliacoes: {
      title: "Avaliações dos Clientes",
      content: (
        <div className="space-y-4">
          <p>Nossa maior satisfação é realizar o sonho do carro novo.</p>
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <p className="italic text-zinc-300">"Comprei meu primeiro importado com a RSena. O carro estava impecável, exatamente como no anúncio, e o financiamento saiu rápido. Atendimento nota 10!"</p>
            <p className="text-[#E3242B] font-bold mt-2">- Marcos T.</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <p className="italic text-zinc-300">"A avaliação que fizeram no meu usado na troca foi muito justa. Saí de SUV novo no mesmo dia."</p>
            <p className="text-[#E3242B] font-bold mt-2">- Juliano R.</p>
          </div>
        </div>
      )
    },
    duvidas: {
      title: "Dúvidas Frequentes",
      content: (
        <div className="space-y-4">
          <p><strong>Aceitam o meu carro na troca?</strong><br/>Sim! Avaliamos o seu seminovo e usamos como parte do pagamento na compra do seu carro novo.</p>
          <p><strong>Quais bancos vocês trabalham para financiamento?</strong><br/>Trabalhamos com os maiores e melhores bancos do mercado para garantir a menor taxa de juros possível para você.</p>
          <p><strong>Os carros têm garantia?</strong><br/>Sim, todos os nossos veículos passam por uma rigorosa revisão e possuem garantia por lei de motor e caixa.</p>
        </div>
      )
    },
    privacidade: {
      title: "Política de Privacidade",
      content: (
        <div className="space-y-4">
          <p>A RSena Veículos está comprometida em proteger a sua privacidade. Esta política descreve como coletamos, usamos e protegemos as suas informações pessoais.</p>
          <p>Coletamos informações (como nome, telefone e dados do veículo) apenas com o propósito de agendar atendimentos, simular financiamentos e melhorar o seu atendimento.</p>
          <p>Não compartilhamos, vendemos ou alugamos suas informações pessoais para terceiros em hipótese alguma.</p>
        </div>
      )
    },
    cookies: {
      title: "Política de Cookies",
      content: (
        <div className="space-y-4">
          <p>Utilizamos cookies em nosso site para garantir a melhor experiência possível. Eles nos ajudam a entender como você interage com a página.</p>
          <p><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site e não podem ser desativados.</p>
          <p><strong>Cookies Analíticos:</strong> Nos ajudam a melhorar o site analisando como os visitantes o utilizam, de forma anônima.</p>
          <p>Ao continuar a usar este site, você concorda com o uso de cookies de acordo com esta política.</p>
        </div>
      )
    },
    termos: {
      title: "Termos de Autorização",
      content: (
        <div className="space-y-4">
          <p>Ao negociar seu veículo com a RSena Veículos, você concorda com os seguintes termos:</p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li>Autoriza a realização das cotações e simulações especificadas.</li>
            <li>Reconhece que a avaliação presencial do veículo é indispensável para compor a proposta final de troca/compra.</li>
            <li>Autoriza o uso de imagens do veículo negociado para fins de portfólio e divulgação nas redes sociais da loja (as placas serão ocultadas por padrão).</li>
          </ul>
        </div>
      )
    }
  };

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 1000], [0, 80]);
  const heroCarY = useTransform(scrollY, [0, 1000], [0, 200]);

  const faqs = [
    {
      question: "Vocês aceitam carro na troca?",
      answer: "Sim! Pegamos o seu carro atual como entrada na troca por um de nossos veículos. Nossa avaliação é uma das mais justas do mercado, garantindo um excelente negócio para você."
    },
    {
      question: "Quais são as opções de financiamento?",
      answer: "Temos parcerias com os principais bancos e financeiras do país, o que nos permite oferecer taxas de juros competitivas e planos que cabem no seu bolso, com aprovação rápida e sem burocracia."
    },
    {
      question: "Os veículos possuem garantia?",
      answer: "Com certeza. Todos os nossos veículos, nacionais e importados, passam por uma inspeção rigorosa antes de irem para o pátio e são entregues com garantia de motor e câmbio."
    },
    {
      question: "Compram carros sem que eu precise trocar?",
      answer: "Sim, compramos o seu veículo à vista, com avaliação justa, pagamento rápido e sem complicação."
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-display {
          font-family: 'Montserrat', sans-serif;
        }
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        /* Custom scrollbar for a premium feel */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #090909;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #E3242B;
        }
      `}</style>

      <div className="min-h-screen bg-[#090909] text-white font-body selection:bg-[#E3242B] selection:text-black overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] pt-6 pb-12 px-6 lg:px-12 flex flex-col items-center overflow-hidden">
          {/* Mobile Edge-to-Edge Video Background */}
          <div className="absolute inset-0 z-0 lg:hidden pointer-events-none">
            <video 
              src="/herobackground.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-[65svh] object-cover brightness-[0.7]"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
              }}
            />
          </div>

          
          {/* Top Nav Area */}
          <nav className="w-full max-w-[1600px] grid grid-cols-2 lg:grid-cols-3 items-center z-50 relative py-4 lg:py-6">
            
            {/* Logo */}
            <div className="flex items-center justify-start">
              <img src="/Rsena-removebg-preview.png" alt="RSena Veículos" className="h-16 lg:h-24 w-auto object-contain drop-shadow-lg" style={{ imageRendering: 'high-quality' }} />
            </div>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-8 h-8 text-white" /></button>
            </div>

            {/* Center Menu (Desktop) */}
            <div className="hidden lg:flex items-center justify-center gap-10 font-mono text-xs uppercase tracking-widest text-zinc-400">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('servicos'); }} className="hover:text-white transition-colors">Serviços</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('duvidas'); }} className="hover:text-white transition-colors">Dúvidas Frequentes</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('avaliacoes'); }} className="hover:text-white transition-colors">Avaliações</a>
            </div>

            {/* Right Action (Desktop) */}
            <div className="hidden lg:flex items-center justify-end font-mono text-xs uppercase tracking-widest text-zinc-400">
              <button onClick={() => setIsScheduleModalOpen(true)} className="px-6 py-3 border border-zinc-800 rounded-full hover:border-[#E3242B] hover:text-[#E3242B] transition-colors text-white font-semibold">Fale Conosco</button>
            </div>
          </nav>
        {/* MOBILE MENU MODAL */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-12">
                <img src="/Rsena-removebg-preview.png" alt="RSena Veículos" className="h-12 w-auto object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-8 h-8 text-white" />
                </button>
              </div>
              
              <div className="flex flex-col gap-6 text-xl font-display font-bold uppercase tracking-widest">
                <button onClick={() => { setIsMobileMenuOpen(false); setIsScheduleModalOpen(true); }} className="text-left text-[#E3242B]">Fale Conosco</button>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <button onClick={() => { setIsMobileMenuOpen(false); setActiveModal('servicos'); }} className="text-left text-white hover:text-[#E3242B] transition-colors">Nossos Serviços</button>
                <button onClick={() => { setIsMobileMenuOpen(false); setActiveModal('avaliacoes'); }} className="text-left text-white hover:text-[#E3242B] transition-colors">Avaliações</button>
                <button onClick={() => { setIsMobileMenuOpen(false); setActiveModal('duvidas'); }} className="text-left text-white hover:text-[#E3242B] transition-colors">Dúvidas Frequentes</button>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <button onClick={() => { setIsMobileMenuOpen(false); setActiveModal('privacidade'); }} className="text-left text-sm text-zinc-400 hover:text-white transition-colors">Política de Privacidade</button>
                <button onClick={() => { setIsMobileMenuOpen(false); setActiveModal('cookies'); }} className="text-left text-sm text-zinc-400 hover:text-white transition-colors">Política de Cookies</button>
                <button onClick={() => { setIsMobileMenuOpen(false); setActiveModal('termos'); }} className="text-left text-sm text-zinc-400 hover:text-white transition-colors">Termos de Autorização</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


          {/* Main Hero Layout (Aligned to reference moldes) */}
          <div className="w-full max-w-[1600px] flex flex-col lg:flex-row items-center justify-between mt-12 lg:mt-8 z-20 relative flex-1">
            
            {/* Left Column: Typography & Review */}
            <motion.div 
              style={{ y: heroTextY }}
              className="w-full lg:w-[55%] flex flex-col justify-center relative z-40 mt-[30svh] lg:mt-0"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-zinc-500 font-display font-bold tracking-widest text-sm lg:text-lg uppercase mb-2 lg:mb-4 ml-1"
              >
                Especialistas em Nacionais e Importados
              </motion.h2>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="text-[10vw] sm:text-[11vw] lg:text-[7.5vw] leading-[0.9] font-display font-black uppercase text-[#E3242B] tracking-tighter drop-shadow-xl"
              >
                NOVOS E
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-[10vw] sm:text-[11vw] lg:text-[7.5vw] leading-[0.9] font-display font-black uppercase text-[#E0E0E0] tracking-tighter drop-shadow-xl"
              >
                SEMINOVOS
              </motion.h1>

              {/* Review Card Floating */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: mounted ? 1 : 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full lg:w-auto relative z-40 bg-black/60 backdrop-blur-xl lg:bg-[#121212] p-6 rounded-[24px] border border-white/10 lg:border-white/5 max-w-sm mt-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" alt="Client" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-white">Roberto</p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-[#E3242B] text-[#E3242B]" />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Experiência incrível na compra do meu carro novo. Financiamento aprovado na hora e avaliação super justa no meu usado. Recomendo demais a RSena Veículos!
                </p>
                <div className="text-[10px] text-zinc-600 mt-4 text-right">09:37</div>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Car Image (Desktop) */}
            <motion.div 
              style={{ y: heroCarY }}
              className="hidden lg:flex w-full lg:w-[45%] relative mt-12 lg:mt-0 items-center justify-center lg:justify-end z-10"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                animate={{ opacity: mounted ? 1 : 0, scale: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="relative w-full lg:absolute lg:right-[-5%] lg:w-[120%] z-20 pointer-events-none"
              >
                <video 
                  src="/herobackground.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-cover rounded-3xl lg:rounded-none drop-shadow-2xl brightness-75"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to left, black 80%, transparent 100%)',
                    maskImage: 'linear-gradient(to left, black 80%, transparent 100%)'
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* PROJECT DETAILS / SERVICES SECTION */}
        <section className="px-4 lg:px-12 py-12 lg:py-24 relative z-30">
          <div className="max-w-[1500px] mx-auto bg-[#111111] rounded-[40px] p-8 lg:p-20 relative overflow-hidden border border-white/5">
            
            {/* Faint Background Title */}
            <div className="absolute top-12 right-12 text-right hidden lg:block opacity-[0.03] font-display font-black text-[6rem] leading-[0.8] uppercase pointer-events-none">
              NOSSA <br/> LOJA
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
              
              {/* Left Column */}
              <div className="max-w-xl">
                {/* 01 Block */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-16"
                >
                  <h2 className="font-display font-black text-2xl uppercase tracking-widest flex items-center gap-4 mb-6">
                    <span className="text-[#E3242B] text-3xl">01</span> A LOJA
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                    A RSena Veículos é especializada em compra, venda, troca e financiamento. Oferecemos um estoque selecionado de veículos novos e seminovos, com garantia e procedência.
                  </p>
                  <div className="border-l-2 border-[#E3242B] pl-6 py-2">
                    <p className="text-sm font-medium italic text-zinc-300">
                      // Trabalhamos com nacionais e importados, prezando sempre pela transparência, qualidade e as melhores condições de pagamento.
                    </p>
                  </div>
                </motion.div>

                {/* 02 Block */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 className="font-display font-black text-2xl uppercase tracking-widest flex items-center gap-4 mb-8">
                    <span className="text-[#E3242B] text-3xl">02</span> VANTAGENS
                  </h2>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4 group">
                      <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#E3242B] transition-colors shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block mb-1">Compra e Venda Segura</strong>
                        <span className="text-zinc-500 text-sm font-light">Avaliação justa do seu veículo e estoque de alta qualidade.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#E3242B] transition-colors shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block mb-1">Troca com Troco</strong>
                        <span className="text-zinc-500 text-sm font-light">Use seu usado como entrada e saia de carro novo no mesmo dia.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#E3242B] transition-colors shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block mb-1">Financiamento Facilitado</strong>
                        <span className="text-zinc-500 text-sm font-light">As melhores taxas do mercado através de nossos bancos parceiros.</span>
                      </div>
                    </li>
                  </ul>

                  <button onClick={() => setIsScheduleModalOpen(true)} className="mt-10 px-8 py-4 border border-zinc-700 rounded-full text-sm font-medium hover:border-[#E3242B] hover:text-[#E3242B] transition-all flex items-center gap-3">
                    Agendar Avaliação <Check className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>

              {/* Right Column / Car & Floating Card */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="relative flex flex-col items-center mt-12 lg:mt-0"
              >
                <img 
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop" 
                  alt="BMW Custom" 
                  className="w-full max-w-[600px] lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[150%] lg:max-w-[800px] mix-blend-screen opacity-80 pointer-events-none mb-8 lg:mb-0"
                />
                
                {/* Result Card overlapping */}
                <div className="relative lg:absolute lg:bottom-0 lg:-left-4 bg-[#D1D1D1] text-black p-8 rounded-[24px] max-w-[340px] shadow-2xl z-20">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-display font-black text-2xl uppercase">NOSSA<br/>PROPOSTA</h3>
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-10 h-10 rounded-full" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed mb-4">
                    Negociação transparente que cabe no seu bolso.
                  </p>
                  <p className="text-sm font-bold">
                    Seu veículo novo ou seminovo com total garantia.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* POSTER SHOWCASE SECTION (Inspired by Audi Reference) */}
        <section className="relative w-full min-h-[1000px] lg:min-h-[1200px] bg-[#000000] overflow-hidden text-white flex flex-col justify-between py-12 px-6 lg:px-12 my-20">
          
          {/* Top Labels */}
          <div className="flex justify-between w-full relative z-20 font-display font-bold text-[10px] tracking-widest uppercase text-zinc-500">
            <div className="border-b-2 border-[#E3242B] pb-1 text-white">DESTAQUES</div>
            <div>ALTA PERFORMANCE</div>
            <div>ESTOQUE PREMIUM</div>
          </div>

          {/* Diagonal Red Stripe */}
          <div className="absolute top-[-20%] left-[10%] lg:left-[30%] w-[150vw] lg:w-[35vw] h-[150%] bg-[#E3242B] -skew-x-[20deg] z-10 shadow-2xl"></div>

          {/* Vertical Text */}
          <div className="absolute right-2 lg:right-8 top-0 h-full flex items-center z-0 pointer-events-none">
            <h2 
              className="text-[25vw] lg:text-[10vw] sm:text-[11vw] font-display font-black text-[#111111] leading-[0.8] uppercase tracking-tighter"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              RSENA
            </h2>
          </div>

          {/* Center Content / Cars */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full h-full mt-24 lg:mt-12">
            
            {/* Car 1 (Rear/Top) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[600px] lg:-ml-32 mb-4 lg:mb-0 z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1600&auto=format&fit=crop" 
                className="w-full h-auto object-cover mix-blend-screen opacity-90 drop-shadow-2xl"
                alt="Detailing Performance"
              />
            </motion.div>

            {/* Car 2 (Side profile overlay) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full max-w-[800px] mt-[-40px] lg:mt-[-100px] z-30"
            >
              <img 
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop" 
                className="w-full h-auto object-cover mix-blend-screen drop-shadow-2xl brightness-110"
                alt="Car Side Profile"
              />
            </motion.div>
          </div>

          {/* Bottom Specs (Mimicking the diagram lines) */}
          <div className="relative z-30 w-full flex flex-col items-center mt-auto pb-4 pt-16">
            <div className="max-w-[900px] w-full flex flex-col items-center">
              
              {/* Bracket / Top Line */}
              <div className="w-full flex justify-between items-end border-b border-white/20 pb-2 px-1">
                 <div className="w-1 h-3 bg-white/40"></div>
                 <div className="w-1 h-3 bg-white/40"></div>
              </div>

              <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 py-8 px-4">
                <div className="flex-1 text-[10px] lg:text-xs font-medium leading-relaxed tracking-widest text-zinc-300 max-w-sm uppercase">
                  NA RSENA VEÍCULOS VOCÊ ENCONTRA OS MELHORES VEÍCULOS, NACIONAIS E IMPORTADOS, COM A GARANTIA E CONFIANÇA QUE VOCÊ PROCURA PARA FECHAR O MELHOR NEGÓCIO.
                </div>
                
                <div className="flex gap-6 lg:gap-12 border-l border-white/20 pl-6 lg:pl-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase">Veículos:</span>
                    <span className="font-display font-black text-base lg:text-xl text-white">PREMIUM</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase">Estoque:</span>
                    <span className="font-display font-black text-base lg:text-xl text-white">DIVERSIFICADO</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase">Garantia:</span>
                    <span className="font-display font-black text-base lg:text-xl text-white">TOTAL</span>
                  </div>
                </div>
              </div>
              
              {/* Bracket / Bottom Line */}
              <div className="w-full flex justify-between items-start border-t border-white/20 pt-2 px-1">
                 <div className="w-1 h-3 bg-white/40"></div>
                 <div className="w-1 h-3 bg-white/40"></div>
              </div>

            </div>
          </div>
          
          {/* Logos bottom left */}
          <div className="absolute bottom-8 left-6 lg:bottom-12 lg:left-12 z-30 flex items-center gap-4">
             <img src="/Rsena-removebg-preview.png" alt="RSena Veículos" className="h-12 lg:h-16 w-auto object-contain drop-shadow-md" style={{ imageRendering: 'high-quality' }} />
             <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest border-l border-[#E3242B] pl-4 uppercase">
               <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#E3242B]"></div>
               RSena Veículos
             </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="px-6 lg:px-12 py-24 bg-[#090909] border-t border-white/5">
          <div className="max-w-[1000px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-[#E3242B] font-display font-bold tracking-widest text-sm uppercase mb-4">Ficou com Dúvidas?</h2>
              <h3 className="text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tighter">Perguntas Frequentes</h3>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden bg-[#111] transition-all duration-300 ${openFaq === index ? 'border-[#E3242B]' : 'border-zinc-800 hover:border-zinc-700'}`}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <span className={`font-display font-bold text-lg lg:text-xl pr-8 transition-colors ${openFaq === index ? 'text-white' : 'text-zinc-300'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === index ? 'bg-[#E3242B] text-white' : 'bg-zinc-900 text-[#E3242B]'}`}>
                      {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 text-zinc-400 font-light leading-relaxed border-t border-zinc-800/50 mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MOBILE / FOCUS SECTION */}
        <section className="px-6 lg:px-12 py-24 bg-[#090909] overflow-hidden">
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Huge text */}
            <div>
              <h2 className="text-[12vw] lg:text-[7vw] leading-[0.9] font-display font-black text-[#E3242B] uppercase tracking-tighter">
                FOCO
              </h2>
              <h2 className="text-[12vw] lg:text-[7vw] leading-[0.9] font-display font-black text-white/30 uppercase tracking-tighter mb-8">
                TOTAL
              </h2>
              <p className="text-zinc-400 text-lg lg:text-xl font-light max-w-md leading-relaxed">
                Atendimento personalizado na palma da sua mão. Solicite orçamentos, acompanhe o processo do seu veículo e agende retornos diretamente pelo nosso canal exclusivo.
              </p>
            </div>

            {/* Right Column - Stylized Floating Phones */}
            <div className="relative h-[850px] lg:h-[800px] w-full flex justify-center items-center perspective-[2000px]">
              
              {/* Phone 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: -20, rotateZ: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 20, rotateY: -15, rotateZ: -12 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute left-[5%] lg:left-[15%] top-0 lg:top-[10%] w-[260px] lg:w-[280px] h-[560px] lg:h-[580px] bg-[#161616] rounded-[40px] border-[6px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-20"
              >
                {/* Fake App UI */}
                <div className="flex-1 p-6 flex flex-col relative">
                  <div className="w-full flex justify-between items-center mb-8">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center"><User className="w-4 h-4" /></div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <h3 className="font-display font-black text-xl mb-2 text-white">ORÇAMENTO RÁPIDO</h3>
                  <p className="text-xs text-zinc-400 mb-8">Preencha os dados do seu veículo.</p>
                  
                  <div className="space-y-4 flex-1">
                     <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="h-12 w-full bg-zinc-900 rounded-xl border border-zinc-800 flex items-center px-4 gap-3 overflow-hidden relative"
                     >
                        <Car className="w-4 h-4 text-zinc-500 shrink-0" />
                        <motion.span 
                           initial={{ opacity: 0 }}
                           whileInView={{ opacity: 1 }}
                           transition={{ duration: 0.5, delay: 1.2 }}
                           className="text-sm text-zinc-300 font-medium whitespace-nowrap"
                        >
                          Jeep Compass 2024
                        </motion.span>
                        <motion.div 
                           initial={{ left: "-100%" }}
                           whileInView={{ left: "200%" }}
                           transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                           className="absolute top-0 bottom-0 w-12 bg-white/5 blur-xl skew-x-12"
                        ></motion.div>
                     </motion.div>
                     
                     <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        className="h-12 w-full bg-zinc-900 rounded-xl border border-zinc-800 flex items-center px-4 gap-3 relative overflow-hidden"
                     >
                        <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
                        <motion.span 
                           initial={{ opacity: 0 }}
                           whileInView={{ opacity: 1 }}
                           transition={{ duration: 0.5, delay: 1.6 }}
                           className="text-sm text-zinc-300 font-medium whitespace-nowrap"
                        >
                          Financiamento
                        </motion.span>
                     </motion.div>
                     
                     <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="h-32 w-full bg-zinc-900 rounded-xl border border-zinc-800 flex items-start px-4 py-3 gap-3 relative overflow-hidden"
                     >
                        <Wrench className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                        <motion.span 
                           initial={{ opacity: 0 }}
                           whileInView={{ opacity: 1 }}
                           transition={{ duration: 0.5, delay: 2.0 }}
                           className="text-sm text-zinc-400 font-medium line-clamp-3 leading-relaxed"
                        >
                          Gostaria de uma simulação de financiamento dando meu carro usado de entrada.
                        </motion.span>
                     </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="relative group mt-4"
                  >
                    <div className="absolute inset-0 bg-[#E3242B] rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsScheduleModalOpen(true)}
                      className="relative h-14 w-full bg-[#E3242B] rounded-xl flex items-center justify-center text-white font-black text-sm uppercase tracking-wider"
                    >
                      SOLICITAR ORÇAMENTO
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Phone 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: 20, rotateZ: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 15, rotateY: 25, rotateZ: 8 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute right-[5%] lg:right-[10%] top-[48%] lg:top-[25%] w-[260px] lg:w-[280px] h-[560px] lg:h-[580px] bg-[#111] rounded-[40px] border-[6px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10 lg:z-20"
              >
                {/* Fake App UI 2 */}
                <div className="h-[45%] w-full bg-zinc-900 relative">
                  <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop" alt="Detail" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                </div>
                <div className="flex-1 p-6 relative z-10 -mt-10">
                  <h3 className="font-display font-black text-xl mb-2 text-white uppercase">Nosso <br/><span className="text-[#E3242B]">Estoque</span></h3>
                  <p className="text-xs text-zinc-400 mb-6 line-clamp-2">Acompanhe as novidades e ofertas disponíveis em nossa loja.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="aspect-square bg-zinc-800 rounded-xl overflow-hidden relative group"
                    >
                       <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><Star className="w-6 h-6 text-white" /></div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                      className="aspect-square bg-zinc-800 rounded-xl overflow-hidden relative group"
                    >
                       <img src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><Star className="w-6 h-6 text-white" /></div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="aspect-square bg-zinc-800 rounded-xl overflow-hidden relative group"
                    >
                       <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><Star className="w-6 h-6 text-white" /></div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      className="aspect-square bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors"
                    >
                       <span className="text-xs text-zinc-400 font-medium uppercase tracking-widest">+ Mais</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          {/* Footer Grid / Meta info (Replaced by ELEGANT FOOTER) */}
        </section>

        {/* LOCATION SECTION */}
        <section className="w-full bg-[#0a0a0a] pt-24 pb-24 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden">
          <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-20 relative z-10">
            {/* Left Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/3 flex flex-col justify-center"
            >
              <h2 className="text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tighter mb-4">
                Onde <span className="text-[#E3242B]">Estamos</span>
              </h2>
              <p className="text-zinc-400 font-light text-lg mb-10 leading-relaxed">
                Venha nos fazer uma visita. Nosso estúdio está equipado com a melhor estrutura para receber o seu veículo com segurança e exclusividade.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#111] flex items-center justify-center text-[#E3242B] shrink-0 border border-zinc-800 shadow-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg mb-2">Endereço</span>
                    <span className="text-zinc-400 leading-relaxed">Av. Aguanambi, 1505 - Fátima<br/>Fortaleza - CE, 60055-401</span>
                    <a href="https://maps.app.goo.gl/4gGTZaqNRwQ9Sq6D6" target="_blank" rel="noopener noreferrer" className="text-[#E3242B] text-sm uppercase tracking-widest mt-4 hover:text-white transition-colors flex items-center gap-2 w-fit font-bold group">
                      ABRIR NO MAPA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Map */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:w-2/3 h-[400px] lg:h-[500px] rounded-[32px] overflow-hidden border border-zinc-800/50 shadow-2xl relative"
            >
              <iframe 
                src="https://maps.google.com/maps?q=Av.+Aguanambi,+1505+-+F%C3%A1tima,+Fortaleza+-+CE,+60055-401&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização RSena Veículos"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* ELEGANT FOOTER */}
        <footer className="w-full bg-[#050505] pt-20 pb-10 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-[1500px] mx-auto flex flex-col">
            
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
              
              {/* Brand */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col gap-6 lg:col-span-1"
              >
                <div className="flex items-start">
                  <img src="/Rsena-removebg-preview.png" alt="RSena Veículos" className="h-24 lg:h-36 w-auto object-contain drop-shadow-xl" style={{ imageRendering: 'high-quality' }} />
                </div>
                <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-xs">
                  Loja especializada na compra, venda, troca e financiamento de veículos nacionais e importados, sempre com o melhor negócio para você.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="flex flex-col gap-6"
              >
                <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm">Links Úteis</h4>
                <div className="flex flex-col gap-3 text-sm text-zinc-400 font-light">
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('servicos'); }} className="hover:text-[#E3242B] transition-colors w-fit">Nossos Serviços</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('avaliacoes'); }} className="hover:text-[#E3242B] transition-colors w-fit">Avaliações</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('duvidas'); }} className="hover:text-[#E3242B] transition-colors w-fit">Dúvidas Frequentes</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('privacidade'); }} className="hover:text-[#E3242B] transition-colors w-fit">Política de Privacidade</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('cookies'); }} className="hover:text-[#E3242B] transition-colors w-fit">Política de Cookies</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('termos'); }} className="hover:text-[#E3242B] transition-colors w-fit">Termos de Autorização</a>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col gap-6"
              >
                <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm">Contato</h4>
                <div className="flex flex-col gap-3 text-sm text-zinc-400 font-light">
                  <a href="https://wa.me/5585986300600" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-[#E3242B]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </span>
                    (85) 98630-0600
                  </a>
                  <a href="https://maps.app.goo.gl/4gGTZaqNRwQ9Sq6D6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit flex items-start gap-3 mt-1">
                    <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-[#E3242B] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="mt-1 leading-relaxed">Av. Aguanambi, 1505 - Fátima<br/>Fortaleza - CE</span>
                  </a>
                </div>
              </motion.div>

              {/* Social / CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col gap-6"
              >
                <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm">Redes Sociais</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-[#E3242B] hover:border-[#E3242B] transition-all text-white group">
                    <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://wa.me/5585986300600" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-[#E3242B] hover:border-[#E3242B] transition-all text-white group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 3.4L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-600"
            >
              <p>© 2024 RSENA VEÍCULOS. TODOS OS DIREITOS RESERVADOS.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              </div>
            </motion.div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#E3242B] rounded-full animate-ping opacity-40 duration-1000"></div>
          <a 
            href="https://wa.me/5585986300600" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-[#E3242B] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(227,36,43,0.5)] hover:bg-white hover:text-[#E3242B] transition-colors duration-300 flex items-center justify-center group"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 group-hover:scale-110 transition-transform">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div></div>
        
        {/* SCHEDULE FORM MODAL */}
        <AnimatePresence>
          {isScheduleModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsScheduleModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111] border border-zinc-800 rounded-3xl p-6 lg:p-10 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-display font-black text-white mb-2 uppercase tracking-widest">Fale Conosco</h2>
                <p className="text-zinc-400 text-sm mb-6">Preencha os dados abaixo e iniciaremos seu atendimento via WhatsApp.</p>
                
                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      value={scheduleForm.name}
                      onChange={(e) => setScheduleForm({...scheduleForm, name: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3242B] transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Veículo de Interesse / Troca</label>
                    <input 
                      type="text" 
                      required
                      value={scheduleForm.car}
                      onChange={(e) => setScheduleForm({...scheduleForm, car: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3242B] transition-colors"
                      placeholder="Modelo de interesse ou veículo da troca"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Como podemos ajudar?</label>
                    <textarea 
                      required
                      value={scheduleForm.service}
                      onChange={(e) => setScheduleForm({...scheduleForm, service: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3242B] transition-colors h-24 resize-none"
                      placeholder="Deseja comprar, vender, trocar ou simular financiamento?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#E3242B] hover:bg-white hover:text-black transition-colors rounded-xl font-bold text-sm uppercase tracking-widest text-white py-4 mt-2"
                  >
                    Enviar para WhatsApp
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL / POPUP COMPONENT */}
        <AnimatePresence>
          {activeModal && modalContent[activeModal] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111] border border-zinc-800 rounded-3xl p-6 lg:p-10 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setActiveModal(null)}
                  className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-display font-black text-white mb-6 uppercase tracking-widest">{modalContent[activeModal].title}</h2>
                <div className="text-zinc-400 font-light leading-relaxed">
                  {modalContent[activeModal].content}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COOKIE BANNER */}
        <AnimatePresence>
          {showCookieBanner && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-[90] p-4 pointer-events-none"
            >
              <div className="max-w-5xl mx-auto bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-white font-bold mb-2">Sua privacidade é importante</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    Utilizamos cookies para oferecer a melhor experiência, analisar o tráfego do site e personalizar conteúdo. 
                    Ao continuar navegando, você concorda com a nossa <button onClick={() => setActiveModal('cookies')} className="text-[#E3242B] hover:underline font-medium">Política de Cookies</button>.
                  </p>
                </div>
                <div className="flex gap-4 shrink-0">
                  <button 
                    onClick={acceptCookies}
                    className="px-8 py-3 bg-[#E3242B] hover:bg-white hover:text-black transition-colors rounded-xl font-bold text-sm uppercase tracking-widest text-white"
                  >
                    Aceitar e Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

</>
);
}

