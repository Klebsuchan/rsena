const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const stateCode = `
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ name: '', car: '', service: '' });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = \`Olá! Gostaria de agendar um horário.\\n\\n*Nome:* \${scheduleForm.name}\\n*Veículo:* \${scheduleForm.car}\\n*Serviço desejado:* \${scheduleForm.service}\`;
    const encodedText = encodeURIComponent(text);
    window.open(\`https://wa.me/555481043307?text=\${encodedText}\`, '_blank');
    setIsScheduleModalOpen(false);
    setScheduleForm({ name: '', car: '', service: '' });
  };
`;

// Insert the new state after activeModal
code = code.replace(/const \[activeModal, setActiveModal\] = useState<string \| null>\(null\);/, 
  'const [activeModal, setActiveModal] = useState<string | null>(null);\n' + stateCode);

// Inject the Schedule Modal into the JSX, maybe right before {/* MODAL / POPUP COMPONENT */}
const formModalJSX = `
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
                className="bg-[#111] border border-zinc-800 rounded-3xl p-6 lg:p-10 max-w-md w-full relative shadow-2xl"
              >
                <button 
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-display font-black text-white mb-2 uppercase tracking-widest">Agendar Horário</h2>
                <p className="text-zinc-400 text-sm mb-6">Preencha os dados abaixo e entraremos em contato via WhatsApp para confirmar seu agendamento.</p>
                
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
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Veículo</label>
                    <input 
                      type="text" 
                      required
                      value={scheduleForm.car}
                      onChange={(e) => setScheduleForm({...scheduleForm, car: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3242B] transition-colors"
                      placeholder="Modelo e Ano (ex: Porsche 911 2024)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Serviço Necessário</label>
                    <textarea 
                      required
                      value={scheduleForm.service}
                      onChange={(e) => setScheduleForm({...scheduleForm, service: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3242B] transition-colors h-24 resize-none"
                      placeholder="O que você gostaria de fazer no veículo?"
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

        {/* MODAL / POPUP COMPONENT */}`;

code = code.replace('{/* MODAL / POPUP COMPONENT */}', formModalJSX);

fs.writeFileSync('src/App.tsx', code);
