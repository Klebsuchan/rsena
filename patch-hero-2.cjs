const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeroRight = `{/* Right Column: Hero Car Image */}
            <motion.div 
              style={{ y: heroCarY }}
              className="w-full lg:w-[45%] relative mt-12 lg:mt-0 flex items-center justify-center lg:justify-end z-10"
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
            </motion.div>`;

const newHeroRight = `{/* Right Column: Hero Car Image (Desktop) */}
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
            </motion.div>`;

// We will also add a Mobile-Only Full Bleed Background Video before the nav.
const oldHeroSectionTop = `<section className="min-h-screen relative flex flex-col items-center justify-center px-4 lg:px-12 pt-32 pb-12 overflow-hidden">`;

const newHeroSectionTop = `<section className="min-h-[100svh] relative flex flex-col items-center justify-center px-4 lg:px-12 pt-24 lg:pt-32 pb-12 overflow-hidden lg:overflow-visible">
          {/* Mobile Edge-to-Edge Video Background */}
          <div className="absolute inset-0 z-0 lg:hidden pointer-events-none overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: mounted ? 1 : 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-[65svh] relative"
            >
              <video 
                src="/herobackground.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover brightness-[0.85]"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30"></div>
            </motion.div>
          </div>`;

code = code.replace(oldHeroRight, newHeroRight);
code = code.replace(oldHeroSectionTop, newHeroSectionTop);

// Ensure the Left Column Typography stays above the background.
// We should add a bit of top margin on mobile so it sits nicely on the video.
const oldLeftColumn = `className="w-full lg:w-[55%] flex flex-col justify-center relative z-40"`;
const newLeftColumn = `className="w-full lg:w-[55%] flex flex-col justify-center relative z-40 mt-[30svh] lg:mt-0"`;
code = code.replace(oldLeftColumn, newLeftColumn);

fs.writeFileSync('src/App.tsx', code);
