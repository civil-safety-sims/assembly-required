import { useState } from 'react';
import { SupplyCache } from './components/SupplyCache';
import { Activist } from './components/Activist';
import { Briefing } from './components/Briefing';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, type DragEndEvent, pointerWithin } from '@dnd-kit/core';
import type { Item, Slot } from './types';
import { DraggableItem } from './components/DraggableItem';
import { AVAILABLE_ITEMS, type SafetyItem } from './data/gameData';
import { runSimulation, type SimulationResult } from './logic/simulationEngine';
import { ReportCard } from './components/ReportCard';

// Convert AVAILABLE_ITEMS to Item[] compatible format for the UI
// SafetyItem uses 'slot', Item uses 'type'. We map slot -> type.
const UI_ITEMS: Item[] = AVAILABLE_ITEMS.map(i => ({
  id: i.id,
  name: i.name,
  icon: i.icon, // This is a string name, but Item expects ReactNode usually? 
  // Wait, earlier DraggableItem rendered icon. 
  // In types.ts: icon?: ReactNode
  // AVAILABLE_ITEMS uses string names for Lucide icons.
  // We need to map string names to Lucide components if we want them to show up!
  // Or we can update DraggableItem to handle string icons?
  // For now let's just use a placeholder or handle it in DraggableItem if possible.
  // Update: DraggableItem renders `{item.icon || <Box size={20}/>}`. 
  // If item.icon is a string, React might complain if we try to render it directly as node? 
  // Actually DraggableItem just puts it in a div. String is valid ReactNode.
  // But we want actual icons. 
  // Let's import the specific icons we need here or generic ones.
  type: i.slot, // Map slot to type
  rarity: 'common'
}));

const SLOTS: Slot[] = [
  { id: 'slot-head', type: 'head', label: 'Cranial' },
  { id: 'slot-eyes', type: 'eyes', label: 'Optics' },
  { id: 'slot-face', type: 'face', label: 'Facial' },
  { id: 'slot-body', type: 'body', label: 'Torso' },
  { id: 'slot-hands', type: 'hands', label: 'Manipulators' },
  { id: 'slot-pockets', type: 'pockets', label: 'Storage' },
  { id: 'slot-feet', type: 'feet', label: 'Mobility' },
];

function App() {
  const [cacheItems, setCacheItems] = useState<Item[]>(UI_ITEMS);
  const [equippedItems, setEquippedItems] = useState<Record<string, Item | null>>({
    'slot-head': null,
    'slot-eyes': null,
    'slot-face': null,
    'slot-body': null,
    'slot-hands': null,
    'slot-pockets': null,
    'slot-feet': null,
  });
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setActiveItem(event.active.data.current.item);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const item = active.data.current?.item as Item;
    const slotId = over.id as string;

    if (cacheItems.find(i => i.id === item.id)) {
      const targetSlot = SLOTS.find(s => s.id === slotId);
      if (targetSlot && targetSlot.type === item.type) {

        const currentItemInSlot = equippedItems[slotId];

        setEquippedItems(prev => ({
          ...prev,
          [slotId]: item
        }));

        setCacheItems(prev => {
          const newCache = prev.filter(i => i.id !== item.id);
          if (currentItemInSlot) {
            newCache.push(currentItemInSlot);
          }
          return newCache;
        });
      }
    }
  };

  const handleSimulate = () => {
    // Reconstruct the SafetyItem[] list from equipped items
    const equippedSafetyItems: SafetyItem[] = [];
    Object.values(equippedItems).forEach(item => {
      if (item) {
        const original = AVAILABLE_ITEMS.find(i => i.id === item.id);
        if (original) {
          equippedSafetyItems.push(original);
        }
      }
    });

    const result = runSimulation(equippedSafetyItems, 'Rain', 'High');
    setSimulationResult(result);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-mono relative overflow-hidden selection:bg-cyan-500/30">

        {/* Simulation Report Card Overlay */}
        <ReportCard result={simulationResult} onClone={() => setSimulationResult(null)} />

        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">

          {/* Left Column: Supply Cache - Desktop: Col 1, Mobile: Order 3 (Bottom) */}
          <section className="order-3 md:order-1 md:col-span-1 bg-slate-900/50 border border-slate-700/50 rounded-sm overflow-hidden flex flex-col backdrop-blur-sm shadow-2xl shadow-black/50 h-80 md:h-auto">
            <header className="bg-slate-800/80 p-3 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Supply Cache
              </h2>
              <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            </header>
            <div className="flex-1 p-4 overflow-y-auto md:overflow-y-auto overflow-x-auto custom-scrollbar bg-slate-950/30">
              <SupplyCache items={cacheItems} />
            </div>
          </section>

          {/* Center Column: The Activist - Desktop: Col 2-3, Mobile: Order 2 (Middle) */}
          <section className="order-2 md:order-2 md:col-span-2 bg-slate-900/50 border border-slate-700/50 rounded-sm overflow-hidden flex flex-col relative backdrop-blur-sm shadow-2xl shadow-black/50 min-h-[500px] md:min-h-0">
            <header className="bg-slate-800/80 p-3 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Activist Schematic</h2>
              <div className="text-[10px] text-slate-400 font-mono">ID: 773-49-ALPHA</div>
            </header>
            <div className="flex-1 p-6 flex justify-center items-center relative bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)]">
              {/* Tactical overlay graphics */}
              <div className="absolute inset-0 pointer-events-none border-[0.5px] border-cyan-900/20 m-2 rounded-sm"></div>
              <div className="absolute top-2 left-2 w-4 h-[1px] bg-cyan-500/50"></div>
              <div className="absolute top-2 left-2 h-4 w-[1px] bg-cyan-500/50"></div>
              <div className="absolute bottom-2 right-2 w-4 h-[1px] bg-cyan-500/50"></div>
              <div className="absolute bottom-2 right-2 h-4 w-[1px] bg-cyan-500/50"></div>

              <Activist slots={SLOTS} equippedItems={equippedItems} />
            </div>
          </section>

          {/* Right Column: The Briefing - Desktop: Col 4, Mobile: Order 1 (Top) */}
          <section className="order-1 md:order-3 md:col-span-1 flex flex-col gap-6">
            <Briefing onSimulate={handleSimulate} />
          </section>

        </div>
        <DragOverlay>
          {activeItem ? <DraggableItem item={activeItem} hideLabel /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default App;
