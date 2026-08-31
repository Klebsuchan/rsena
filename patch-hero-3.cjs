const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const heroSectionOpen = `<section className="relative min-h-[90vh] pt-6 pb-12 px-6 lg:px-12 flex flex-col items-center overflow-hidden">`;

const mobileVideoInsert = `
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
`;

code = code.replace(heroSectionOpen, heroSectionOpen + mobileVideoInsert);

// Now change the existing video right column
const rightColumnOld = `{/* Right Column: Hero Car Image */}
            <motion.div 
              style={{ y: heroCarY }}
              className="w-full lg:w-[45%] relative mt-12 lg:mt-0 flex items-center justify-center lg:justify-end z-10"
            >`;

const rightColumnNew = `{/* Right Column: Hero Car Image */}
            <motion.div 
              style={{ y: heroCarY }}
              className="hidden lg:flex w-full lg:w-[45%] relative mt-12 lg:mt-0 items-center justify-center lg:justify-end z-10"
            >`;

code = code.replace(rightColumnOld, rightColumnNew);

// Make the Left Column title text white on mobile so it pops better over the video
// We also need to add a bit of top margin on mobile so it sits near the center/bottom of the video.
const leftColumnOld = `className="w-full lg:w-[55%] flex flex-col justify-center relative z-40"`;
const leftColumnNew = `className="w-full lg:w-[55%] flex flex-col justify-center relative z-40 mt-[35svh] lg:mt-0"`;

code = code.replace(leftColumnOld, leftColumnNew);

// Adjust review card for mobile so it fits nicely
// Currently: w-full lg:w-auto relative z-40 bg-[#121212] p-6 rounded-[24px] border border-white/5 max-w-sm mt-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]
const reviewCardOld = `className="w-full lg:w-auto relative z-40 bg-[#121212] p-6 rounded-[24px] border border-white/5 max-w-sm mt-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"`;
const reviewCardNew = `className="w-full lg:w-auto relative z-40 bg-black/60 backdrop-blur-xl lg:bg-[#121212] p-6 rounded-[24px] border border-white/10 lg:border-white/5 max-w-sm mt-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"`;

code = code.replace(reviewCardOld, reviewCardNew);


fs.writeFileSync('src/App.tsx', code);
