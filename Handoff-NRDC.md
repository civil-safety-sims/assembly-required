# Developer Handoff: NRDC Health & Safety Extraction

**Date:** 2026-02-01
**Source:** NRDC (Natural Resources Defense Council) & General Protest Safety Consensus
**Scope:** Environmental health, weather protection, and essential supplies.

---

## Extracted Data

```json
{
  "sourceMeta": {
    "name": "NRDC Health & Safety",
    "url": "https://www.nrdc.org/stories/how-protest-safely"
  },
  "newItems": [
    {
      "id": "item-rain-poncho",
      "name": "Rain Poncho",
      "slot": "body",
      "attributes": { "providesWaterResistance": true },
      "tags": ["clothing", "weather"]
    },
    {
      "id": "item-portable-charger",
      "name": "Portable Charger",
      "slot": "pockets",
      "attributes": { "providesPower": true },
      "tags": ["tech", "utility"]
    },
    {
      "id": "item-prescription-meds",
      "name": "Meds (Original Bottle)",
      "slot": "pockets",
      "attributes": { "requiresPrescription": true },
      "tags": ["medical"]
    },
    {
      "id": "item-cash",
      "name": "Cash",
      "slot": "pockets",
      "attributes": { "isUntraceable": true, "providesResource": true },
      "tags": ["utility"]
    }
  ],
  "newRules": [
    {
      "trigger": "rain",
      "targetAttribute": "providesWaterResistance",
      "effect": "POSITIVE",
      "feedbackMessage": "Rain gear prevents hypothermia and keeps you effective in wet weather.",
      "severity": "success"
    },
    {
      "trigger": "rain",
      "targetAttribute": "!providesWaterResistance",
      "effect": "NEGATIVE",
      "feedbackMessage": "Getting wet increases risk of hypothermia and misery. Bring rain gear.",
      "severity": "warning"
    },
    {
      "trigger": "long_duration",
      "targetAttribute": "providesPower",
      "effect": "POSITIVE",
      "feedbackMessage": "A portable charger ensures you can maintain comms during long events.",
      "severity": "info"
    },
    {
      "trigger": "arrest",
      "targetAttribute": "requiresPrescription",
      "effect": "POSITIVE",
      "feedbackMessage": "Original packaging proves medication is legal and yours.",
      "severity": "info"
    },
    {
      "trigger": "any",
      "targetAttribute": "isUntraceable",
      "effect": "POSITIVE",
      "feedbackMessage": "Cash works when networks are down or cards are tracked.",
      "severity": "info"
    }
  ],
  "newAttributes": [
    {
      "name": "providesWaterResistance",
      "description": "Protects against rain and getting wet"
    },
    {
      "name": "providesPower",
      "description": "Keeps electronic devices charged"
    },
    {
      "name": "isUntraceable",
      "description": "Cannot be digitally tracked like credit cards"
    },
    {
      "name": "providesResource",
      "description": "Can be exchanged for goods/services"
    }
  ]
}
```

---

## Implementation Notes

- **Weather System**: The `rain` trigger should hook into the `precip` state in `App.tsx` / `simulationEngine.ts`.
- **Precipitation Logic**:
    - If `precip === true`: Apply warnings if `!providesWaterResistance`.
- **Medication**: We already have `isLoosePills` (Negative). `requiresPrescription` (Positive if in bottle) provides the counter-example.
