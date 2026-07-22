'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Plus,
  Loader2,
  Check,
  FolderPlus,
  Wand2,
  Layers,
  Code2,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppStore } from '@/store/useAppStore';
import { suggestProjectNames } from '@/app/actions/suggestProjectNames';
import { Project } from '@/types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const router = useRouter();
  const { addCustomProject, selectProject, initializeRoadmap } = useAppStore();

  // Main Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [category, setCategory] = useState('AI & Web Applications');
  const [techInput, setTechInput] = useState('React, Next.js, TypeScript, Tailwind');

  // AI Name Generator States
  const [keywords, setKeywords] = useState('');
  const [isGeneratingNames, setIsGeneratingNames] = useState(false);
  const [suggestedNames, setSuggestedNames] = useState<string[]>([]);
  const [selectedPill, setSelectedPill] = useState<string | null>(null);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [highlightTitle, setHighlightTitle] = useState(false);

  // Form Validation & Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState('');

  // Handle AI Name Generation
  const handleGenerateNames = async () => {
    if (!keywords.trim()) {
      setAiNotice('Please enter 3–4 keywords first (e.g., chat, real-time, websocket).');
      return;
    }

    setIsGeneratingNames(true);
    setAiNotice(null);

    try {
      const result = await suggestProjectNames(keywords);
      if (result.success && result.names && result.names.length > 0) {
        setSuggestedNames(result.names);
        if (result.isFallback) {
          setAiNotice('Generated smart fallback project names.');
        } else {
          setAiNotice(null);
        }
      } else {
        setAiNotice(result.error || 'Failed to generate names. Please try again.');
      }
    } catch (err) {
      console.error('Error in handleGenerateNames:', err);
      setAiNotice('An error occurred while calling the AI suggester.');
    } finally {
      setIsGeneratingNames(false);
    }
  };

  // Handle clicking an AI-suggested pill button
  const handlePillClick = (name: string) => {
    setTitle(name);
    setSelectedPill(name);
    setTitleError('');

    // Trigger ring highlight animation on title input
    setHighlightTitle(true);
    setTimeout(() => setHighlightTitle(false), 1200);
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Project Title is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newId = `custom-project-${Date.now()}`;
      const technologies = techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const newProject: Project = {
        id: newId,
        title: title.trim(),
        tagline: description.trim() || `${title.trim()} custom application`,
        description: description.trim() || 'Custom user created portfolio target project.',
        difficulty,
        duration: '14 Days',
        resumeValue: 90,
        careerImpact: 'Custom Portfolio Upgrade',
        skillsGained: technologies,
        technologies: technologies.length > 0 ? technologies : ['TypeScript', 'Next.js', 'React'],
        recommendationReason: 'Created directly via Pilot AI project wizard.',
        features: [
          'AI-assisted project architecture setup',
          'Modular component architecture',
          'Responsive glassmorphic dashboard interface',
        ],
        recommendedApis: ['Vercel AI SDK', 'PostgreSQL / Prisma API'],
        toolsRequired: ['Git', 'VS Code', 'Node.js'],
        completionTime: '15 hours',
        githubPortfolioValue: 'High',
        category,
        status: 'Planned',
        progress: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to store & persist to DB
      addCustomProject(newProject);
      selectProject(newId);
      initializeRoadmap(newId, newProject.title);

      // Close modal & navigate to newly created project
      onClose();
      router.push(`/dashboard/projects/${newId}`);
    } catch (err) {
      console.error('Failed to create custom project:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto grid place-items-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl my-8 rounded-3xl border border-indigo-500/30 bg-[#0b081e] p-6 sm:p-8 shadow-2xl z-10 space-y-6"
          style={{
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.15)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-500/15 rounded-2xl text-indigo-400 border border-indigo-500/20">
                <FolderPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Create New Project
                </h3>
                <p className="text-xs text-slate-400">
                  Build custom portfolios or choose AI-suggested names.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ── AI NAME GENERATOR SECTION: "Need a name?" (#95) ── */}
            <div className="rounded-2xl border border-indigo-500/25 bg-indigo-950/30 p-4 sm:p-5 space-y-3.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-indigo-300 font-bold text-sm">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
                  <span>Need a name?</span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400/80 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                  AI Suggester
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Type 3–4 keywords describing your app (e.g.{' '}
                <code className="text-indigo-300 font-mono bg-indigo-500/15 px-1.5 py-0.5 rounded">
                  chat, real-time, websocket
                </code>
                ) to get catchy, AI-generated project names.
              </p>

              {/* Keywords Input + Generate Action */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder="e.g., chat, real-time, websocket"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleGenerateNames();
                    }
                  }}
                  className="flex-1 bg-[#070517] text-xs text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-indigo-500/30 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
                />

                <Button
                  type="button"
                  onClick={handleGenerateNames}
                  disabled={isGeneratingNames}
                  variant="premium"
                  size="sm"
                  className="shrink-0 h-10 px-4 text-xs font-semibold"
                >
                  {isGeneratingNames ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-3.5 h-3.5 mr-1.5" />
                      Suggest Names
                    </>
                  )}
                </Button>
              </div>

              {/* Notice / Feedback Message */}
              {aiNotice && (
                <p className="text-xs font-medium text-indigo-300/90 pt-1 flex items-center gap-1.5">
                  <span>ℹ️</span> {aiNotice}
                </p>
              )}

              {/* Suggested Pill Buttons List */}
              {suggestedNames.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-indigo-500/20">
                  <p className="text-[11px] font-semibold text-slate-400">
                    Click a name to auto-fill the Project Title field:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedNames.map((name, idx) => {
                      const isSelected = selectedPill === name;
                      return (
                        <button
                          key={`${name}-${idx}`}
                          type="button"
                          onClick={() => handlePillClick(name)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all transform active:scale-95 cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400 border border-indigo-300'
                              : 'bg-[#0f0b29] text-indigo-200 border border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-white'
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                          )}
                          <span>{name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── MAIN PROJECT TITLE FIELD ── */}
            <div className="space-y-2">
              <label
                htmlFor="project-title-input"
                className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between"
              >
                <span>Project Title *</span>
                {selectedPill && (
                  <span className="text-indigo-400 text-[11px] font-normal normal-case flex items-center gap-1">
                    <Check className="w-3 h-3" /> Auto-filled from AI
                  </span>
                )}
              </label>
              <input
                id="project-title-input"
                type="text"
                placeholder="e.g., OmniChat Agentic Workspace"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (titleError) setTitleError('');
                }}
                className={`w-full bg-[#08051a] text-sm text-white placeholder-slate-500 px-4 py-3 rounded-xl border transition ${
                  highlightTitle
                    ? 'border-indigo-400 ring-2 ring-indigo-400/80 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                    : titleError
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                }`}
              />
              {titleError && <p className="text-xs text-rose-400 font-medium">{titleError}</p>}
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Description (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe what this project will build..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#08051a] text-xs text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Difficulty & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Difficulty Level</span>
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full bg-[#08051a] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Category</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Full Stack, AI/ML, DevOps"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#08051a] text-xs text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Technologies Tag input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Technologies (Comma separated)</span>
              </label>
              <input
                type="text"
                placeholder="React, Next.js, TypeScript, Tailwind CSS"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full bg-[#08051a] text-xs text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="premium"
                disabled={isSubmitting}
                className="px-6 h-11 text-xs font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
