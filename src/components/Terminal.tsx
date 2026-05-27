import React, { useState, useRef, useEffect } from 'react';
import { Project, TechSkill, Profile } from '../types';

interface TerminalProps {
  projects: Project[];
  skills: TechSkill[];
  profile: Profile;
  onUnlockAdmin: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  projects,
  skills,
  profile,
  onUnlockAdmin,
}) => {
  const [history, setHistory] = useState<string[]>([
    "KAPIL_CORP NEURAL OPERATING SYSTEM [version 1.0.99]",
    "(c) 2026 Kapil Yadav. All systems operational.",
    "Type 'help' to fetch active protocols, or 'neofetch' for system metadata.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, `kapil_dev@grid_3000 ~$ ${cmdStr}`];

    switch (command) {
      case 'help':
        newHistory.push(
          "AVAILABLE TELEMETRY COMMANDS:",
          "  neofetch      - Displays stylized computer/manga ASCII & system data",
          "  about         - Shows developer persona & tech mindset",
          "  projects      - Lists all active projects in the secure matrix",
          "  skills        - Outputs S-Rank developer specialization layers",
          "  sudo admin    - Triggers admin key panel verification override",
          "  contact       - Fetches secure comm links",
          "  clear         - Flushes terminal output buffer"
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal("");
        return;

      case 'neofetch':
        newHistory.push(
          "           .-'\"'-._",
          "         .'  _   _  '.      OS: MangaTech OS v2026-05.20",
          "        /   (o) (o)   \\     HOST: Grid-Node-3000.Run.App",
          "       |               |    KERNEL: Web-Consensus-5.8.5",
          "       |   \\  ___  /   |    UPTIME: 1337 mins",
          "        \\   '---'   /     SHELL: /bin/manga-sh",
          "         '.       .'        THEME: Brutalist Hacker Monochrome",
          "           '-...-'          CPU: ThreadRipper Web Core (Virtualized)",
          "                            MEMORY: 64 MB / 1024 MB (Allocated)",
          `                            DEVELOPER: ${profile.name}`,
          `                            CODE LEVEL: Rank-${profile.stats.level} Warrior`
        );
        break;

      case 'about':
        newHistory.push(
          `--- PERSONA PROTOCOL ---`,
          `NAME: ${profile.name} // ALIAS: ${profile.hackerAlias}`,
          `TITLE: ${profile.title}`,
          `BIO: ${profile.bio}`,
          `LOCATION: ${profile.location}`,
          `CURRENT STATUS: ${profile.status}`
        );
        break;

      case 'projects':
        newHistory.push("--- COMPILED ARTIFACTS IN DATABASE ---");
        projects.forEach((p, idx) => {
          newHistory.push(
            `[0${idx + 1}] ${p.title} (${p.category})`,
            `     Tagline: "${p.tagline}"`,
            `     SFX Trigger: *${p.mangaSoundFx}*`,
            `     Tech: ${p.techStack.join(', ')}`,
            ''
          );
        });
        break;

      case 'skills':
        newHistory.push("--- S-RANK SPELLS & SPECIALIZATIONS ---");
        const categorized: Record<string, typeof skills> = {};
        skills.forEach(s => {
          if (!categorized[s.category]) categorized[s.category] = [];
          categorized[s.category].push(s);
        });

        Object.entries(categorized).forEach(([cat, list]) => {
          newHistory.push(`● CATEGORY: ${cat.toUpperCase()}`);
          list.forEach(s => {
            newHistory.push(`  - [${s.proficiencyLabel}] ${s.name} (Lvl ${s.level}/10)`);
            newHistory.push(`    Spec: ${s.specialization}`);
          });
          newHistory.push('');
        });
        break;

      case 'sudo':
        if (args[0] === 'admin') {
          newHistory.push(
            "CRITICAL ACCESS CODE DETECTED.",
            "Routing to Admin Panel Portal... OVERRIDE GRANTED."
          );
          onUnlockAdmin();
        } else {
          newHistory.push("Usage: sudo admin");
        }
        break;

      case 'contact':
        newHistory.push(
          "--- SECURE COMMUNICATION CHANNELS ---",
          `  Email:    ${profile.socials.email}`,
          `  GitHub:   ${profile.socials.github}`,
          `  Twitter:  ${profile.socials.twitter}`,
          `  LinkedIn: ${profile.socials.linkedin}`,
          "",
          "Use the graphical contact portal to send instant secure pings!"
        );
        break;

      default:
        newHistory.push(
          `command not found: '${command}'.`,
          "Type 'help' to review active subroutines."
        );
    }

    newHistory.push("");
    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="w-full bg-stone-950 text-emerald-400 font-mono text-xs md:text-sm p-4 h-80 rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col relative scanline overflow-hidden select-text">
      {/* Top terminal bar */}
      <div className="absolute top-0 left-0 right-0 bg-black border-b-2 border-black flex justify-between items-center px-4 py-1.5 text-stone-400 font-bold tracking-wider text-[11px] select-none z-10">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full" />
          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
          <span className="w-2.5 h-2.5 bg-green-600 rounded-full" />
          <span className="ml-2">TERMINAL_MATRIX_PORT_3000.sh</span>
        </span>
        <span className="animate-pulse bg-emerald-950/40 text-[9px] text-emerald-400 font-normal px-2 py-0.5 border border-emerald-500/30">
          SECURE_NODE_127.0.0.1
        </span>
      </div>

      {/* Terminal logs */}
      <div className="flex-1 overflow-y-auto mt-7 pr-2 font-mono scrollbar-thin scrollbar-thumb-stone-800 space-y-1">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre">
            {line.startsWith('kapil_dev@grid_3000 ~$') ? (
              <span className="text-amber-400">{line}</span>
            ) : line.includes('---') || line.includes('●') ? (
              <span className="text-cyan-400 font-bold">{line}</span>
            ) : line.includes('S-RANK') ? (
              <span className="text-white bg-red-600 px-1 font-bold">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 bg-stone-900/60 p-2 border-t border-stone-800 -mx-4 -mb-4 mt-2 select-text">
        <span className="text-amber-400 font-bold">kapil_dev@grid_3000 ~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-emerald-400 outline-none font-mono text-xs md:text-sm select-text border-0 p-0 focus:ring-0"
          placeholder="type 'help'..."
          autoFocus={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
};
