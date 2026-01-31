import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Item } from '../types';
import clsx from 'clsx';
import { Box, GripVertical, Shirt, Package, Smartphone, Pill, Droplets } from 'lucide-react';

interface DraggableItemProps {
    item: Item;
    hideLabel?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
    'Shirt': <Shirt size={20} />,
    'Package': <Package size={20} />,
    'Smartphone': <Smartphone size={20} />,
    'Pill': <Pill size={20} />,
    'Droplets': <Droplets size={20} />,
};

export const DraggableItem = ({ item, hideLabel = false }: DraggableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
        data: { item },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    // Determine the icon to render
    // If item.icon is a string key in our map, use it. 
    // Otherwise fallback to the item.icon if it's already a node (unlikely with current data) or Box.
    const renderIcon = () => {
        if (typeof item.icon === 'string' && ICON_MAP[item.icon]) {
            return ICON_MAP[item.icon];
        }
        return item.icon || <Box size={20} />;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={clsx(
                "relative group flex items-center gap-2 p-2 bg-slate-800 border cursor-grab active:cursor-grabbing transition-all select-none hover:bg-slate-700",
                isDragging ? "opacity-50 z-50 ring-2 ring-cyan-500 shadow-lg" : "opacity-100",
                item.rarity === 'legendary' ? 'border-amber-500/50 hover:border-amber-400' :
                    item.rarity === 'rare' ? 'border-cyan-500/50 hover:border-cyan-400' : 'border-slate-600 hover:border-slate-500'
            )}
        >
            <div className="text-slate-500">
                <GripVertical size={14} />
            </div>
            <div className={clsx("p-2 rounded bg-slate-900",
                item.rarity === 'legendary' ? 'text-amber-500' :
                    item.rarity === 'rare' ? 'text-cyan-500' : 'text-slate-400'
            )}>
                {renderIcon()}
            </div>
            {!hideLabel && (
                <div className="flex-1 min-w-0">
                    <div className={clsx("text-xs font-bold uppercase truncate",
                        item.rarity === 'legendary' ? 'text-amber-200' : 'text-slate-200'
                    )}>
                        {item.name}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase truncate">{item.type}</div>
                </div>
            )}

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50"></div>
        </div>
    );
};
