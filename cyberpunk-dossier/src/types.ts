import type { ReactNode } from 'react';

export type ItemType = 'head' | 'eyes' | 'face' | 'body' | 'hands' | 'pockets' | 'feet';

export interface Item {
    id: string;
    name: string;
    type: ItemType;
    icon?: ReactNode | string; // Using Lucide component directly or a string identifier
    description?: string;
    rarity?: 'common' | 'rare' | 'legendary';
    tags?: string[];
    customText?: string;
}

export interface Slot {
    id: string; // e.g., 'slot-head'
    type: ItemType;
    label: string;
}
export type TemperatureLevel = 'Hot' | 'Comfortable' | 'Cold';
