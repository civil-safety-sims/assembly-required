import { useState, useMemo } from 'react';
import { SupplyCache } from './components/SupplyCache';
import { Activist } from './components/Activist';
import { Briefing } from './components/Briefing';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, type DragEndEvent, rectIntersection } from '@dnd-kit/core';
import type { Item, Slot, ItemType, TemperatureLevel } from './types';
import { DraggableItem } from './components/DraggableItem';
import { AVAILABLE_ITEMS, type SafetyItem } from './data/gameData';
import { runSimulation, type SimulationResult, type ThreatLevelType } from './logic/simulationEngine';
import { ReportCard } from './components/ReportCard';
import { Settings, Book } from 'lucide-react';
import { SettingsModal } from './components/SettingsModal';
import { SourcesModal } from './components/SourcesModal';
import { SignInputModal } from './components/SignInputModal';

// Convert AVAILABLE_ITEMS to Item[] compatible format for the UI
// SafetyItem uses 'slot', Item uses 'type'. We map slot -> type.
const UI_ITEMS: Item[] = AVAILABLE_ITEMS.map(i => ({
  id: i.id,
  name: i.name,
  icon: i.icon,
  type: i.slot, // Map slot to type
  rarity: 'common',
  tags: i.tags,
}));

const SLOTS: Slot[] = [
  { id: 'slot-head', type: 'head', label: 'Head' },
  { id: 'slot-eyes', type: 'eyes', label: 'Eyes' },
  { id: 'slot-face', type: 'face', label: 'Face' },
  { id: 'slot-body', type: 'body', label: 'Torso' },
  { id: 'slot-hand-1', type: 'hands', label: 'Hand 1' },
  { id: 'slot-hand-2', type: 'hands', label: 'Hand 2' },
  // Storage Slots (1-9)
  { id: 'slot-storage-1', type: 'pockets', label: '1' },
  { id: 'slot-storage-2', type: 'pockets', label: '2' },
  { id: 'slot-storage-3', type: 'pockets', label: '3' },
  { id: 'slot-storage-4', type: 'pockets', label: '4' },
  { id: 'slot-storage-5', type: 'pockets', label: '5' },
  { id: 'slot-storage-6', type: 'pockets', label: '6' },
  { id: 'slot-storage-7', type: 'pockets', label: '7' },
  { id: 'slot-storage-8', type: 'pockets', label: '8' },
  { id: 'slot-storage-9', type: 'pockets', label: '9' },
  { id: 'slot-feet', type: 'feet', label: 'Feet' },
];

const INITIAL_EQUIPPED: Record<string, Item | null> = {
  'slot-head': null,
  'slot-eyes': null,
  'slot-face': null,
  'slot-body': null,
  'slot-hand-1': null,
  'slot-hand-2': null,
  'slot-storage-1': null,
  'slot-storage-2': null,
  'slot-storage-3': null,
  'slot-storage-4': null,
  'slot-storage-5': null,
  'slot-storage-6': null,
  'slot-storage-7': null,
  'slot-storage-8': null,
  'slot-storage-9': null,
  'slot-feet': null,
};

const DEFAULT_SETTINGS = {
  useMenstrualProducts: false,
  hasIdentifiableFeatures: false,
  requiresCorrectiveLenses: false,
  requiresPrescriptionMeds: false,
  requiresMobilityAid: false,
};

function App() {
  const [cacheItems, setCacheItems] = useState<Item[]>(UI_ITEMS);
  const [equippedItems, setEquippedItems] = useState<Record<string, Item | null>>(INITIAL_EQUIPPED);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  // Sign Editing State
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleEditSign = (item: Item) => {
    setEditingItem(item);
  };

  const handleSaveSign = (text: string) => {
    if (!editingItem) return;

    // Helper to update item in a list
    const updateItemInList = (list: Item[]) =>
      list.map(i => i.id === editingItem.id ? { ...i, customText: text } : i);

    // Helper to update item in record
    const updateItemInRecord = (record: Record<string, Item | null>) => {
      const newRecord = { ...record };
      Object.keys(newRecord).forEach(key => {
        const item = newRecord[key];
        if (item && item.id === editingItem.id) {
          newRecord[key] = { ...item, customText: text };
        }
      });
      return newRecord;
    };

    // Update in cache
    setCacheItems(prev => updateItemInList(prev));

    // Update in equipped
    setEquippedItems(prev => updateItemInRecord(prev));

    setEditingItem(null);
  };

  // User Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Category Filter State
  const [activeCategory, setActiveCategory] = useState<ItemType | 'all' | 'comms' | 'signs'>('all');

  // Environmental State
  const [temperature, setTemperature] = useState<TemperatureLevel>('Comfortable');
  const [precip, setPrecip] = useState<boolean>(false);
  const [threatLevel, setThreatLevel] = useState<ThreatLevelType>('Low');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Filter items based on category and settings
  const filteredItems = useMemo(() => {
    return cacheItems.filter(item => {
      // 1. Category Filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'comms') {
          if (!item.tags?.includes('comms')) return false;
        } else if (activeCategory === 'signs') {
          if (!item.tags?.includes('signs')) return false;
        } else if (activeCategory === 'pockets' && item.type === 'pockets') {
          // pass
        } else if (item.type !== activeCategory) {
          return false;
        }
      }

      // 2. Settings Filters
      // Hide menstrual products if not needed
      if (!settings.useMenstrualProducts && (item.id === 'item-tampons' || item.id === 'item-pads')) {
        return false;
      }

      // Show corrective vision items (Contact Lenses, Rx Safety Glasses) only if user requires them
      const safetyItem = AVAILABLE_ITEMS.find(si => si.id === item.id);
      if (!settings.requiresCorrectiveLenses && safetyItem?.attributes.isSensoryAid && (item.id === 'item-contact-lenses' || item.id === 'item-prescription-safety-glasses')) {
        return false;
      }

      // Hide loose meds if prescription meds are required
      if (settings.requiresPrescriptionMeds && item.id === 'item-loose-meds') {
        return false;
      }

      return true;
    });
  }, [cacheItems, settings.useMenstrualProducts, settings.requiresCorrectiveLenses, settings.requiresPrescriptionMeds, activeCategory]);

  const handleDragStart = (event: any) => {
    setActiveItem(event.active.data.current.item);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const item = active.data.current?.item as Item;
    const slotId = over.id as string;

    if (over.id === 'supply-cache') {
      // Unequip logic
      // Find which slot currently holds this item
      const currentSlotId = Object.keys(equippedItems).find(key => equippedItems[key]?.id === item.id);

      if (currentSlotId) {
        setEquippedItems(prev => ({
          ...prev,
          [currentSlotId]: null
        }));

        setCacheItems(prev => {
          if (prev.find(i => i.id === item.id)) return prev;
          return [...prev, item];
        });
      }
      return;
    }

    const cachedItem = cacheItems.find(i => i.id === item.id);

    if (cachedItem) {
      const targetSlot = SLOTS.find(s => s.id === slotId);

      // Allow drop if types match OR if the target is a storage slot (pockets)
      if (targetSlot && (targetSlot.type === item.type || targetSlot.type === 'pockets')) {
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
    } else {
      // Moving from slot to slot (swapping or moving storage)
      const sourceSlotId = Object.keys(equippedItems).find(key => equippedItems[key]?.id === item.id);
      const targetSlot = SLOTS.find(s => s.id === slotId);

      if (sourceSlotId && targetSlot && (targetSlot.type === item.type || targetSlot.type === 'pockets')) {
        const currentItemInTarget = equippedItems[slotId];

        setEquippedItems(prev => ({
          ...prev,
          [sourceSlotId]: currentItemInTarget || null, // Swap or clear source
          [slotId]: item
        }));
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

    // We need to pass the simple strings to runSimulation matching its signature
    // runSimulation(items: SafetyItem[], temp: TemperatureLevel, precip: boolean, threat: ThreatLevel)
    // Note: simulationEngine types should match these.
    // Assuming simulationEngine exported types act as the source of truth.
    // Need to cast or ensuring types align.
    // Need to cast or ensuring types align.
    const result = runSimulation(equippedSafetyItems, temperature, precip, threatLevel);
    setSimulationResult(result);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'comms', label: 'Comms' },
    { id: 'signs', label: 'Signs' },
    { id: 'head', label: 'Head' },
    { id: 'eyes', label: 'Eyes' },
    { id: 'face', label: 'Face' },
    { id: 'body', label: 'Body' },
    { id: 'hands', label: 'Hands' },
    { id: 'pockets', label: 'Storage' },
    { id: 'feet', label: 'Feet' },
  ];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-mono relative overflow-hidden selection:bg-cyan-500/30">

        {/* Global UI Elements */}

        {/* Sources Button */}
        <button
          onClick={() => setIsSourcesOpen(true)}
          className="absolute top-4 right-16 z-40 p-2 text-slate-500 hover:text-emerald-500 hover:-translate-y-1 transition-all bg-slate-900/50 rounded-full border border-slate-700 hover:border-emerald-500/50 backdrop-blur-sm"
          title="Trusted Sources & Guidance"
        >
          <Book size={20} />
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-4 right-4 z-40 p-2 text-slate-500 hover:text-cyan-500 hover:rotate-90 transition-all bg-slate-900/50 rounded-full border border-slate-700 hover:border-cyan-500/50 backdrop-blur-sm"
          title="Configure Protocol"
        >
          <Settings size={20} />
        </button>

        {/* Sources Modal */}
        <SourcesModal
          isOpen={isSourcesOpen}
          onClose={() => setIsSourcesOpen(false)}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={setSettings}
        />

        {/* Simulation Report Card Overlay */}
        <ReportCard result={simulationResult} onClose={() => setSimulationResult(null)} />

        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">

          {/* Left Column: Supply Cache - Desktop: Col 1, Mobile: Order 3 (Bottom) */}
          <section className="order-3 md:order-1 md:col-span-1 bg-slate-900/50 border border-slate-700/50 rounded-sm overflow-hidden flex flex-col backdrop-blur-sm shadow-2xl shadow-black/50 h-80 md:h-auto">
            <header className="bg-slate-800/80 p-3 border-b border-slate-700 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  Supply Cache
                </h2>
                <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 flex-wrap pb-1 justify-start">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`
                            px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border whitespace-nowrap transition-colors
                            ${activeCategory === cat.id
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                        : 'bg-slate-900 text-slate-500 border-slate-700 hover:text-slate-300 hover:border-slate-500'}
                        `}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </header>
            <div className="flex-1 p-4 overflow-y-auto md:overflow-y-auto overflow-x-auto custom-scrollbar bg-slate-950/30">
              <SupplyCache items={filteredItems} onEdit={handleEditSign} />
            </div>
          </section>

          {/* Center Column: The Activist - Desktop: Col 2-3, Mobile: Order 2 (Middle) */}
          <section className="order-2 md:order-2 md:col-span-2 bg-slate-900/50 border border-slate-700/50 rounded-sm flex flex-col relative backdrop-blur-sm shadow-2xl shadow-black/50 min-h-[500px] md:min-h-0">
            <header className="bg-slate-800/80 p-3 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Activist Schematic</h2>
              <div className="text-[10px] text-slate-400 font-mono">ID: 773-49-ALPHA</div>
            </header>
            <div className="flex-1 p-6 flex justify-center relative bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)] overflow-y-auto custom-scrollbar">
              {/* Tactical overlay graphics */}
              <div className="absolute inset-0 pointer-events-none border-[0.5px] border-cyan-900/20 m-2 rounded-sm"></div>
              <div className="absolute top-2 left-2 w-4 h-[1px] bg-cyan-500/50"></div>
              <div className="absolute top-2 left-2 h-4 w-[1px] bg-cyan-500/50"></div>
              <div className="absolute bottom-2 right-2 w-4 h-[1px] bg-cyan-500/50"></div>
              <div className="absolute bottom-2 right-2 h-4 w-[1px] bg-cyan-500/50"></div>

              <Activist slots={SLOTS} equippedItems={equippedItems} onEdit={handleEditSign} />
            </div>
          </section>

          {/* Right Column: The Briefing - Desktop: Col 4, Mobile: Order 1 (Top) */}
          <section className="order-1 md:order-3 md:col-span-1 flex flex-col gap-6">
            <Briefing
              onSimulate={handleSimulate}
              temp={temperature}
              setTemp={setTemperature}
              precip={precip}
              setPrecip={setPrecip}
              threat={threatLevel}
              setThreat={setThreatLevel}
            />
          </section>

        </div>
        <DragOverlay>
          {activeItem ? <DraggableItem item={activeItem} hideLabel /> : null}
        </DragOverlay>

        {/* Sign Edit Modal */}
        {editingItem && (
          <SignInputModal
            isOpen={!!editingItem}
            onClose={() => setEditingItem(null)}
            initialText={editingItem.customText || ''}
            onSave={handleSaveSign}
          />
        )}

      </div>
    </DndContext>
  );
}

export default App;
