import { X, ExternalLink, Shield, Users, MapPin, Eye, Phone, HeartPulse } from 'lucide-react';
import { TRUSTED_SOURCES, GENERAL_SAFETY_GUIDANCE } from '../data/sources';

interface SourcesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SourcesModal = ({ isOpen, onClose }: SourcesModalProps) => {
    if (!isOpen) return null;

    // Helper to pick an icon for guidance topics
    const getIconForTopic = (topic: string) => {
        const lower = topic.toLowerCase();
        if (lower.includes('buddy')) return <Users size={16} />;
        if (lower.includes('rally') || lower.includes('route') || lower.includes('location')) return <MapPin size={16} />;
        if (lower.includes('ooda') || lower.includes('observ')) return <Eye size={16} />;
        if (lower.includes('legal') || lower.includes('jail') || lower.includes('call')) return <Phone size={16} />;
        if (lower.includes('medical') || lower.includes('health')) return <HeartPulse size={16} />;
        return <Shield size={16} />;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-slate-950 border border-slate-700 rounded-sm shadow-2xl relative flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Shield className="text-emerald-500" size={24} />
                        <div>
                            <h2 className="text-emerald-500 text-sm font-bold uppercase tracking-widest">
                                Trusted Source Registry
                            </h2>
                            <p className="text-slate-500 text-xs">Verified intelligence for operational safety</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-red-500 hover:rotate-90 transition-all"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                    {/* Section 1: General Guidance */}
                    <section>
                        <h3 className="text-slate-200 font-bold uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
                            Standard Operating Procedures
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {GENERAL_SAFETY_GUIDANCE.map((guide, idx) => (
                                <div key={idx} className="bg-slate-900/50 p-4 rounded border border-slate-800 hover:border-emerald-500/30 transition-colors group">
                                    <div className="flex items-start gap-3">
                                        <div className="text-emerald-500/70 mt-1 group-hover:text-emerald-400 transition-colors">
                                            {getIconForTopic(guide.topic)}
                                        </div>
                                        <div>
                                            <h4 className="text-slate-200 font-bold text-sm mb-1">{guide.topic}</h4>
                                            <p className="text-slate-400 text-xs leading-relaxed mb-2">{guide.description}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {guide.sources.map(s => (
                                                    <span key={s} className="text-[10px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-slate-700">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Source Registry */}
                    <section>
                        <h3 className="text-slate-200 font-bold uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-3">
                            Intelligence Sources
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {TRUSTED_SOURCES.map((source) => (
                                <div key={source.id} className="bg-slate-900/30 p-4 rounded border border-slate-800 flex flex-col md:flex-row gap-4 hover:bg-slate-900/60 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-cyan-400 font-bold">{source.name}</h4>
                                            <span className="text-slate-600 text-[10px] uppercase border border-slate-700 px-1 rounded">Verified</span>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-3">{source.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {source.topics.map(topic => (
                                                <span key={topic} className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800/50">
                                                    #{topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center md:justify-end">
                                        <a
                                            href={source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-cyan-900/20 text-cyan-500 text-xs font-bold uppercase tracking-widest border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors rounded-sm group"
                                        >
                                            Access Source
                                            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center flex-shrink-0">
                    <p className="text-[10px] text-slate-600">
                        Information provided for educational purposes only. Verify with multiple sources.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors rounded-sm"
                    >
                        Close Registry
                    </button>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/50"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/50"></div>
            </div>
        </div>
    );
};
