import type { Item } from '../types';
import { DraggableItem } from './DraggableItem';

interface SupplyCacheProps {
    items: Item[];
}

export const SupplyCache = ({ items }: SupplyCacheProps) => {
    return (
        <div className="flex lg:grid lg:grid-cols-3 gap-3 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
            {items.map((item) => (
                <div key={item.id} className="min-w-[140px] lg:min-w-0">
                    <DraggableItem item={item} />
                </div>
            ))}
            {items.length === 0 && (
                <div className="col-span-full py-10 text-center text-slate-500 text-xs italic w-full">
            // CACHE DEPLETED //
                </div>
            )}
        </div>
    );
};
