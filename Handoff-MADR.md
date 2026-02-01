# Developer Handoff: Street Medic Handbook Extraction

**Date:** 2026-02-01
**Sections Reviewed:** Chapter 2 (Clothing), Chapter 8 (Environmental Health)
**Scope:** General protester awareness (not medic training)

---

## Extracted Data

```json
{
  "sourceMeta": {
    "name": "Street Medic Handbook",
    "url": "https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf"
  },
  "newItems": [
    {
      "id": "item-oil-sunscreen",
      "name": "Oil-Based Sunscreen",
      "slot": "pockets",
      "attributes": { "isOilBased": true },
      "tags": ["negative", "chemical"]
    },
    {
      "id": "item-flip-flops",
      "name": "Flip Flops",
      "slot": "feet",
      "attributes": { "isOpenToed": true },
      "tags": ["negative", "clothing"]
    },
    {
      "id": "item-electrolytes",
      "name": "Electrolyte Packets",
      "slot": "pockets",
      "attributes": { "providesHydration": true },
      "tags": ["medical", "hydration"]
    },
    {
      "id": "item-hand-warmers",
      "name": "Hand Warmers",
      "slot": "pockets",
      "attributes": { "providesWarmth": true },
      "tags": ["clothing", "cold-weather"]
    },
    {
      "id": "item-snacks",
      "name": "Trail Mix",
      "slot": "pockets",
      "attributes": { "providesEnergy": true },
      "tags": ["medical", "stamina"]
    }
  ],
  "newRules": [
    {
      "trigger": "tear_gas",
      "targetAttribute": "isOilBased",
      "effect": "NEGATIVE",
      "feedbackMessage": "Oil-based products trap pepper spray and tear gas against your skin.",
      "severity": "warning"
    },
    {
      "trigger": "any",
      "targetAttribute": "isOpenToed",
      "effect": "NEGATIVE",
      "feedbackMessage": "Open-toed shoes limit mobility and increase injury risk.",
      "severity": "warning"
    },
    {
      "trigger": "any",
      "targetAttribute": "providesHydration",
      "effect": "POSITIVE",
      "feedbackMessage": "Dehydration can occur in any weather. Hydration items help you stay safe.",
      "severity": "success"
    },
    {
      "trigger": "any",
      "targetAttribute": "!providesHydration",
      "effect": "NEGATIVE",
      "feedbackMessage": "Dehydration can occur in any weather. Bring water or electrolytes.",
      "severity": "warning"
    },
    {
      "trigger": "heat",
      "targetAttribute": "providesHydration",
      "effect": "POSITIVE",
      "feedbackMessage": "Hydration is critical in hot weather to prevent heat exhaustion.",
      "severity": "success"
    },
    {
      "trigger": "cold",
      "targetAttribute": "providesWarmth",
      "effect": "POSITIVE",
      "feedbackMessage": "Warmth items help prevent hypothermia.",
      "severity": "success"
    },
    {
      "trigger": "cold",
      "targetAttribute": "!providesWarmth",
      "effect": "NEGATIVE",
      "feedbackMessage": "Hypothermia is most common at 40-60°F because people underestimate mild cold.",
      "severity": "warning"
    }
  ],
  "newAttributes": [
    {
      "name": "isOilBased",
      "description": "Traps chemical agents on skin"
    },
    {
      "name": "isOpenToed",
      "description": "Limits mobility, increases injury risk"
    },
    {
      "name": "providesHydration",
      "description": "Prevents dehydration"
    },
    {
      "name": "providesWarmth",
      "description": "Prevents hypothermia in cold weather"
    },
    {
      "name": "providesEnergy",
      "description": "Fuel for body heat and stamina"
    }
  ],
  "existingItemUpdates": [
    {
      "id": "item-water-bottle",
      "addAttributes": { "providesHydration": true }
    }
  ],
  "beforeYouGoGuidance": [
    {
      "topic": "Dress for duration",
      "guidance": "Dress appropriately for time of day, weather, length of event"
    },
    {
      "topic": "Plan for colder",
      "guidance": "Assume it will be colder than expected and bring extra clothing"
    },
    {
      "topic": "Hydrate year-round",
      "guidance": "Dehydration can occur in any weather"
    },
    {
      "topic": "Bathroom planning",
      "guidance": "It may be a long time between bathroom breaks, especially if arrested"
    },
    {
      "topic": "Underestimated cold",
      "guidance": "Hypothermia is most common at 40-60°F because people don't take the temperature seriously"
    }
  ]
}
```

---

## Confirmed Existing Guidance

The Street Medic Handbook confirms these existing game items:

| Item | Handbook Says | Game Status |
|------|---------------|-------------|
| Contact Lenses | "Do not wear contacts" | ✅ Already warns |
| Tampons | "Do not wear tampons if menstruating" | ✅ Already warns |
| Water Bottle | "Prevention is best: Drink lots of water" | ✅ Already positive |

---

## Implementation Notes

- **Negative items:** Flip Flops and Oil-Based Sunscreen teach what NOT to bring
- **Weather rules:** These activate the currently-unused weather system
- **`!attribute` notation:** Means "if user does NOT have this attribute equipped"
