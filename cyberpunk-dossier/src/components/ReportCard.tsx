import { useEffect } from 'react';
import type { SimulationResult } from '../logic/simulationEngine';
import { AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

interface ReportCardProps {
    result: SimulationResult | null;
    onClose: () => void; // Button to reset/close
}

export const ReportCard = ({ result, onClose }: ReportCardProps) => {
    if (!result) return null;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const isDanger = result.score < 40; // More forgiving threshold

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className={clsx(
                "bg-slate-900 border-2 w-full max-w-lg shadow-2xl overflow-hidden relative",
                isDanger ? "border-red-600 shadow-red-900/50" : "border-emerald-500 shadow-emerald-900/50"
            )}>
                {/* Header */}
                <div className={clsx(
                    "p-4 border-b flex justify-between items-center",
                    isDanger ? "bg-red-900/20 border-red-800" : "bg-emerald-900/20 border-emerald-800"
                )}>
                    <h2 className={clsx(
                        "text-xl font-black uppercase tracking-widest flex items-center gap-3",
                        isDanger ? "text-red-500" : "text-emerald-500"
                    )}>
                        {isDanger ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                        {isDanger ? "CRITICAL FAILURE" : "MISSION APPROVED"}
                    </h2>
                    <div className="text-4xl font-mono font-bold text-white">
                        {result.score}%
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {isDanger && (
                        <div className="mb-6">
                            <h3 className="text-red-500 font-bold text-lg mb-2">DANGER</h3>
                            <p className="text-slate-400 text-sm">
                                Your loadout has critical safety flaws that put you at extreme risk. Rectify immediately.
                            </p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {result.feedback.length === 0 && (
                            <div className="text-emerald-400 italic text-center py-4">
                                No critical safety issues detected. Good luck out there.
                            </div>
                        )}
                        {result.feedback.map((card, idx) => (
                            <div key={idx} className={clsx(
                                "p-4 rounded border-l-4 bg-slate-800/50",
                                card.severity === 'critical' ? "border-red-500" :
                                    card.severity === 'success' ? "border-emerald-500" :
                                        "border-amber-500"
                            )}>
                                <div className="font-bold text-slate-200 mb-1 flex items-start gap-2">
                                    {card.severity === 'critical' && <AlertTriangle className="text-red-500 shrink-0" size={16} />}
                                    {card.severity === 'success' && <CheckCircle className="text-emerald-500 shrink-0" size={16} />}
                                    {card.message}
                                </div>
                                <a
                                    href={card.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-3 text-xs uppercase font-bold tracking-wider text-cyan-400 hover:text-cyan-300 hover:underline"
                                >
                                    <ExternalLink size={12} />
                                    Verify Source ({card.sourceName})
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors border border-slate-700 hover:border-slate-500 min-h-[44px]"
                    >
                        Return to Dossier
                    </button>
                </div>
            </div>
        </div>
    );
};
