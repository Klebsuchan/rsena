const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const modalCode = `
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
`;

code = code.replace(/<\/div>\s*<\/div>\s*<\/>\s*\);\s*}/g, '</div></div>' + modalCode + '\n</>\n);\n}');
fs.writeFileSync('src/App.tsx', code);
