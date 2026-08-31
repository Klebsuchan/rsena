const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace top header button
code = code.replace(
  /<a href="https:\/\/wa.me\/555481043307" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-zinc-800 rounded-full hover:border-\[#E3242B\] hover:text-\[#E3242B\] transition-colors text-white font-semibold">\s*Agendar Horário\s*<\/a>/,
  '<button onClick={() => setIsScheduleModalOpen(true)} className="px-6 py-3 border border-zinc-800 rounded-full hover:border-[#E3242B] hover:text-[#E3242B] transition-colors text-white font-semibold">Agendar Horário</button>'
);

// Replace hero button "Agendar Avaliação"
code = code.replace(
  /<button className="mt-10 px-8 py-4 border border-zinc-700 rounded-full text-sm font-medium hover:border-\[#E3242B\] hover:text-\[#E3242B\] transition-all flex items-center gap-3">/,
  '<button onClick={() => setIsScheduleModalOpen(true)} className="mt-10 px-8 py-4 border border-zinc-700 rounded-full text-sm font-medium hover:border-[#E3242B] hover:text-[#E3242B] transition-all flex items-center gap-3">'
);

// Replace SOLICITAR ORÇAMENTO button
code = code.replace(
  /whileTap={{ scale: 0\.98 }}\s*className="relative h-14 w-full bg-\[#E3242B\] rounded-xl flex items-center justify-center text-white font-black text-sm uppercase tracking-wider"/,
  'whileTap={{ scale: 0.98 }}\n                      onClick={() => setIsScheduleModalOpen(true)}\n                      className="relative h-14 w-full bg-[#E3242B] rounded-xl flex items-center justify-center text-white font-black text-sm uppercase tracking-wider"'
);

fs.writeFileSync('src/App.tsx', code);
