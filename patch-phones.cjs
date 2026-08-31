const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Change the phones container
code = code.replace(
  'className="relative h-[600px] lg:h-[800px] w-full flex justify-center items-center perspective-[2000px]"',
  'className="relative h-[850px] lg:h-[800px] w-full flex justify-center items-center perspective-[2000px]"'
);

// Phone 1 (Orçamento rápido)
const phone1Old = 'className="absolute left-[5%] lg:left-[15%] top-[5%] lg:top-[10%] w-[260px] lg:w-[280px] h-[560px] lg:h-[580px] bg-[#161616] rounded-[40px] border-[6px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10"';
const phone1New = 'className="absolute left-[5%] lg:left-[15%] top-0 lg:top-[10%] w-[260px] lg:w-[280px] h-[560px] lg:h-[580px] bg-[#161616] rounded-[40px] border-[6px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-20"';
code = code.replace(phone1Old, phone1New);

// Phone 2 (Nossos trabalhos)
const phone2Old = 'className="absolute right-[5%] lg:right-[10%] top-[30%] lg:top-[25%] w-[260px] lg:w-[280px] h-[560px] lg:h-[580px] bg-[#111] rounded-[40px] border-[6px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-20"';
const phone2New = 'className="absolute right-[5%] lg:right-[10%] top-[48%] lg:top-[25%] w-[260px] lg:w-[280px] h-[560px] lg:h-[580px] bg-[#111] rounded-[40px] border-[6px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10 lg:z-20"';
code = code.replace(phone2Old, phone2New);

fs.writeFileSync('src/App.tsx', code);
