import { CloudRain, Thermometer, ShieldAlert, PlayCircle, Sun, Cloud, Snowflake } from 'lucide-react';
import type { WeatherTemp, ThreatLevelType } from '../logic/simulationEngine';
import clsx from 'clsx';

interface BriefingProps {
    onSimulate: () => void;
    temp: WeatherTemp;
    setTemp: (t: WeatherTemp) => void;
    precip: boolean;
    setPrecip: (p: boolean) => void;
    threat: ThreatLevelType;
    setThreat: (t: ThreatLevelType) => void;
}

export const Briefing = ({ onSimulate, temp, setTemp, precip, setPrecip, threat, setThreat }: BriefingProps) => {

    const tempOptions: { val: WeatherTemp, icon: any, label: string }[] = [
        { val: 'Cold', icon: Snowflake, label: 'Cold' },
        { val: 'Comfortable', icon: Cloud, label: 'Mild' },
        { val: 'Hot', icon: Sun, label: 'Hot' },
    ];

    const threatOptions: { val: ThreatLevelType, color: string, label: string }[] = [
        { val: 'Low', color: 'text-emerald-500', label: 'Low' },
        { val: 'Medium', color: 'text-amber-500', label: 'Med' },
        { val: 'High', color: 'text-red-500', label: 'High' },
    ];

    const threatDescriptions: Record<ThreatLevelType, string> = {
        'Low': "PERMITTED EVENT. POSSIBLE: Surveillance, dehydration, sun/cold exposure. RISK: Low.",
        'Medium': "CIVIL DISOBEDIENCE. POSSIBLE: Kettling, pepper spray, physical removal, arrest. RISK: Medium.",
        'High': "RIOT CONTROL. POSSIBLE: Tear gas, flashbangs, rubber bullets, mass arrest. RISK: High."
    };

    return (
        <>
            {/* Environmental Controls */}
            <div className="bg-slate-900/50 border border-slate-700/50 p-4 relative backdrop-blur-sm">
                <h3 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Thermometer size={14} /> Environmental
                </h3>

                {/* Temperature Selector */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {tempOptions.map(opt => (
                        <button
                            key={opt.val}
                            onClick={() => setTemp(opt.val)}
                            className={clsx(
                                "flex flex-col items-center justify-center p-2 rounded border transition-all",
                                temp === opt.val
                                    ? "bg-amber-900/30 border-amber-500/50 text-amber-500"
                                    : "bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <opt.icon size={16} className="mb-1" />
                            <span className="text-[10px] uppercase font-bold">{opt.label}</span>
                        </button>
                    ))}
                </div>

                {/* Precip Toggle */}
                <button
                    onClick={() => setPrecip(!precip)}
                    className={clsx(
                        "w-full flex items-center justify-between p-2 rounded border transition-all text-xs font-bold uppercase tracking-wider",
                        precip
                            ? "bg-cyan-900/30 border-cyan-500/50 text-cyan-400"
                            : "bg-slate-900 border-slate-700 text-slate-500"
                    )}
                >
                    <span className="flex items-center gap-2"><CloudRain size={14} /> Precipitation</span>
                    <span>{precip ? "ACTIVE" : "NONE"}</span>
                </button>
            </div>

            {/* Threat Level Controls */}
            <div className={clsx(
                "bg-slate-900/50 border p-4 relative backdrop-blur-sm transition-colors",
                threat === 'High' ? "border-red-900/50" : threat === 'Medium' ? "border-amber-900/50" : "border-emerald-900/50"
            )}>
                <div className={clsx(
                    "absolute inset-0 pointer-events-none transition-opacity duration-1000",
                    threat === 'High' ? "bg-red-500/5 animate-pulse" : "opacity-0"
                )}></div>

                <h3 className={clsx(
                    "text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 transition-colors",
                    threat === 'High' ? "text-red-500" : threat === 'Medium' ? "text-amber-500" : "text-emerald-500"
                )}>
                    <ShieldAlert size={14} /> Threat Level
                </h3>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {threatOptions.map(opt => (
                        <button
                            key={opt.val}
                            onClick={() => setThreat(opt.val)}
                            className={clsx(
                                "py-2 text-[10px] font-bold uppercase tracking-wider rounded border transition-all",
                                threat === opt.val
                                    ? `bg-slate-800 border-current ${opt.color}`
                                    : "bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800"
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Threat Description Box */}
                <div className={clsx(
                    "text-[10px] p-2 border-l-2 font-mono leading-relaxed transition-colors uppercase",
                    threat === 'High'
                        ? "border-red-500 text-red-200 bg-red-900/10"
                        : threat === 'Medium'
                            ? "border-amber-500 text-amber-200 bg-amber-900/10"
                            : "border-emerald-500 text-emerald-200 bg-emerald-900/10"
                )}>
                    {threatDescriptions[threat]}
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
