import React, { useState } from 'react';
import { Project, TechSkill, Profile } from '../types';
import { MangaPanel } from './MangaPanel';
import { MangaSpeech } from './MangaSpeech';
import { Shield, Plus, Trash2, Edit2, Check, X, Download, Upload, AlertCircle } from 'lucide-react';

interface AdminPanelProps {
  profile: Profile;
  projects: Project[];
  skills: TechSkill[];
  onUpdateProfile: (p: Profile) => void;
  onUpdateProjects: (p: Project[]) => void;
  onUpdateSkills: (s: TechSkill[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  profile,
  projects,
  skills,
  onUpdateProfile,
  onUpdateProjects,
  onUpdateSkills,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [authError, setAuthError] = useState("");

  // Edit states
  const [tempProfile, setTempProfile] = useState<Profile>({ ...profile });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    category: "",
    tagline: "",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
    techStack: [],
    completedDate: "",
    mangaSoundFx: "WHOOSH!",
  });
  const [newTech, setNewTech] = useState("");

  const [newSkill, setNewSkill] = useState<Partial<TechSkill>>({
    name: "",
    category: "languages",
    level: 7,
    proficiencyLabel: "A-RANK",
    specialization: "",
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'terminal-data'>('projects');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized credentials check
    const validKeys = ['kapil1234@', 'kapil1234@1234', 'admin', 'manga'];
    if (validKeys.includes(passphrase.toLowerCase())) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("INCORRECT SECURITY ACCESS CODE. OVERRIDE TERMINATED.");
    }
  };

  // Profile saving
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(tempProfile);
    alert("SYSTEM MATRIX UPDATED: Profile credentials modified successfully!");
  };

  // Projects CRM
  const handleAddProject = () => {
    if (!newProject.title || !newProject.category) {
      alert("Missing required details! Energy levels insufficient for compilation.");
      return;
    }
    const id = `proj-${Date.now()}`;
    const addedProj: Project = {
      id,
      title: newProject.title || "UNTITLED PROJECT",
      category: newProject.category || "SYSTEMS",
      tagline: newProject.tagline || "",
      description: newProject.description || "",
      imageUrl: newProject.imageUrl || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
      techStack: newProject.techStack || [],
      liveUrl: newProject.liveUrl || "",
      githubUrl: newProject.githubUrl || "",
      completedDate: newProject.completedDate || new Date().toISOString().split('T')[0],
      mangaSoundFx: newProject.mangaSoundFx || "WHOOSH!",
    };
    onUpdateProjects([...projects, addedProj]);
    // Reset form
    setNewProject({
      title: "",
      category: "",
      tagline: "",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
      techStack: [],
      completedDate: "",
      mangaSoundFx: "WHOOSH!",
    });
    alert("PROJECT COMPILED IN GRID SYSTEM!");
  };

  const handleEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setNewProject({ ...p });
  };

  const handleUpdateProject = () => {
    if (!editingProjectId) return;
    const updated = projects.map(p => {
      if (p.id === editingProjectId) {
        return { ...p, ...newProject } as Project;
      }
      return p;
    });
    onUpdateProjects(updated);
    setEditingProjectId(null);
    setNewProject({
      title: "",
      category: "",
      tagline: "",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
      techStack: [],
      completedDate: "",
      mangaSoundFx: "WHOOSH!",
    });
    alert("GRID ARTIFACT UPDATED!");
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to purge this project from grid memory?")) {
      onUpdateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleAddTechTag = () => {
    if (!newTech.trim()) return;
    const currentTags = newProject.techStack || [];
    if (!currentTags.includes(newTech.trim())) {
      setNewProject({
        ...newProject,
        techStack: [...currentTags, newTech.trim()]
      });
    }
    setNewTech("");
  };

  const handleRemoveTechTag = (tag: string) => {
    setNewProject({
      ...newProject,
      techStack: (newProject.techStack || []).filter(t => t !== tag)
    });
  };

  // Skills edits
  const handleAddSkill = () => {
    if (!newSkill.name) {
      alert("Name required!");
      return;
    }
    const addedSkill: TechSkill = {
      id: `sk-${Date.now()}`,
      name: newSkill.name.toUpperCase(),
      category: newSkill.category || "languages",
      level: Number(newSkill.level) || 5,
      proficiencyLabel: newSkill.proficiencyLabel || "A-RANK",
      specialization: newSkill.specialization || "General Core Integration",
    };
    onUpdateSkills([...skills, addedSkill]);
    setNewSkill({
      name: "",
      category: "languages",
      level: 7,
      proficiencyLabel: "A-RANK",
      specialization: "",
    });
    alert("SKILL MEMORIZED!");
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm("Purge this skill branch?")) {
      onUpdateSkills(skills.filter(s => s.id !== id));
    }
  };

  // Export/Import Backup Core CONFIG (The ultimate developer feature!)
  const handleExportData = () => {
    const dataStr = JSON.stringify({ profile, projects, skills }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${profile.hackerAlias || 'manga-tech'}_portfolio_config.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.profile && parsed.projects && parsed.skills) {
            onUpdateProfile(parsed.profile);
            onUpdateProjects(parsed.projects);
            onUpdateSkills(parsed.skills);
            setTempProfile({ ...parsed.profile });
            alert("MATRIX CONFIG LOADED SUCCESS: Portfolio completely transformed!");
          } else {
            alert("Invalid configuration structure! Missing core nodes.");
          }
        } catch (err) {
          alert("Error parsing JSON config file! Re-check syntax consistency.");
        }
      };
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <MangaPanel
          soundFx="SUDO_ACCESS?"
          soundFxPosition="top-right"
          shadowColor="magenta"
          className="w-full max-w-md p-6 bg-stone-900 border-4 border-black"
          id="admin-auth-panel"
          hoverScale={false}
        >
          <div className="flex flex-col gap-4 text-white">
            <div className="flex items-center gap-3 border-b-2 border-stone-800 pb-3">
              <Shield className="w-8 h-8 text-pink-500 animate-tech-blink" />
              <div>
                <h3 className="text-xl font-black font-sans tracking-wide">ADMIN OVERRIDE CONSOLE</h3>
                <p className="text-[10px] text-stone-400 font-mono font-semibold">GRID_LEVEL_05 SECURITY DECK</p>
              </div>
            </div>

            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              Verify your security credentials to unlock the visual matrix and adjust projects, skills trackers, and core developer logs.
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono tracking-widest text-pink-400 font-extrabold uppercase">MATRIX ACCESS KEY</label>
                <input
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="bg-black border-2 border-pink-500/80 px-3 py-2 text-white font-mono placeholder-stone-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-none w-full"
                  placeholder="Enter Passkey..."
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 bg-red-950/50 border border-red-500/40 p-2.5 text-red-400 text-[10px] font-mono leading-none uppercase">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 hover:bg-pink-500 font-bold border-2 border-black py-2.5 text-xs uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  [ DECODE_GRID ]
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-stone-800 hover:bg-stone-700 font-mono text-stone-300 border-2 border-black px-4 py-2.5 text-xs uppercase cursor-pointer"
                >
                  ABORT
                </button>
              </div>
            </form>
          </div>
        </MangaPanel>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-50 overflow-y-auto p-4 md:p-8 flex justify-center items-start select-text">
      <MangaPanel
        soundFx="ADMIN_DECK!"
        soundFxPosition="top-right"
        shadowColor="cyan"
        className="w-full max-w-4xl bg-stone-50 border-4 border-black p-4 md:p-6"
        id="admin-workspace-panel"
        hoverScale={false}
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-black pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-none inline-block animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">SYSTEMS WORKSPACE</h2>
              </div>
              <p className="text-xs font-mono text-stone-600">
                AUTHORIZED USER PROFILE: <span className="font-bold text-cyan-600">{profile.hackerAlias}</span> // LOCALHOST:3000
              </p>
            </div>

            {/* Quick backup actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportData}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 font-bold text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 border-2 border-black"
                title="Download entire config file"
              >
                <Download className="w-3.5 h-3.5" /> Export DB
              </button>
              <label
                className="flex items-center gap-1 bg-black hover:bg-stone-800 text-white font-bold text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 border-2 border-black cursor-pointer align-middle"
              >
                <Upload className="w-3.5 h-3.5" /> Import DB
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-400 text-white font-bold text-[11px] uppercase tracking-wider px-3 py-1.5 border-2 border-black cursor-pointer"
              >
                CLOSE [X]
              </button>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b-2 border-black select-none overflow-x-auto">
            {['profile', 'projects', 'skills'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  px-4 
                  py-2 
                  font-mono 
                  text-xs 
                  md:text-sm 
                  font-black 
                  uppercase 
                  border-t-2 
                  border-r-2 
                  border-black 
                  -mb-[2px] 
                  transition-all
                  cursor-pointer
                  ${activeTab === tab 
                    ? 'bg-black text-white py-2.5' 
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                  }
                `}
              >
                {tab === 'profile' && 'IDENTITY NODES'}
                {tab === 'projects' && 'ARTIFACT PROJECTS'}
                {tab === 'skills' && 'SKILLS INVENTORIES'}
              </button>
            ))}
          </div>

          {/* TAB 1: PROFILE / IDENTITY NODES */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">Developer Real Name</label>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="border-2 border-black bg-white px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">Hacker Alias / ID Tag</label>
                  <input
                    type="text"
                    value={tempProfile.hackerAlias}
                    onChange={(e) => setTempProfile({ ...tempProfile, hackerAlias: e.target.value })}
                    className="border-2 border-black bg-white px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">Manga Hero Title</label>
                  <input
                    type="text"
                    value={tempProfile.title}
                    onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                    className="border-2 border-black bg-white px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">Avatar Illustration URL</label>
                  <input
                    type="text"
                    value={tempProfile.avatarUrl}
                    onChange={(e) => setTempProfile({ ...tempProfile, avatarUrl: e.target.value })}
                    className="border-2 border-black bg-white px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">GRID Node Grid Coordinates / Location</label>
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                    className="border-2 border-black bg-white px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">Telemetry Status Indicator</label>
                  <input
                    type="text"
                    value={tempProfile.status}
                    onChange={(e) => setTempProfile({ ...tempProfile, status: e.target.value })}
                    className="border-2 border-black bg-white px-3 py-2 text-xs font-mono text-emerald-600 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono font-bold uppercase text-stone-700">Brief Developer Shonen Manifesto / Bio</label>
                <textarea
                  rows={3}
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                  className="border-2 border-black bg-white px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-black pt-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-500">Code Energy %</label>
                  <input
                    type="number"
                    value={tempProfile.stats.energyCode}
                    onChange={(e) => setTempProfile({
                      ...tempProfile,
                      stats: { ...tempProfile.stats, energyCode: Number(e.target.value) }
                    })}
                    className="border-2 border-black bg-white px-2 py-1 text-sm font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-500">Commits Count</label>
                  <input
                    type="number"
                    value={tempProfile.stats.gitCommits}
                    onChange={(e) => setTempProfile({
                      ...tempProfile,
                      stats: { ...tempProfile.stats, gitCommits: Number(e.target.value) }
                    })}
                    className="border-2 border-black bg-white px-2 py-1 text-sm font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-500">Coffee Fluid Intake</label>
                  <input
                    type="number"
                    value={tempProfile.stats.coffeeIntake}
                    onChange={(e) => setTempProfile({
                      ...tempProfile,
                      stats: { ...tempProfile.stats, coffeeIntake: Number(e.target.value) }
                    })}
                    className="border-2 border-black bg-white px-2 py-1 text-sm font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-500">Hacker level</label>
                  <input
                    type="number"
                    value={tempProfile.stats.level}
                    onChange={(e) => setTempProfile({
                      ...tempProfile,
                      stats: { ...tempProfile.stats, level: Number(e.target.value) }
                    })}
                    className="border-2 border-black bg-white px-2 py-1 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-dashed border-stone-400 pt-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">Contact Email</label>
                  <input
                    type="email"
                    value={tempProfile.socials.email}
                    onChange={(e) => setTempProfile({
                      ...tempProfile,
                      socials: { ...tempProfile.socials, email: e.target.value }
                    })}
                    className="border-2 border-black bg-white px-3 py-1.5 text-sm font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold uppercase text-stone-700">GitHub Node Link</label>
                  <input
                    type="text"
                    value={tempProfile.socials.github}
                    onChange={(e) => setTempProfile({
                      ...tempProfile,
                      socials: { ...tempProfile.socials, github: e.target.value }
                    })}
                    className="border-2 border-black bg-white px-3 py-1.5 text-sm font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 font-bold border-4 border-black py-3 text-sm tracking-widest uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-100 active:translate-y-1 active:translate-x-0.5 cursor-pointer"
              >
                COMPILE MODULES NOW!
              </button>
            </form>
          )}

          {/* TAB 2: PROJECTS CRM */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Add New or Edit Project Form */}
              <div className="bg-stone-100 p-4 border-4 border-black border-dashed">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-mono text-sm font-black text-black border-b-2 border-black pb-1 uppercase">
                    {editingProjectId ? `⚡ EDIT ARTIFACT INDEXED: ${editingProjectId}` : '✙ REPLICATE NEW TARGET PROJECT'}
                  </h4>
                  {editingProjectId && (
                    <button
                      onClick={() => {
                        setEditingProjectId(null);
                        setNewProject({
                          title: "",
                          category: "",
                          tagline: "",
                          description: "",
                          imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
                          techStack: [],
                          completedDate: "",
                          mangaSoundFx: "WHOOSH!",
                        });
                      }}
                      className="text-xs font-mono text-red-500 underline font-bold"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Project Title</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-black"
                      placeholder="e.g. AMATERASU COMPILER"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Category / Sphere</label>
                    <input
                      type="text"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs"
                      placeholder="e.g. DEV OPS / BLOCKCHAIN"
                    />
                  </div>

                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[11px] font-mono font-semibold uppercase">Catchy Shonen Tagline</label>
                    <input
                      type="text"
                      value={newProject.tagline}
                      onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs w-full"
                      placeholder="e.g. AST Compiler generating zero allocation WASM code"
                    />
                  </div>

                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[11px] font-mono font-semibold uppercase">Action Description</label>
                    <textarea
                      rows={2}
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs"
                      placeholder="Details of code structure..."
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Manga Sound FX Word</label>
                    <input
                      type="text"
                      value={newProject.mangaSoundFx}
                      onChange={(e) => setNewProject({ ...newProject, mangaSoundFx: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs font-mono"
                      placeholder="e.g. VRRM!, CLACK!, BOOM!"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Blueprint Thumbnail URL</label>
                    <input
                      type="text"
                      value={newProject.imageUrl}
                      onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-[10px] font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Live Demo Link</label>
                    <input
                      type="text"
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">GitHub Repository Link</label>
                    <input
                      type="text"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Tech Stack Chips editor */}
                <div className="mt-4 border-t border-stone-300 pt-3">
                  <label className="text-[11px] font-mono font-semibold uppercase block mb-1">Interactive Tech Stack Modules</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechTag())}
                      className="border-2 border-black bg-white px-3 py-1 text-xs font-mono flex-1"
                      placeholder="Type e.g. Rust, WASM and press enter..."
                    />
                    <button
                      type="button"
                      onClick={handleAddTechTag}
                      className="bg-black hover:bg-stone-800 text-white text-xs px-4 border-2 border-black font-mono font-bold uppercase cursor-pointer"
                    >
                      ADD CHIP
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(newProject.techStack || []).map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 bg-white text-[10px] font-mono px-2 py-0.5 border border-black uppercase font-bold text-black"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechTag(tag)}
                          className="text-red-500 hover:text-red-700 font-black shrink-0 px-0.5 text-[11px]"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={editingProjectId ? handleUpdateProject : handleAddProject}
                  className="w-full bg-magenta-500 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase py-2.5 mt-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] tracking-widest cursor-pointer"
                >
                  {editingProjectId ? '⚡ COMMIT COMPILATION CHANGES' : '✙ REPLICATE TARGET TO GRID'}
                </button>
              </div>

              {/* Existing Projects grid directory list */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-extrabold pb-1">COMPILATION METADATA RECORD ({projects.length} PROJECTS INDEXED)</p>
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex justify-between items-center bg-white border-2 border-black px-4 py-2.5 gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-black border border-black px-1.5 py-0.2 bg-stone-100 text-stone-700">{proj.category}</span>
                        <h5 className="text-xs font-extrabold truncate text-stone-900 font-sans tracking-wide">{proj.title}</h5>
                      </div>
                      <p className="text-[10px] font-mono text-stone-500 truncate mt-0.5">FX: *{proj.mangaSoundFx}* // STACK: {proj.techStack.join(', ')}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="bg-yellow-400 hover:bg-yellow-300 border border-black p-1 text-black cursor-pointer align-middle"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="bg-red-500 hover:bg-red-400 border border-black p-1 text-white cursor-pointer align-middle"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS INVENTORIES */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="bg-stone-100 p-4 border-4 border-black border-dashed">
                <h4 className="font-mono text-sm font-black text-black border-b-2 border-black pb-1 uppercase mb-3">✙ EXTEND SKILL MATRIX NODE</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Skill Name</label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs uppercase"
                      placeholder="e.g. KUBERNETES"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Category</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                      className="border-2 border-black bg-white px-2 py-1 text-xs"
                    >
                      <option value="languages">Languages (Baremetal spells)</option>
                      <option value="frameworks">Frameworks (Speed loops)</option>
                      <option value="tools">Tools (Deploy nodes)</option>
                      <option value="concepts">Concepts (Mind systems)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Hacker Proficiency Level (1-10)</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                      className="border-2 border-black bg-white px-2.5 py-1 text-xs font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono font-semibold uppercase">Rank / Sensation Title</label>
                    <input
                      type="text"
                      value={newSkill.proficiencyLabel}
                      onChange={(e) => setNewSkill({ ...newSkill, proficiencyLabel: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1 text-xs font-mono uppercase"
                      placeholder="e.g. S-RANK, JONIN, MASTER"
                    />
                  </div>

                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[11px] font-mono font-semibold uppercase">Specialization Scope Detail</label>
                    <input
                      type="text"
                      value={newSkill.specialization}
                      onChange={(e) => setNewSkill({ ...newSkill, specialization: e.target.value })}
                      className="border-2 border-black bg-white px-2.5 py-1.5 text-xs w-full"
                      placeholder="e.g. Container clusters, ingress pipelines, high-security microservices"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase py-2.5 mt-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] tracking-widest cursor-pointer"
                >
                  [ INCULCATE SKILL ASSET ]
                </button>
              </div>

              {/* Skills Listing */}
              <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-extrabold pb-1">INDEXED ABILITIES ({skills.length} SPECIALIZATIONS RECORDED)</p>
                {skills.map((sk) => (
                  <div
                    key={sk.id}
                    className="flex justify-between items-center bg-white border-2 border-black px-4 py-2 gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-black border border-black px-1.5 py-0.2 bg-stone-100 text-stone-600 uppercase">{sk.category}</span>
                        <h5 className="text-xs font-black text-stone-900 font-mono tracking-wide">{sk.name}</h5>
                      </div>
                      <p className="text-[9px] font-mono text-stone-500 truncate mt-0.5">Title Rank: <span className="text-pink-600 font-bold">{sk.proficiencyLabel}</span> // Spec: {sk.specialization}</p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[10px] font-mono border border-black bg-yellow-400 px-1.5 font-bold">Lvl {sk.level}/10</span>
                      <button
                        onClick={() => handleDeleteSkill(sk.id)}
                        className="bg-red-500 hover:bg-red-400 border border-black p-1 text-white cursor-pointer align-middle"
                        title="Purge Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </MangaPanel>
    </div>
  );
};
