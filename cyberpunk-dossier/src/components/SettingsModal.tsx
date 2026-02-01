import { X } from 'lucide-react';

interface UserSettings {
    useMenstrualProducts: boolean;
    hasIdentifiableFeatures: boolean;
    requiresCorrectiveLenses: boolean;
    requiresPrescriptionMeds: boolean;
    requiresMobilityAid: boolean;
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: UserSettings;
    onUpdateSettings: (newSettings: UserSettings) => void;
}

export const SettingsModal = ({ isOpen, onClose, settings, onUpdateSettings }: SettingsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-sm shadow-2xl relative">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
                    <h2 className="text-cyan-500 text-sm font-bold uppercase tracking-widest">
                        Protocol Configuration
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-red-500 hover:rotate-90 transition-all"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 group px-2 py-1 rounded hover:bg-slate-800/50 transition-colors">
                            <input
                                type="checkbox"
                                id="menstrual-products"
                                checked={settings.useMenstrualProducts}
                                onChange={(e) => onUpdateSettings({
                                    ...settings,
                                    useMenstrualProducts: e.target.checked
                                })}
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-offset-slate-900 focus:ring-cyan-500/50"
                            />
                            <label htmlFor="menstrual-products" className="text-sm text-slate-300 leading-relaxed cursor-pointer select-none">
                                <span className="font-bold text-slate-200 block">Biologic Needs: Menstrual</span>
                                <span className="text-xs text-slate-500 block mt-1">
                                    Enables access to absorbent hygiene products (Tampons, Pads) in the supply cache.
                                </span>
                            </label>
                        </div>

                        <div className="flex items-start gap-3 group px-2 py-1 rounded hover:bg-slate-800/50 transition-colors">
                            <input
                                type="checkbox"
                                id="identifiable-features"
                                checked={settings.hasIdentifiableFeatures}
                                onChange={(e) => onUpdateSettings({
                                    ...settings,
                                    hasIdentifiableFeatures: e.target.checked
                                })}
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-offset-slate-900 focus:ring-cyan-500/50"
                            />
                            <label htmlFor="identifiable-features" className="text-sm text-slate-300 leading-relaxed cursor-pointer select-none">
                                <span className="font-bold text-slate-200 block">Biometric: Distinguishing Features</span>
                                <span className="text-xs text-slate-500 block mt-1">
                                    "I have tattoos or easily identifiable hair."
                                </span>
                            </label>
                        </div>

                        <div className="flex items-start gap-3 group px-2 py-1 rounded hover:bg-slate-800/50 transition-colors">
                            <input
                                type="checkbox"
                                id="corrective-lenses"
                                checked={settings.requiresCorrectiveLenses}
                                onChange={(e) => onUpdateSettings({
                                    ...settings,
                                    requiresCorrectiveLenses: e.target.checked
                                })}
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-offset-slate-900 focus:ring-cyan-500/50"
                            />
                            <label htmlFor="corrective-lenses" className="text-sm text-slate-300 leading-relaxed cursor-pointer select-none">
                                <span className="font-bold text-slate-200 block">Biometric: Corrective Lenses</span>
                                <span className="text-xs text-slate-500 block mt-1">
                                    "I require corrective lenses to see." (Disables Contact Lenses option)
                                </span>
                            </label>
                        </div>

                        <div className="flex items-start gap-3 group px-2 py-1 rounded hover:bg-slate-800/50 transition-colors">
                            <input
                                type="checkbox"
                                id="prescription-meds"
                                checked={settings.requiresPrescriptionMeds}
                                onChange={(e) => onUpdateSettings({
                                    ...settings,
                                    requiresPrescriptionMeds: e.target.checked
                                })}
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-offset-slate-900 focus:ring-cyan-500/50"
                            />
                            <label htmlFor="prescription-meds" className="text-sm text-slate-300 leading-relaxed cursor-pointer select-none">
                                <span className="font-bold text-slate-200 block">Medical: Prescription Needs</span>
                                <span className="text-xs text-slate-500 block mt-1">
                                    "I need prescription medications to stay healthy." (Disables Loose Meds option)
                                </span>
                            </label>
                        </div>

                        <div className="flex items-start gap-3 group px-2 py-1 rounded hover:bg-slate-800/50 transition-colors">
                            <input
                                type="checkbox"
                                id="mobility-aid"
                                checked={settings.requiresMobilityAid}
                                onChange={(e) => onUpdateSettings({
                                    ...settings,
                                    requiresMobilityAid: e.target.checked
                                })}
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-offset-slate-900 focus:ring-cyan-500/50"
                            />
                            <label htmlFor="mobility-aid" className="text-sm text-slate-300 leading-relaxed cursor-pointer select-none">
                                <span className="font-bold text-slate-200 block">Accessibility: Mobility Assistance</span>
                                <span className="text-xs text-slate-500 block mt-1">
                                    "I require assistive aids to move or stay in place for extended periods."
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-cyan-900/20 text-cyan-500 text-xs font-bold uppercase tracking-widest border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors rounded-sm"
                    >
                        Confirm
                    </button>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50"></div>
            </div>
        </div>
    );
};
