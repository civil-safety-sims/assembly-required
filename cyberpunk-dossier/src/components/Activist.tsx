import type { Slot, Item } from '../types';
import { DroppableSlot } from './DroppableSlot';
import { User } from 'lucide-react';

interface ActivistProps {
    slots: Slot[];
    equippedItems: Record<string, Item | null>;
}

export const Activist = ({ slots, equippedItems }: ActivistProps) => {
    // Helper to find slot by id
    const getSlot = (id: string) => slots.find(s => s.id === id);

    return (
        <div className="w-full max-w-md h-full flex flex-col items-center py-4 relative">

            {/* Silhouette / Background Guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <User size={300} />
            </div>

            <div className="grid grid-cols-6 gap-4 w-full h-full content-center">

                {/* Row 1: Head */}
                <div className="col-span-6 flex justify-center">
                    <div className="w-1/3">
                        {getSlot('slot-head') && (
                            <DroppableSlot
                                slot={getSlot('slot-head')!}
                                item={equippedItems['slot-head']}
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
                            />
                        )}
                    </div>
                    <div className="w-1/3">
                        {getSlot('slot-face') && (
                            <DroppableSlot
                                slot={getSlot('slot-face')!}
                                item={equippedItems['slot-face']}
                            />
                        )}
                    </div>
                </div>

                {/* Row 3: Hands (L), Body, Hands (R) */}
                <div className="col-span-2">
                    {getSlot('slot-hands') && (
                        <DroppableSlot
                            slot={getSlot('slot-hands')!}
                            item={equippedItems['slot-hands']}
                        />
                    )}
                </div>
                <div className="col-span-2">
                    {getSlot('slot-body') && (
                        <DroppableSlot
                            slot={getSlot('slot-body')!}
                            item={equippedItems['slot-body']}
                        />
                    )}
                </div>
                <div className="col-span-2">
                    {getSlot('slot-pockets') && (
                        <DroppableSlot
                            slot={getSlot('slot-pockets')!}
                            item={equippedItems['slot-pockets']}
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
    );
};
