const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const navOld = `{/* Center Menu (Desktop) */}
            <div className="hidden lg:flex items-center justify-center gap-10 font-mono text-xs uppercase tracking-widest text-zinc-400">
              <a href="#" className="hover:text-white transition-colors">Serviços</a>
              <a href="#" className="hover:text-white transition-colors">Dúvidas Frequentes</a>
              <a href="#" className="hover:text-white transition-colors">Avaliações</a>
            </div>`;

const navNew = `{/* Center Menu (Desktop) */}
            <div className="hidden lg:flex items-center justify-center gap-10 font-mono text-xs uppercase tracking-widest text-zinc-400">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('servicos'); }} className="hover:text-white transition-colors">Serviços</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('duvidas'); }} className="hover:text-white transition-colors">Dúvidas Frequentes</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('avaliacoes'); }} className="hover:text-white transition-colors">Avaliações</a>
            </div>`;

code = code.replace(navOld, navNew);
fs.writeFileSync('src/App.tsx', code);
