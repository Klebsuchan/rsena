const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add state for mobile menu
code = code.replace(
  'const [activeModal, setActiveModal] = useState<string | null>(null);',
  'const [activeModal, setActiveModal] = useState<string | null>(null);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
);

// Add click handler to Menu icon
code = code.replace(
  '<Menu className="w-8 h-8 text-white" />',
  '<button onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-8 h-8 text-white" /></button>'
);

// Add mobile menu JSX right after the nav
const mobileMenuJSX = `
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
                <img src="/logoesteticaauto.png" alt="Sena" className="h-12 w-auto object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-8 h-8 text-white" />
                </button>
              </div>
              
              <div className="flex flex-col gap-6 text-xl font-display font-bold uppercase tracking-widest">
                <button onClick={() => { setIsMobileMenuOpen(false); setIsScheduleModalOpen(true); }} className="text-left text-[#E3242B]">Agendar Horário</button>
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
`;

code = code.replace('</nav>', '</nav>' + mobileMenuJSX);

fs.writeFileSync('src/App.tsx', code);
