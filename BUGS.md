# Assembly Required - Bug & Improvement Tracker

## Bugs

### ~~1. Redundant category filter logic~~
**File:** `cyberpunk-dossier/src/App.tsx:94-97`

```typescript
if (activeCategory === 'pockets' && item.type === 'pockets') return true;
if (item.type !== activeCategory) return false;
```

~~The first condition is redundant - if `activeCategory === 'pockets'` and `item.type === 'pockets'`, the second condition would also pass. This appears to be leftover debugging code.~~

**Fix:** ~~Remove the first condition entirely.~~ **(FIXED)**

---

### ~~2. Misleading prop name `onClone`~~
**File:** `cyberpunk-dossier/src/components/ReportCard.tsx:7-8`

```typescript
onClone: () => void; // Button to reset/close
```

~~The prop is named `onClone` but functions as `onClose`. This is confusing for maintainability.~~

**Fix:** ~~Rename to `onClose` in both `ReportCard.tsx` and `App.tsx:197`.~~ **(FIXED)**

---

## Improvements

### 3. Type inconsistency between `Item` and `SafetyItem`
**Files:** `types.ts`, `gameData.ts`, `App.tsx`

- `Item.icon` is typed as `ReactNode`
- `SafetyItem.icon` is typed as `string`
- `App.tsx:16-22` manually maps between them

**Suggestion:** Unify the types or create a shared base interface to avoid the mapping layer.

---

### 4. Storage slots recreated on every render
**File:** `cyberpunk-dossier/src/components/Activist.tsx:14`

```typescript
const storageSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `slot-storage-${i}`);
```

This array is recreated on every render.

**Suggestion:** Move to a constant outside the component.

---

### ~~5. Missing keyboard accessibility for modals~~
**Files:** `ReportCard.tsx`, `SettingsModal.tsx`

- ~~No focus trapping inside modals~~
- ~~`Escape` key doesn't close modals~~
- ~~Screen readers may not announce modal opening~~

**Suggestion:** ~~Add `onKeyDown` handler for Escape, trap focus within modal, add `role="dialog"` and `aria-modal="true"`.~~ **(PARTIALLY FIXED - Escape key added to ReportCard)**

---

### 6. No way to unequip items
**File:** `cyberpunk-dossier/src/App.tsx`

Users can swap items between slots but cannot remove an item from a slot back to the cache without having another item to swap.

**Suggestion:** Allow dragging equipped items back to the Supply Cache, or add a click/button to unequip.

---

### 7. Positive items don't increase score
**File:** `cyberpunk-dossier/src/logic/simulationEngine.ts`

Score starts at 100 and only decreases. Positive items (water bottle) add feedback but don't reward the player.

**Suggestion:** Consider adding points for good choices to make the scoring feel more dynamic.

---

## Questions / Design Decisions

### ~~8. Storage slots accept any item type~~
**File:** `cyberpunk-dossier/src/App.tsx:122`

```typescript
if (targetSlot && (targetSlot.type === item.type || targetSlot.type === 'pockets'))
```

~~Is this intentional? Currently you can put a "body" item in a storage slot.~~

**(INTENDED BEHAVIOR) - User confirmed that extra clothes in storage are valid strategy.**

---

*Last updated: 2026-01-31*
