import type { Item } from '../types';
import clsx from 'clsx';

interface SignDisplayProps {
    item: Item | null;
    side?: 'left' | 'right';
}

export const SignDisplay = ({ item, side }: SignDisplayProps) => {
    if (!item || !item.tags?.includes('signs')) return null;

    const text = item.customText || "YOUR MESSAGE HERE";

    // Determine visual style based on item ID
    const getSignStyle = () => {
        if (item.id === 'item-cardboard-sign') {
            return "bg-[#8B593E] text-black border-none"; // Cardboard brown
        }
        if (item.id === 'item-poster-board-sign') {
            return "bg-yellow-300 text-black border-none"; // Neon poster
        }
        return "bg-white text-black border border-slate-300"; // Default/Foam Core
    };

    // Determine font style
    const getFontStyle = () => {
        if (item.id === 'item-cardboard-sign') {
            return "font-marker transform -rotate-1"; // "Marker" style (using standard font for now but rotated)
        }
        return "font-sans font-bold uppercase tracking-wider";
    };

    // Position logic - avoid center to prevent overlap
    // User request: "The rectangle of the sign should be higher than the head. 
    // The stick should be to the left of the eyes box on the left, and to the right of the face box on the right"
    // No rotation.
    const positionClasses = side === 'left'
        ? "top-[-30%] left-[2%] origin-bottom-left -rotate-6" // Hand 1 (Left) - High up, aligned left, rotated out
        : side === 'right'
            ? "top-[-30%] right-[2%] origin-bottom-right rotate-6" // Hand 2 (Right) - High up, aligned right, rotated out
            : "top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"; // Fallback

    return (
        <div className={clsx(
            "absolute z-20 pointer-events-none select-none w-56 transition-all duration-300",
            positionClasses
        )}>
            <div className={clsx(
                "relative p-4 rounded shadow-xl flex items-center justify-center text-center min-h-[140px]",
                getSignStyle()
            )}>
                {/* Stick/Handle visual */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-32 bg-[#5d4037] -z-10 rounded-b"></div>

                {/* Sign Content */}
                <div className={clsx(
                    "text-2xl leading-tight break-words w-full",
                    getFontStyle()
                )}>
                    {text}
                </div>

                {/* Texture/Grunge overlay (optional css tricks) */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none rounded"></div>
            </div>
        </div>
    );
};
