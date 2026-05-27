import React, { useState, useEffect } from 'react';
import { Project, TechSkill, Profile, SoundEffectEvent } from './types';
import { DEFAULT_PROFILE, DEFAULT_PROJECTS, DEFAULT_SKILLS } from './data';
import { MangaPanel } from './components/MangaPanel';
import { MangaSpeech } from './components/MangaSpeech';
import { Terminal } from './components/Terminal';
import { AdminPanel } from './components/AdminPanel';
import { 
  ReactionTestGame, 
  TicTacToeGame, 
  SudokuGame, 
  ReflexBubbleGame 
} from './components/InteractiveGames';
import { 
  ShieldAlert, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Layers, 
  Code, 
  Zap, 
  Flame, 
  Terminal as TermIcon, 
  Cpu, 
  Search, 
  Compass, 
  Send,
  Plus,
  BookOpen,
  Briefcase,
  ExternalLink,
  Gamepad2
} from 'lucide-react';

export default function App() {
  // Sync state from LocalStorage or fallback to default
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem('manga_tech_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Force refresh if they have the old placeholder name
        if (parsed.name === "KAPIL YADAV") {
          return DEFAULT_PROFILE;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('manga_tech_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Project[];
        // Force reset if any of the old dummy/mock projects are found
        const hasDummy = parsed.some(p => 
          p.title.includes("NEO-TOKYO") || 
          p.title.includes("AMATERASU") || 
          p.title.includes("SHADOW-REPLICA") || 
          p.title.includes("CHRONOS")
        );
        if (hasDummy) {
          return DEFAULT_PROJECTS;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_PROJECTS;
      }
    }
    return DEFAULT_PROJECTS;
  });

  const [skills, setSkills] = useState<TechSkill[]>(() => {
    const saved = localStorage.getItem('manga_tech_skills');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as TechSkill[];
        // Force reset if old skills layout is detected
        const hasRust = parsed.some(s => s.name.includes("RUST"));
        if (hasRust) {
          return DEFAULT_SKILLS;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_SKILLS;
      }
    }
    return DEFAULT_SKILLS;
  });

  // Navigation / filtering state
  const [projectFilter, setProjectFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(DEFAULT_SKILLS[0]);
  const [adminOpen, setAdminOpen] = useState(false);

  // Dynamic visual sound effects list
  const [soundEffects, setSoundEffects] = useState<SoundEffectEvent[]>([]);
  
  // Custom contact message form state
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [speechText, setSpeechText] = useState("HALT, USER! My server grids are at optimal operating performance. Tap any of my system cores below, or type queries into the hack terminal.");

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('manga_tech_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('manga_tech_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('manga_tech_skills', JSON.stringify(skills));
  }, [skills]);

  // Click handler to trigger shonen style manga sound-effect popups!
  const triggerBoardSoundFx = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid triggering if clicking on input, button, or link elements
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.tagName === 'BUTTON' || 
      target.tagName === 'A' ||
      target.closest('button') || 
      target.closest('a')
    ) {
      return;
    }

    const soundWords = ["KLANK", "BZZZT", "WHOOSH", "SHING", "ZOOM", "BOOM", "DOKI-DOKI", "SLAM", "SWIP"];
    const randomWord = soundWords[Math.floor(Math.random() * soundWords.length)];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newEvent: SoundEffectEvent = {
      id: `sfx-${Date.now()}-${Math.random()}`,
      text: randomWord,
      x,
      y
    };

    setSoundEffects((prev) => [...prev, newEvent]);

    // Cleanup sound effects
    setTimeout(() => {
      setSoundEffects((prev) => prev.filter(item => item.id !== newEvent.id));
    }, 900);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    setIsSending(true);
    
    // Simulate interactive transmission log update
    setTimeout(() => {
      setIsSending(false);
      setSpeechText(`COMM LINK SECURED! Replicating dispatch from user ${contactName.toUpperCase()} across sector grids. Kapil will decrypt this stream immediately.`);
      setContactName("");
      setContactMessage("");
      alert("GRID ENCRYPTED TRANSMISSION SENT SUCCESSFULLY!");
    }, 1200);
  };

  // Filter project categories
  const categories = ['ALL', ...Array.from(new Set(projects.map(p => p.category.toUpperCase())))];
  const filteredProjects = projectFilter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category.toUpperCase() === projectFilter);

  return (
    <div 
      className="min-h-screen bg-[#050505] text-white font-sans relative pb-16 tech-grid uppercase select-none"
      onClick={triggerBoardSoundFx}
    >
      {/* Absolute floating click FX layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 select-none">
        {soundEffects.map((fx) => (
          <span
            key={fx.id}
            style={{ left: fx.x - 30, top: fx.y - 12 }}
            className="absolute bg-[#00f3ff] text-black text-xs md:text-sm font-extrabold font-mono border-2 border-black px-2.5 py-0.5 tracking-wider rotate-[-12deg] z-50 pointer-events-none scale-115 shadow-[2px_2px_0px_0px_rgba(255,0,127,1)] select-none animate-bounce"
          >
            ● {fx.text}!
          </span>
        ))}
      </div>

      {/* STUNNING GLITCH BENTO TOPBAR / CONTROL BAR */}
      <div className="bg-[#0b0b0b] text-gray-400 py-2 px-4 flex justify-between items-center text-[10px] tracking-widest font-mono border-b-4 border-black font-bold z-30 relative select-none">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#00f3ff] rounded-none animate-pulse shrink-0" />
          <span className="text-[#00f3ff]">SYS_METRIC: {profile.status}</span>
        </span>
        <div className="hidden md:flex gap-4 items-center uppercase font-mono">
          <span>COORDINATES: {profile.location}</span>
          <span>●</span>
          <span>STABLE NET GRID 100% SUCCESS RATE</span>
        </div>
        <button
          onClick={() => setAdminOpen(true)}
          className="bg-black hover:bg-[#111] text-[#ff007f] font-extrabold px-3 py-1 border-2 border-[#ff007f] rounded-none flex items-center gap-1.5 text-[9px] cursor-pointer tracking-wider transition-colors"
        >
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" /> SYSTEMS WORKSPACE
        </button>
      </div>

      {/* MAIN LAYOUT HEADER - STYLE PAIRING WITH BEBAS NEUE AND GLITCH TEXT EFFECTS */}
      <header className="max-w-7xl mx-auto px-4 pt-6 md:pt-10 pb-4 select-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-white pb-3 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white flex items-center justify-center border-2 border-black text-black font-bold text-2xl font-serif">
              Ω
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-['Bebas_Neue'] glitch-text italic leading-none">
                {profile.name} // DESIGN_ARCHITECT
              </h1>
              <p className="text-[11px] font-mono tracking-widest text-[#00f3ff] mt-1 font-bold">
                CODENAME: @{profile.hackerAlias} // STATS: LEVEL_{profile.stats.level}
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center uppercase text-xs tracking-widest font-mono shrink-0">
            <span>SYS: ONLINE</span>
            <span className="text-[#00f3ff]">SECURE DECK: {profile.location}</span>
          </div>
        </div>
      </header>

      {/* MASTER COMPLEX BENTO GRID GRID COMPONENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-20">

        {/* 1. BENTO CELL: THE CORE BIOGRAPHY SPECTRUM (col-span-4) */}
        <section className="lg:col-span-4 flex flex-col gap-5">
          <MangaPanel
            soundFx={`LVL_${profile.stats.level}`}
            soundFxPosition="top-left"
            shadowColor="magenta"
            badge="01 // INTEL_BIOGRAPHY"
            className="p-5 flex-1 select-none flex flex-col justify-between"
            id="biography-bento-panel"
            hoverScale={true}
          >
            <div className="halftone absolute inset-0 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              {/* Custom Tech Initials Insignia instead of avatar image */}
              <div className="relative group overflow-hidden border-2 border-black bg-stone-950 flex flex-col items-center justify-center py-7 text-center select-none">
                <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                <div className="manga-lines absolute inset-0 opacity-15 pointer-events-none group-hover:scale-105 transition-transform" />
                
                {/* Visual grid details */}
                <div className="w-20 h-20 bg-black border-4 border-[#00f3ff] text-white flex items-center justify-center font-['Bebas_Neue'] text-4xl tracking-widest relative z-10 shadow-[4px_4px_0px_#ff007f]">
                  KY
                </div>
                
                <p className="font-mono text-[9px] tracking-widest text-[#00f3ff] font-bold mt-4 relative z-10 uppercase">
                  // SECTOR_IDENT: KAPIL_YADAV
                </p>
                <div className="absolute bottom-2 right-2 bg-black text-[#ff007f] text-[9px] font-mono font-bold px-1.5 py-0.5 tracking-widest uppercase border border-[#ff007f]">
                  CORE_CODENAME
                </div>
              </div>

              <div className="speech-bubble inline-block mb-1 text-black bg-white border-2 border-black px-3 py-1 font-['Bebas_Neue'] font-bold tracking-wide italic text-base">
                "I BUILD THE DIGITAL FUTURE!"
              </div>

              <p className="text-xs font-sans text-stone-800 leading-snug font-bold">
                {profile.bio}
              </p>

              {/* Instant Contact Anchors */}
              <div className="flex flex-col gap-1.5 border-t border-black pt-3 font-mono text-[10px] text-stone-900 font-bold">
                <a href="mailto:kapilyadavma@gmail.com" className="flex items-center gap-1.5 hover:text-[#ff007f] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#ff007f]" /> {profile.socials.email}
                </a>
                <a href="https://github.com/Kapil1071" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f3ff] transition-colors">
                  <Github className="w-3.5 h-3.5 text-[#00f3ff]" /> github.com/Kapil1071
                </a>
                <span className="flex items-center gap-1.5 text-stone-700">
                  <MapPin className="w-3.5 h-3.5" /> Mathura, Uttar Pradesh
                </span>
                <span className="flex items-center gap-1.5 text-stone-700">
                  <Cpu className="w-3.5 h-3.5 text-yellow-500 animate-pulse" /> +91-9557610114
                </span>
              </div>
            </div>

            {/* RPG state bars block */}
            <div className="space-y-2 border-t border-black pt-4 mt-4 relative z-10 select-none">
              <span className="text-[9px] font-mono tracking-widest text-stone-500 font-extrabold uppercase flex justify-between select-none">
                <span>CODE_COMPILING RATE</span>
                <span className="text-black">{profile.stats.energyCode}%</span>
              </span>
              <div className="h-4 border-2 border-black bg-stone-100 relative overflow-hidden">
                <div 
                  className="h-full bg-[#ff007f] border-r-2 border-black manga-lines opacity-85 transition-all duration-500"
                  style={{ width: `${profile.stats.energyCode}%` }}
                />
              </div>

              <span className="text-[9px] font-mono tracking-widest text-[#ff007f] font-extrabold uppercase flex justify-between select-none">
                <span>SECTOR STREAK COMMITS</span>
                <span className="text-black">{profile.stats.gitCommits} Commits</span>
              </span>
              <div className="h-4 border-2 border-black bg-stone-100 relative overflow-hidden">
                <div 
                  className="h-full bg-[#00f3ff] border-r-2 border-black transition-all duration-500"
                  style={{ width: '82%' }} // stylized
                />
              </div>

              <span className="text-[9px] font-mono tracking-widest text-stone-500 font-extrabold uppercase flex justify-between select-none">
                <span>COFFEE_METRIC FLUID</span>
                <span className="text-black">{profile.stats.coffeeIntake} ml / 1.5L</span>
              </span>
              <div className="h-4 border-2 border-black bg-stone-100 relative overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 border-r-2 border-black transition-all duration-500"
                  style={{ width: '70%' }}
                />
              </div>
            </div>
          </MangaPanel>
        </section>

        {/* 2. BENTO CELL: EDUCATION, EXPERIENCE & CLI PANEL (col-span-8) */}
        <section className="lg:col-span-8 flex flex-col gap-5">
          {/* Quick Resume timeline credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
            <MangaPanel 
              soundFx="GRADUATE" 
              soundFxPosition="top-right" 
              shadowColor="cyan" 
              badge="02A // ACADEMIC_CREDNETIALS" 
              className="p-4"
              hoverScale={true}
            >
              <div className="space-y-2 select-none">
                <h4 className="font-['Bebas_Neue'] text-lg tracking-wide italic text-black flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00f3ff]" /> B.TECH – CSE (AI & ML)
                </h4>
                <p className="text-[10px] font-mono uppercase bg-black text-[#00f3ff] px-2 py-0.5 inline-block font-extrabold">
                  GLA UNIVERSITY // 2024 – 2028
                </p>
                <p className="text-xs font-sans text-stone-700 leading-relaxed font-bold">
                  Specialising in Artificial Intelligence & Machine Learning, completing full-stack frameworks, digital logic circuits, and algorithmic benchmarks.
                </p>
              </div>
            </MangaPanel>

            <MangaPanel 
              soundFx="WORK_CORE" 
              soundFxPosition="top-right" 
              shadowColor="magenta" 
              badge="02B // FREELANCE_COMMISSION" 
              className="p-4"
              hoverScale={true}
            >
              <div className="space-y-2 select-none">
                <h4 className="font-['Bebas_Neue'] text-lg tracking-wide italic text-black flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#ff007f]" /> STYLIZED DEVELOPER
                </h4>
                <p className="text-[10px] font-mono uppercase bg-black text-[#ff007f] px-2 py-0.5 inline-block font-extrabold">
                  INDEPENDENT CLIENTS // 2023 – PRESENT
                </p>
                <ul className="text-[11px] font-sans text-stone-700 space-y-1 font-bold leading-tight">
                  <li>• Deliver end-to-end design, code, and post-launch SEO.</li>
                  <li>• Draft professional pipelines across automation and AI.</li>
                  <li>• Built complete commercial booking & outreach systems.</li>
                </ul>
              </div>
            </MangaPanel>
          </div>

          <MangaPanel 
            soundFx="TERM_OPERATIONAL" 
            soundFxPosition="top-right" 
            shadowColor="cyan" 
            badge="02C // SECURE_PORT_3000_VM" 
            className="p-5 flex-1 select-text"
            hoverScale={false}
          >
            <div className="mb-3 text-stone-800 select-none">
              <h3 className="text-base font-black font-sans tracking-tight uppercase">INTERACTIVE SYSTEMS CLI</h3>
              <p className="text-[10px] font-mono text-stone-500 font-bold uppercase leading-tight">Advanced diagnostics portal verifying live memory buffers and network matrices. Try typing 'neofetch' or 'sudo admin'!</p>
            </div>

            <Terminal 
              projects={projects} 
              skills={skills} 
              profile={profile} 
              onUnlockAdmin={() => setAdminOpen(true)} 
            />
          </MangaPanel>
        </section>

        {/* 3. BENTO CELL: SKILLS SPECIFICATION MATRIX DECK (col-span-4) */}
        <section className="lg:col-span-4 flex flex-col gap-5">
          <MangaPanel 
            soundFx="FOCUS_TECH" 
            soundFxPosition="top-left" 
            shadowColor="yellow"
            badge="03 // INVENTORY_DECK" 
            className="p-5 flex-1 flex flex-col justify-between select-none"
            hoverScale={true}
          >
            <div className="flex flex-col gap-3 h-full justify-between">
              <div>
                <div className="border-b-2 border-black pb-2 mb-3 font-sans">
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight">KAPIL INTELLIGENCE DECK</h3>
                  <p className="text-[9px] font-mono text-stone-500 font-bold uppercase font-mono">Click skills modules to review tactical specs</p>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[300px] scrollbar-thin">
                  {['languages', 'frameworks', 'tools'].map((cat) => {
                    const items = skills.filter(s => s.category === cat);
                    if (items.length === 0) return null;
                    
                    return (
                      <div key={cat} className="space-y-1">
                        <h4 className="text-[9px] font-mono font-black text-[#ff007f] uppercase tracking-widest pb-1 flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5" /> ● {cat === 'languages' ? 'Baremetal Core Languages' : cat === 'frameworks' ? 'Runtime Framework Speed' : 'Grid Deploy Tools'}
                        </h4>
                        <div className="grid grid-cols-1 gap-1">
                          {items.map((sk) => (
                            <div
                              key={sk.id}
                              onClick={() => {
                                setSelectedSkill(sk);
                                setSpeechText(`INSPECTING MODULE: ${sk.name}. A specialized ${sk.proficiencyLabel} ability calibrating high throughput: "${sk.specialization}"`);
                              }}
                              className={`
                                border-2 
                                border-black 
                                px-2.5 
                                py-1.5 
                                text-left 
                                cursor-pointer 
                                transition-all 
                                duration-150 
                                flex 
                                justify-between 
                                items-center
                                ${selectedSkill?.id === sk.id 
                                  ? 'bg-black text-white translate-x-1 font-bold' 
                                  : 'bg-white text-stone-800 hover:bg-stone-50'
                                }
                              `}
                            >
                              <div className="min-w-0">
                                <p className="text-xs font-mono font-bold tracking-wide truncate uppercase">{sk.name}</p>
                                <p className="text-[9px] font-mono text-stone-400 font-medium truncate">Level {sk.level}/10</p>
                              </div>
                              <span className={`text-[8px] font-mono px-1 border border-black uppercase font-bold text-center ${selectedSkill?.id === sk.id ? 'bg-[#ff007f] text-white' : 'bg-stone-100 text-stone-700'}`}>
                                  {sk.proficiencyLabel}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedSkill && (
                <div className="mt-3 text-stone-900 border-t-2 border-black pt-3">
                  <MangaSpeech speaker={`${profile.hackerAlias}_SYS`} tailPosition="left" bubbleColor="bg-sky-50">
                    <p className="text-[10px] font-mono uppercase bg-black text-[#00f3ff] px-1.5 py-0.5 inline-block font-bold tracking-widest mb-1">
                      ★ {selectedSkill.name} MODULE
                    </p>
                    <p className="text-[11px] text-stone-800 leading-snug font-medium font-sans">
                      "{selectedSkill.specialization}"
                    </p>
                  </MangaSpeech>
                </div>
              )}
            </div>
          </MangaPanel>
        </section>

        {/* 4. TOTAL RETRO ARCADES GRIDS (col-span-8) */}
        <section className="lg:col-span-8 flex flex-col gap-5">
          <MangaPanel 
            soundFx="LET_THE_GAME_BEGIN!" 
            soundFxPosition="top-right" 
            shadowColor="yellow"
            badge="04 // RETRO_SHONEN_ARCADE_GRIDS" 
            className="p-5 flex-1 select-none flex flex-col justify-between"
            hoverScale={false}
          >
            <div>
              <div className="border-b-2 border-black pb-2 mb-4 font-sans">
                <h3 className="text-base md:text-lg font-black uppercase tracking-tight flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-[#ff007f] animate-bounce" /> ARCADE STATION // 4 MINI-GAMES PANEL
                </h3>
                <p className="text-[9px] font-mono text-stone-500 font-bold uppercase font-mono">
                  Calibrate your physical reflexes, logical matrices, and tactic boards directly in-grid!
                </p>
              </div>

              {/* 2x2 Arcade Cabinet Bento Subgrid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cabinet 1: Reaction Signal Calibration */}
                <div className="border-2 border-black p-3 bg-stone-950 text-white rounded-none relative">
                  <ReactionTestGame />
                </div>

                {/* Cabinet 2: Cyber Grid Tic-Tac-Toe */}
                <div className="border-2 border-black p-3 bg-stone-950 text-white rounded-none relative">
                  <TicTacToeGame />
                </div>

                {/* Cabinet 3: Quantum 6x6 Sudoku */}
                <div className="border-2 border-black p-3 bg-stone-950 text-white rounded-none relative">
                  <SudokuGame />
                </div>

                {/* Cabinet 4: Speed Cobra Bubble Tapper */}
                <div className="border-2 border-black p-3 bg-stone-950 text-white rounded-none relative">
                  <ReflexBubbleGame />
                </div>
              </div>
            </div>
          </MangaPanel>
        </section>

        {/* 5. PROJECTS REPOSITORIES REGISTRY (col-span-12) */}
        <section className="lg:col-span-12 flex flex-col gap-5 mt-4">
          <MangaPanel soundFx="COMPILE" soundFxPosition="top-right" shadowColor="black" className="px-4 py-2.5 select-none" hoverScale={false}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-mono">
              <div className="text-left font-sans">
                <span className="text-[12px] font-black tracking-widest text-[#ff007f] uppercase block">
                  ✙ 05 // SYSTEM ARTIFACT REGISTRIES
                </span>
                <p className="text-[9px] font-mono text-stone-500 font-bold uppercase leading-tight mt-0.5">
                  Direct deployments and live production servers containing client deliverables. Click any trigger to browse!
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectFilter(cat)}
                    className={`
                      px-2.5 
                      py-1 
                      font-mono 
                      text-[11px] 
                      font-bold 
                      uppercase 
                      border 
                      border-black 
                      cursor-pointer
                      transition-colors
                      ${projectFilter === cat 
                        ? 'bg-black text-white font-extrabold' 
                        : 'bg-white hover:bg-stone-100 text-stone-700'
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </MangaPanel>

          {/* Catalog bento grid layout items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 select-none">
            {filteredProjects.map((proj) => (
              <MangaPanel
                key={proj.id}
                soundFx={proj.mangaSoundFx}
                soundFxPosition="top-right"
                shadowColor="magenta"
                badge={proj.category}
                id={`project-card-${proj.id}`}
                className="overflow-hidden flex flex-col h-full bg-white group cursor-pointer"
                onClick={() => {
                  setSelectedProject(proj);
                  setSpeechText(`INITIALIZING EXPERT REPLICA VIEWER FOR "${proj.title}". Decrypting source logs and Web UI panels.`);
                }}
              >
                <div className="relative overflow-hidden aspect-video border-b-2 border-black max-h-40 group-hover:scale-102 transition-transform duration-200 bg-stone-900">
                  <div className="manga-lines absolute inset-0 opacity-10 z-10 pointer-events-none" />
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale contrast-125 hover:filter-none transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-[#ff007f]/5 group-hover:bg-transparent transition-colors duration-150" />
                </div>
                
                <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-sm font-black tracking-wide text-black uppercase font-sans">
                        {proj.title}
                      </h4>
                      {proj.liveUrl && (
                        <a 
                          href={proj.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="bg-black hover:bg-[#ff007f] text-white hover:text-black border border-black p-0.5 transition-colors shrink-0"
                          title="Open Live Website Directly"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-[9px] font-mono font-bold tracking-tight text-stone-500 mt-1 uppercase leading-snug">
                      {proj.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 mt-1">
                    {/* Direct explicit trigger links for specific requested projects */}
                    {proj.title.includes("Lavender") && (
                      <a 
                        href="https://lavender-unisex-salon-45041301742.asia-southeast1.run.app" 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="block text-center bg-[#00f3ff] hover:bg-[#2fe6f0] text-black text-[9px] font-mono font-extrabold py-1 border border-black uppercase transition-all shadow-[2px_2px_0px_#000]"
                      >
                        ● LAUNCH LUXURY SALON WEBSITE ●
                      </a>
                    )}
                    {proj.title.includes("Prime Reach") && (
                      <a 
                        href="https://primereach-ai-45041301742.asia-southeast1.run.app/" 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="block text-center bg-[#ff007f] hover:bg-[#eb1078] text-white text-[9px] font-mono font-extrabold py-1 border border-black uppercase transition-all shadow-[2px_2px_0px_#000]"
                      >
                        ● LAUNCH PRIME REACH DECK ●
                      </a>
                    )}

                    <div className="flex flex-wrap gap-1 border-t border-dashed border-stone-300 pt-2">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-stone-50 text-stone-800 text-[8px] font-mono px-1.5 py-0.5 border border-black uppercase font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MangaPanel>
            ))}
          </div>
        </section>

      </main>

      {/* 5. BENTO LOWER INTERACTIVE TIER: HELPMATE & COMMUNICATION PORTAL (col-span-12 footer grids) */}
      <footer className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 relative select-none z-20">
        
        {/* Helpmate feedback companion dialogue */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-2">
          <MangaSpeech speaker={`${profile.hackerAlias}_SYS`} tailPosition="bottom" bubbleColor="bg-white">
            <p className="text-xs font-sans text-stone-800 leading-snug font-bold">
              "{speechText}"
            </p>
          </MangaSpeech>
          <p className="text-[9px] font-mono text-stone-500 font-extrabold uppercase tracking-wider pl-3 select-none">
            ● NEURAL NODE UPDATED LIVE: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Secure Message Transmission Console */}
        <div className="lg:col-span-7 bg-[#111] border-3 border-[#00f3ff] p-5 relative shadow-[6px_6px_0px_#000] max-w-xl self-start w-full">
          <div className="halftone absolute inset-0 pointer-events-none opacity-5" />
          <div className="absolute top-0 right-0 py-1 px-3 bg-[#00f3ff] text-black text-[9px] font-mono uppercase tracking-widest font-black">
            DISPATCH CHANNEL
          </div>
          <h4 className="font-extrabold font-sans text-sm tracking-widest text-[#00f3ff] border-b-2 border-stone-800 pb-2 uppercase mb-4">
            ✙ TRANSMIT SECURE MESSAGE VIA PORT 3000
          </h4>
          
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="flex flex-col gap-1.5 font-mono text-gray-400">
              <label className="text-[9px] uppercase font-bold text-stone-500">CORP SENDER IDENTIFIER (NAME)</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="border border-stone-800 bg-[#0a0a0a] text-white px-3 py-2 text-xs w-full focus:border-[#00f3ff] focus:outline-none placeholder-stone-700"
                placeholder="USER_NAME_0x23"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 font-mono text-gray-400">
              <label className="text-[9px] uppercase font-bold text-stone-500 font-extrabold">DISPATCH MESSAGE PAYLOAD (ENCRYPTED TEXT)</label>
              <textarea
                rows={2}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                className="border border-stone-800 bg-[#0a0a0a] text-white px-3 py-2 text-xs w-full focus:border-[#00f3ff] focus:outline-none placeholder-stone-700"
                placeholder="Input communication stream..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#00f3ff] hover:bg-[#33f5ff] text-black text-xs font-mono font-bold tracking-widest uppercase border-3 border-transparent hover:border-black shadow-[3px_3px_0px_0px_rgba(255,0,127,1)] flex items-center justify-center gap-2 cursor-pointer py-3 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              {isSending ? "ENCRYPTING COMPILATION STREAM..." : "[ FIRE DISPATCH TRACER ]"}
            </button>
          </form>
        </div>
      </footer>

      {/* DEEP COMIC OVERVIEW MODAL ON CARD DETECTOR CLICKED */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <MangaPanel
            soundFx={selectedProject.mangaSoundFx}
            soundFxPosition="top-right"
            shadowColor="yellow"
            className="w-full max-w-2xl bg-white border-4 border-black p-5"
            hoverScale={false}
          >
            <div className="flex flex-col gap-4 select-text">
              <div className="flex justify-between items-start border-b-4 border-black pb-3">
                <div>
                  <span className="bg-[#ff007f] text-white border border-black px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black font-sans text-black tracking-tight uppercase leading-tight mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-black text-white hover:bg-stone-800 text-xs font-mono font-extrabold px-3 py-1.5 border-2 border-black cursor-pointer uppercase"
                >
                  DISMISS [ESC]
                </button>
              </div>

              {/* Grid content details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-2">
                <div className="md:col-span-5 border-2 border-black overflow-hidden relative bg-stone-900">
                  <div className="manga-lines absolute inset-0 opacity-15 pointer-events-none" />
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover aspect-video filter grayscale contrast-125"
                  />
                </div>
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-bold font-mono tracking-wide text-[#ff007f] uppercase leading-none">
                      // DIRECTIVE OVERVIEW:
                    </p>
                    <p className="text-xs md:text-sm text-stone-800 leading-relaxed font-sans font-bold">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-stone-50 text-stone-900 border border-black font-mono text-[9px] uppercase font-extrabold px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons redirects */}
              <div className="flex gap-2.5 border-t border-stone-200 pt-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-black hover:bg-stone-800 text-white font-mono text-xs font-bold py-2 px-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,0,127,1)] uppercase"
                  >
                    DEPLOYED CORE SOURCE (GITHUB)
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-[#00f3ff] hover:bg-[#33f5ff] text-black font-mono text-xs font-extrabold py-2 px-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,191,0,1)] uppercase"
                  >
                    TRIGGER LIVE DEMO LINK
                  </a>
                )}
              </div>
            </div>
          </MangaPanel>
        </div>
      )}

      {/* ADMIN CONTROL WORKSPACE OVERLAY PANEL */}
      {adminOpen && (
        <AdminPanel
          profile={profile}
          projects={projects}
          skills={skills}
          onUpdateProfile={(p) => setProfile(p)}
          onUpdateProjects={(p) => setProjects(p)}
          onUpdateSkills={(s) => setSkills(s)}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}
