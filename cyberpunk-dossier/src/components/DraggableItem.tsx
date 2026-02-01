import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Item } from '../types';
import clsx from 'clsx';
import { Box, GripVertical, Shirt, Package, Smartphone, Pill, Droplets, Eye, Signpost, Phone, Shield, Map, Square, Edit2, Sun, Footprints, Zap, ThermometerSun, Nut, Umbrella, BatteryCharging, Banknote, Snowflake, Ear, Glasses, BriefcaseMedical, Camera, EyeOff, Wallet, Ghost, Armchair, Accessibility, Move, Activity, Slash } from 'lucide-react';

interface DraggableItemProps {
    item: Item;
    hideLabel?: boolean;
    onEdit?: (item: Item) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
    'Shirt': <Shirt size={20} />,
    'Package': <Package size={20} />,
    'Smartphone': <Smartphone size={20} />,
    'Pill': <Pill size={20} />,
    'Droplets': <Droplets size={20} />,
    'Eye': <Eye size={20} />,
    'Signpost': <Signpost size={20} />,
    'Phone': <Phone size={20} />,
    'Shield': <Shield size={20} />,
    'Map': <Map size={20} />,
    'Square': <Square size={20} />,
    'Sun': <Sun size={20} />,
    'Footprints': <Footprints size={20} />,
    'Zap': <Zap size={20} />,
    'ThermometerSun': <ThermometerSun size={20} />,
    'Nut': <Nut size={20} />,
    'Umbrella': <Umbrella size={20} />,
    'BatteryCharging': <BatteryCharging size={20} />,
    'Banknote': <Banknote size={20} />,
    'Snowflake': <Snowflake size={20} />,
    'Ear': <Ear size={20} />,
    'Glasses': <Glasses size={20} />,
    'Goggles': <Glasses size={20} />,
    'BriefcaseMedical': <BriefcaseMedical size={20} />,
    'Edit2': <Edit2 size={20} />,
    'Camera': <Camera size={20} />,
    'EyeOff': <EyeOff size={20} />,
    'Wallet': <Wallet size={20} />,
    'Mask': <Shield size={20} />, // Fallback for protective masks
    'Ghost': <Ghost size={20} />, // Anonymity
    'Armchair': <Armchair size={20} />, // Mobility aids
    'GripVertical': <GripVertical size={20} />, // Walking cane
    'Accessibility': <Accessibility size={20} />, // Accessibility/mobility aids
    'Move': <Move size={20} />, // Movement/mobility
    'Activity': <Activity size={20} />, // Activity/heartbeat
    'Slash': <Slash size={20} />, // Diagonal line (cane-like)
};

export const DraggableItem = ({ item, hideLabel = false, onEdit }: DraggableItemProps) => {
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
                    item.rarity === 'rare' ? 'border-cyan-500/50 hover:border-cyan-400' :
                        item.tags?.includes('signs') ? 'border-yellow-500/30 hover:border-yellow-500/50' : // Highlight signs
                            'border-slate-600 hover:border-slate-500'
            )}
        >
            <div className="text-slate-500">
                <GripVertical size={14} />
            </div>
            <div className={clsx("p-2 rounded bg-slate-900 shrink-0",
                item.rarity === 'legendary' ? 'text-amber-500' :
                    item.rarity === 'rare' ? 'text-cyan-500' :
                        item.tags?.includes('signs') ? 'text-yellow-500' : // Highlight signs icon
                            'text-slate-400'
            )}>
                {renderIcon()}
            </div>
            {!hideLabel && (
                <div className="flex-1 min-w-0">
                    <div className={clsx("text-sm font-bold uppercase leading-tight",
                        item.rarity === 'legendary' ? 'text-amber-200' : 'text-slate-200'
                    )}>
                        {item.name}
                    </div>
                    <div className="text-xs text-slate-500 uppercase leading-tight mt-0.5 flex items-center gap-1">
                        {item.type}
                        {item.customText && (
                            <span className="inline-block px-1 py-0.5 bg-yellow-500/20 text-yellow-200 rounded text-[10px] ml-1 truncate max-w-[80px]">
                                "{item.customText}"
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Edit Button for Signs */}
            {onEdit && item.tags?.includes('signs') && !isDragging && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent drag start
                        onEdit(item);
                    }}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                    className="p-1.5 rounded hover:bg-slate-600 text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Edit Sign Text"
                >
                    <Edit2 size={14} />
                </button>
            )}

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50"></div>
        </div>
    );
};
