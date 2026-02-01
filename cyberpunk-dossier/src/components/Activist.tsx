import type { Slot, Item } from '../types';
import { DroppableSlot } from './DroppableSlot';
import { SignDisplay } from './SignDisplay';
import { User } from 'lucide-react';

interface ActivistProps {
    slots: Slot[];
    equippedItems: Record<string, Item | null>;
    onEdit?: (item: Item) => void;
}

const STORAGE_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `slot-storage-${i}`);

export const Activist = ({ slots, equippedItems, onEdit }: ActivistProps) => {
    // Helper to find slot by id
    const getSlot = (id: string) => slots.find(s => s.id === id);

    return (
        <div className="w-full max-w-md flex flex-col items-center py-4 pt-40 relative gap-6 my-auto">

            {/* Main Paper Doll Area */}
            <div className="relative w-full flex-1 min-h-[400px]">
                {/* Silhouette / Background Guide */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <User size={300} />
                </div>

                {/* Sign Display Overlay (if equipped in hands) */}
                {(() => {
                    const hand1Item = equippedItems['slot-hand-1'];
                    const hand2Item = equippedItems['slot-hand-2'];
                    const isHand1Sign = hand1Item?.tags?.includes('signs');
                    const isHand2Sign = hand2Item?.tags?.includes('signs');

                    return (
                        <>
                            {isHand1Sign && <SignDisplay item={hand1Item} side="left" />}
                            {isHand2Sign && <SignDisplay item={hand2Item} side="right" />}
                        </>
                    );
                })()}

                <div className="grid grid-cols-6 gap-4 w-full h-full content-center">
                    {/* Row 1: Head */}
                    <div className="col-span-6 flex justify-center">
                        <div className="w-1/3">
                            {getSlot('slot-head') && (
                                <DroppableSlot
                                    slot={getSlot('slot-head')!}
                                    item={equippedItems['slot-head']}
                                    onEdit={onEdit}
                                />
                            )}
                        </div>
                    </div>

                    {/* Row 2: Eyes & Face */}
                    <div className="col-span-6 flex justify-center gap-4">
                        <div className="w-1/3">
                            {getSlot('slot-eyes') && (
                                <DroppableSlot
                                    slot={getSlot('slot-eyes')!}
                                    item={equippedItems['slot-eyes']}
                                    onEdit={onEdit}
                                />
                            )}
                        </div>
                        <div className="w-1/3">
                            {getSlot('slot-face') && (
                                <DroppableSlot
                                    slot={getSlot('slot-face')!}
                                    item={equippedItems['slot-face']}
                                    onEdit={onEdit}
                                />
                            )}
                        </div>
                    </div>

                    {/* Row 3: Hand L, Torso, Hand R */}
                    <div className="col-span-2">
                        {getSlot('slot-hand-1') && (
                            <DroppableSlot
                                slot={getSlot('slot-hand-1')!}
                                item={equippedItems['slot-hand-1']}
                                onEdit={onEdit}
                            />
                        )}
                    </div>
                    <div className="col-span-2">
                        {getSlot('slot-body') && (
                            <DroppableSlot
                                slot={getSlot('slot-body')!}
                                item={equippedItems['slot-body']}
                                onEdit={onEdit}
                            />
                        )}
                    </div>
                    <div className="col-span-2">
                        {getSlot('slot-hand-2') && (
                            <DroppableSlot
                                slot={getSlot('slot-hand-2')!}
                                item={equippedItems['slot-hand-2']}
                                onEdit={onEdit}
                            />
                        )}
                    </div>

                    {/* Row 4: Feet */}
                    <div className="col-span-6 flex justify-center mt-4">
                        <div className="w-1/3">
                            {getSlot('slot-feet') && (
                                <DroppableSlot
                                    slot={getSlot('slot-feet')!}
                                    item={equippedItems['slot-feet']}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Storage Area */}
            <div className="w-full bg-slate-900/40 p-4 rounded-sm border border-slate-700/30">
                <h3 className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-bold">Storage</h3>
                <div className="grid grid-cols-3 gap-3">
                    {STORAGE_SLOTS.map(id => (
                        <div key={id}>
                            {getSlot(id) && (
                                <DroppableSlot
                                    slot={getSlot(id)!}
                                    item={equippedItems[id]}
                                    onEdit={onEdit}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
