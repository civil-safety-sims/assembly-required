import type { Item } from '../types';
import { DraggableItem } from './DraggableItem';
import { useDroppable } from '@dnd-kit/core';

interface SupplyCacheProps {
    items: Item[];
    onEdit?: (item: Item) => void;
}

export const SupplyCache = ({ items, onEdit }: SupplyCacheProps) => {
    const { setNodeRef } = useDroppable({
        id: 'supply-cache',
    });

    return (
        <div ref={setNodeRef} className="grid grid-cols-1 gap-2 min-h-[200px] content-start">
            {items.map(item => (
                <div key={item.id}>
                    <DraggableItem item={item} onEdit={onEdit} />
                </div>
            ))}
        </div>
    );
};
