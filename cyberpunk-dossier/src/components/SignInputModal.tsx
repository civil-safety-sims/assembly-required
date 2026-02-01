import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface SignInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialText: string;
    onSave: (text: string) => void;
}

export const SignInputModal = ({ isOpen, onClose, initialText, onSave }: SignInputModalProps) => {
    const [text, setText] = useState(initialText);

    useEffect(() => {
        setText(initialText);
    }, [initialText, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(text);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-md overflow-hidden relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                        <span className="text-cyan-400">#</span> Write Your Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">
                                Sign Text (Max 40 chars)
                            </label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value.slice(0, 40))}
                                className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none placeholder-slate-600"
                                placeholder="ENTER TEXT HERE..."
                                autoFocus
                            />
                            <div className="text-right text-xs text-slate-500 mt-1">
                                {text.length}/40
                            </div>
                        </div>

                        {/* Guidance Alert */}
                        <div className="bg-amber-900/20 border border-amber-700/50 rounded p-3 text-xs text-amber-200/80">
                            <strong>TIP:</strong> Your speech is protected, but the First Amendment does not cover words that 'incite violence' or 'encourage illegal acts.' Police frequently use this distinction to shut down assemblies.
                            <br />
                            <span className="italic opacity-70">- based on </span>
                            <a
                                href="https://www.aclu.org/know-your-rights/protesters-rights"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="italic text-amber-400 hover:text-amber-300 underline"
                            >
                                ACLU
                            </a>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors text-sm font-bold uppercase"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors text-sm font-bold uppercase flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save Sign
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
