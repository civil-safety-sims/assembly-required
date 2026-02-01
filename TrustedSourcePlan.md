# Trusted Source Pipeline Plan

A guide for tracking trusted websites and converting their content into game rules and items for Assembly Required.

---

## Current Baseline

### Existing Trusted Sources (6)

| Source | URL | Topics Covered |
|--------|-----|----------------|
| Amnesty International | amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf | Clothing, eye protection |
| National Lawyers Guild (NLG) | nlg.org/know-your-rights/ | Legal rights, medical items |
| EFF Surveillance Self-Defense | ssd.eff.org/module/attending-protest | Digital security, phones, tracking |
| Physicians for Human Rights (PHR) | phr.org/our-work/resources/preparing-for-protecting-against-and-treating-tear-gas-and-other-chemical-irritant-exposure-a-protesters-guide/ | Tear gas, chemical exposure |
| ACLU | aclu.org/know-your-rights/protesters-rights | General rights, signage |
| Committee to Protect Journalists (CPJ) | cpj.org (referenced in README, not yet used in items) | Physical safety |
| Sins Invalid / DREDF | dredf.org/2020/06/16/know-your-rights-protesting-while-disabled/ | Disability rights, mobility aids, medications |
| NRDC | nrdc.org/stories/how-protest-safely | Health, weather, hydration, sun/cold protection |
| WITNESS | library.witness.org/product/filming-protests-demonstrations-usa/ | Ethical recording, protecting identities, filming police conduct |

### Current Item Attribute System (9 attributes)

```typescript
isFlammable        // Material burns/melts under heat
isBiometric        // Can be compelled to unlock (not 5th Amendment protected)
isAbsorbent        // Absorbs chemicals internally
isSterile          // Safe for wound/eye flushing
requiresPrescription  // Needs original container to avoid confiscation
isLoosePills       // Confiscation risk as "unknown substances"
isSignalBlocking   // Blocks cell tracking (Faraday)
isAnonymous        // No personal ID linkage
hasEncryptedComms  // End-to-end encryption
```

### Current Rule Pattern

Rules follow this structure in `simulationEngine.ts`:

```
IF (environmentCondition) AND (item.attribute === true)
THEN score ± points
THEN feedback.push({ message, sourceUrl, sourceName, severity })
```

Severity levels: `critical`, `warning`, `info`, `success`

---

## Phase 1: Source Registry

Create a central registry to track all trusted sources.

### Proposed File: `src/data/sources.ts`

```typescript
interface TrustedSource {
  id: string;
  name: string;
  shortName: string;        // For display in UI
  url: string;
  topics: string[];         // Categories this source covers
  notes?: string;           // Any caveats or context
}

export const TRUSTED_SOURCES: TrustedSource[] = [
  {
    id: 'amnesty-safety-toolkit',
    name: 'Amnesty International Safety Toolkit',
    shortName: 'Amnesty International',
    url: 'https://www.amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf',
    topics: ['clothing', 'eye-protection', 'general-safety'],
  },
  // ... existing sources
];
```

### Recommended Sources to Add

| Organization | URL | Topics | Priority |
|--------------|-----|--------|----------|

| OSHA | osha.gov | PPE standards (N95, eye pro ratings) | Medium |
| CDC | cdc.gov | Tear gas medical guidance | Low (overlaps PHR) |

---

## Phase 2: Content Extraction Workflow

For each trusted source, follow this process to extract items and rules.

### Step 2.1: Document Analysis

Read the source and identify:

1. **Physical items mentioned** - What gear/equipment is discussed?
2. **Risk associations** - What items are warned against and why?
3. **Benefit associations** - What items are recommended and why?
4. **Triggering conditions** - When do risks/benefits apply? (tear gas, arrest, heat, etc.)

### Step 2.2: Attribute Mapping

For each piece of advice, determine if it maps to an existing attribute or requires a new one.

**Example extraction from PHR tear gas guide:**

| Source Text | Item | Attribute | Rule |
|-------------|------|-----------|------|
| "Avoid oil-based sunscreen - traps chemicals" | Oil-Based Sunscreen | `isOilBased: true` | High threat + isOilBased = warning |
| "Sealed goggles protect eyes from gas" | Swim Goggles | `blocksChemical: true` | High threat + blocksChemical = success |
| "N95 masks reduce particle inhalation" | N95 Mask | `isRespirator: true` | High threat + isRespirator = success |

### Step 2.3: Item Creation Template

```typescript
{
  id: 'item-[slug]',
  name: '[Display Name]',
  icon: '[Lucide Icon Name]',
  slot: '[head|eyes|face|body|hands|pockets|feet]',
  sourceUrl: '[Full URL with anchor if possible]',
  sourceName: '[Organization Name]',
  attributes: {
    ...DEFAULT_ATTRIBUTES,
    [relevantAttribute]: true,
  },
  tags: ['[category]'],  // Optional: comms, signs, medical, etc.
}
```

### Step 2.4: Rule Creation Template

```typescript
// In simulationEngine.ts

// [RULE NAME]: [Brief description]
// Source: [Organization] - [Specific guidance]
if (condition) {
  const matchingItems = equippedItems.filter(item => item.attributes.[attribute]);
  if (matchingItems.length > 0) {
    score += [points];  // Negative for risks, positive for benefits
    matchingItems.forEach(item => {
      feedback.push({
        message: `[LABEL]: [Explanation of risk/benefit]`,
        sourceUrl: item.sourceUrl,
        sourceName: item.sourceName,
        severity: '[critical|warning|info|success]'
      });
    });
  }
}
```

---

## Phase 3: Attribute & Rule Expansion

### Suggested New Attributes

| Attribute | Description | Source Basis | Example Items |
|-----------|-------------|--------------|---------------|
| `isOilBased` | Traps chemical agents on skin | PHR tear gas guide | Sunscreen, makeup, lotions |
| `blocksChemical` | Provides sealed barrier against gas/spray | PHR, Amnesty | Sealed goggles, gas mask |
| `isRespirator` | Filters airborne particles | OSHA, PHR | N95, P100, half-mask |
| `isPressCredential` | Identifies as media | CPJ | Press badge, camera |
| `isFirstAid` | Medical supplies | Street medic guides | Medkit, saline, bandages |
| `isIdentifying` | Contains personal info | NLG | Work ID, wallet with cards |
| `providesHydration` | Prevents heat-related illness | Multiple | Water, electrolytes |
| `isDocumentation` | Records evidence | Witness.org | Camera, notebook |
| `isPress` | Identifies as media (Press Pass) | CPJ (Committee to Protect Journalists) | Press Pass, Large Camera |
| `isMobilityAid` | Assistive device for mobility | Sins Invalid / DREDF | Wheelchair, Cane, Walker |
| `requiresMobilityAccess` | User requires accessible routes | Sins Invalid / DREDF | (Player Trait / Context) |

### Suggested New Rules

| Rule | Condition | Attribute | Effect | Severity |
|------|-----------|-----------|--------|----------|
| Chemical Trap | High threat | `isOilBased` | -20 pts | warning |
| Eye Protection | High threat | `blocksChemical` | +15 pts | success |
| Respiratory Protection | High threat | `isRespirator` | +20 pts | success |
| Heat Exhaustion | Hot weather | `!providesHydration` | -10 pts | warning |
| Identity Exposure | High threat | `isIdentifying` | -15 pts | warning |
| Evidence Preservation | Any | `isDocumentation` | +5 pts | info |
| Press Visibility | High Police Presence | `isPress` | +10 pts (Documentation) / -10 pts (Targeting) | warning |
| Mobility Needs | Dispersal Order | `isMobilityAid` | -10 pts (Speed) / +10 pts (Preparedness) | warning |
### Special Guidance Sections

#### Journalist Identification (Source: CPJ)
*   **Context**: "Press" identification can provide some legal protection but can also make you a specific target for police attention or harassment.
*   **Items**: Press Pass (neck/body), Professional Camera (hands).
*   **Attribute**: `isPress`.
*   **Rule Logic**:
    *   IF `isPress` AND `policeBehavior == aggressive`: WARNING "Press credentials may make you a target."
    *   IF `isPress` AND `policeBehavior == standard`: INFO "Press credentials identify you as an observer."

#### Mobility & Disability (Source: Sins Invalid / DREDF)
*   **Context**: Protesting with a disability requires specific planning for dispersal, accessible routes, and medication continuity.
*   **Items**: Mobility Aids (Cane, Walker, Wheelchair), Extra Meds.
*   **Attribute**: `isMobilityAid`.
*   **Rule Logic**:
    *   IF `isMobilityAid` AND `dispersal == fast`: CRITICAL "Mobility aids may impact dispersal speed. Plan exit routes early."
    *   IF `isMobilityAid`: INFO "Ensure device is labeled with emergency contact info in case of separation."


---

## Phase 4: Quality Checklist

For each item/rule added:

- [ ] Source URL is accessible and content matches claim
- [ ] Linked to specific section (anchor link) where possible
- [ ] Cross-referenced with at least one other source (when possible)

### Broken Link Handling

If a source URL no longer exists or content has changed:

1. File a bug report with:
   - The broken/changed URL
   - Which items/rules reference it
   - Suggested replacement source (if known)
2. Temporarily mark affected items with a note until resolved
3. Do not remove safety guidance without a replacement source

---

## Phase 5: In-App Sources Page

Provide a dedicated page/modal in the app where users can browse all trusted sources directly. This serves users who:

- Play the game once and want to read the full source material
- Want to verify the advice given in feedback cards
- Prefer to bookmark authoritative sources for later reference

### Proposed UI: "Resources" or "Learn More" Section

Accessible from the main UI (e.g., settings area or footer link).

**Display per source:**
- Organization name
- Brief description of what they cover (1-2 sentences)
- Direct link to the source document
- Topics/tags (e.g., "digital security", "chemical exposure", "legal rights")

**Example layout:**
```
┌─────────────────────────────────────────────────────────┐
│  TRUSTED SOURCES                                        │
├─────────────────────────────────────────────────────────┤
│  EFF Surveillance Self-Defense                          │
│  Digital security, phone privacy, tracking prevention   │
│  [→ ssd.eff.org/module/attending-protest]              │
│  Tags: comms, digital, privacy                          │
├─────────────────────────────────────────────────────────┤
│  Physicians for Human Rights                            │
│  Tear gas exposure, chemical decontamination            │
│  [→ phr.org/...]                                        │
│  Tags: medical, chemical, first-aid                     │
├─────────────────────────────────────────────────────────┤
│  ...                                                    │
└─────────────────────────────────────────────────────────┘
```

### Data Requirements

The `sources.ts` registry needs additional fields:

```typescript
interface TrustedSource {
  id: string;
  name: string;
  shortName: string;
  url: string;
  topics: string[];
  description: string;      // 1-2 sentence summary for UI display
}
```

### Implementation Notes

- Sources page pulls directly from `TRUSTED_SOURCES` array
- No hardcoded links in UI - all sources come from registry
- Consider grouping by topic (Legal, Medical, Digital, Physical Safety)
- Mobile-friendly: sources should be tap-to-open links

---

## Deliverables

| File | Purpose |
|------|---------|
| `src/data/sources.ts` | Central source registry |
| `src/data/gameData.ts` | Expanded with new items from additional sources |
| `src/logic/simulationEngine.ts` | Expanded with new rules for new attributes |
| `src/components/SourcesPage.tsx` | NEW: In-app sources browser component |
| `SOURCES.md` | Human-readable documentation of all sources |

---

## Open Questions

1. **Source priority**: Which new sources should be added first?
2. **Attribute granularity**: Should respirators be one attribute or split (N95 vs gas mask)? Answer: Masks should probably have two attributes, one for environmental factors and one for anti-surveillance. Example, a bandana is good for anonymity but not for chemical protection.
3. **Weather rules**: Currently unused - should hot/cold weather trigger more rules? Answer: Yes, eventually we should check that clothing items are appropriate for the weather, including precipitation, as a mild rainy day should be different to prepare for than a hot, sunny day.
4. **Negative items**: Should we add more "bad" items to teach what NOT to bring? Answer: Yes, especially items that are commonly mistaken for being useful, such as conflicting information on usage of milk, or something that may be seen as harmless, like wearing open toed shoes.
5. **Slot expansion**: Do we need new slots (e.g., `bag`, `neck`) for new items? Answer: I don't think so, to make the UI more simple.
6. **Sources page location**: Should it be a modal (like Settings) or a separate route/tab? Answer: I think a modal is fine.
7. **Source filtering**: Should users be able to filter sources by topic (legal, medical, digital)? Answer: No, but having general information on what those pages may cover would be useful.

---

## Notes

- All safety data is provided by the organizations listed. I do not own or control that content.
- Items must cite specific, verifiable sources - no generic advice
- Err on the side of caution: if guidance is ambiguous, don't include it, or state the abiguity at the very least.
