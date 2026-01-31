import { useDroppable } from '@dnd-kit/core';
import type { Item, Slot } from '../types';
import { DraggableItem } from './DraggableItem';
import clsx from 'clsx';
import { Crosshair } from 'lucide-react';

interface DroppableSlotProps {
    slot: Slot;
    item: Item | null;
    className?: string;
}

export const DroppableSlot = ({ slot, item, className }: DroppableSlotProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: slot.id,
        data: { slot },
    });

    return (
        <div
            ref={setNodeRef}
            className={clsx(
                "relative transition-all duration-300",
                className
            )}
        >
            {/* Label always visible outside or delicately inside */}
            <div className="mb-1 flex justify-between items-end">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{slot.label}</span>
                {isOver && <span className="text-[10px] text-cyan-400 animate-pulse">TARGETING</span>}
            </div>

            <div className={clsx(
                "h-20 border flex items-center justify-center relative overflow-hidden transition-colors",
                isOver ? "bg-cyan-900/20 border-cyan-500/50" : "bg-slate-900/40 border-dashed border-slate-700/50",
                item ? "border-solid border-slate-600" : ""
            )}>
                {item ? (
                    <div className="w-full h-full p-1">
                        <DraggableItem item={item} />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-slate-500">
                        <Crosshair size={24} strokeWidth={1} />
                    </div>
                )}
            </div>
        </div>
    );
};
