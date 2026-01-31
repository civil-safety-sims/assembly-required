import { CloudRain, Thermometer, ShieldAlert, PlayCircle } from 'lucide-react';

interface BriefingProps {
    onSimulate: () => void;
}

export const Briefing = ({ onSimulate }: BriefingProps) => {
    return (
        <>
            <div className="bg-slate-900/50 border border-slate-700/50 p-4 relative backdrop-blur-sm">
                <h3 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Thermometer size={14} /> Environmental
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Temp</span>
                        <span className="text-slate-200 font-mono">24°C</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Condition</span>
                        <span className="text-cyan-400 flex items-center gap-1"><CloudRain size={12} /> Acid Rain</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-red-900/30 p-4 relative backdrop-blur-sm">
                <div className="absolute inset-0 bg-red-500/5 pointer-events-none animate-pulse"></div>
                <h3 className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ShieldAlert size={14} /> Threat Level
                </h3>
                <div className="text-center py-2">
                    <div className="text-2xl font-black text-red-500 tracking-tighter uppercase">CRACKDOWN</div>
                    <div className="text-[10px] text-red-400/70 mt-1">CURFEW IN EFFECT</div>
                </div>
            </div>

            <button
                onClick={onSimulate}
                className="group relative w-full bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-500/50 text-cyan-400 py-4 px-6 flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer"
            >
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <PlayCircle size={20} />
                <span className="font-bold uppercase tracking-widest text-sm">Run Diagnostic</span>
            </button>
        </>
    );
};
