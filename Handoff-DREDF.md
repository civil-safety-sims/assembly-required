# Developer Handoff: DREDF Know Your Rights for Disabled Protestors

**Date:** 2026-02-01
**Scope:** Accessibility items and disability-specific guidance

---

## Extracted Data

```json
{
  "sourceMeta": {
    "name": "DREDF Know Your Rights for Disabled Protestors Guide",
    "url": "https://dredf.org/know-your-rights-for-disabled-protestors-guide/"
  },
  "newItems": [
    {
      "id": "item-ear-plugs",
      "name": "Ear Plugs",
      "slot": "head",
      "attributes": { "isSensoryAid": true },
      "tags": ["accessibility", "sensory"]
    },
    {
      "id": "item-sunglasses",
      "name": "Sunglasses",
      "slot": "eyes",
      "attributes": { "isSensoryAid": true, "blocksChemical": false },
      "tags": ["accessibility", "sensory"]
    },
    {
      "id": "item-sealed-goggles",
      "name": "Sealed Goggles",
      "slot": "eyes",
      "attributes": { "blocksChemical": true },
      "tags": ["protective", "chemical"]
    },
    {
      "id": "item-n95-mask",
      "name": "N95 Mask",
      "slot": "face",
      "attributes": { "isRespirator": true, "isAnonymous": false },
      "tags": ["protective", "chemical", "medical"]
    },
    {
      "id": "item-first-aid-kit",
      "name": "First Aid Kit",
      "slot": "pockets",
      "attributes": { "isFirstAid": true, "isSterile": true },
      "tags": ["medical"]
    },
    {
      "id": "item-portable-charger",
      "name": "Portable Charger",
      "slot": "pockets",
      "attributes": { "supportsAssistiveTech": true },
      "tags": ["tech", "accessibility"]
    },
    {
      "id": "item-labeled-meds",
      "name": "Meds (Original Bottle)",
      "slot": "pockets",
      "attributes": { "requiresPrescription": true, "isLoosePills": false },
      "tags": ["medical", "positive"]
    }
  ],
  "newRules": [
    {
      "trigger": "tear_gas",
      "targetAttribute": "blocksChemical",
      "effect": "POSITIVE",
      "feedbackMessage": "Sealed goggles protect your eyes from tear gas and pepper spray.",
      "severity": "success"
    },
    {
      "trigger": "tear_gas",
      "targetAttribute": "isRespirator",
      "effect": "POSITIVE",
      "feedbackMessage": "N95 masks reduce inhalation of tear gas particles.",
      "severity": "success"
    },
    {
      "trigger": "arrest",
      "targetAttribute": "requiresPrescription",
      "effect": "POSITIVE",
      "feedbackMessage": "Medications in original bottles are more likely to be returned after arrest.",
      "severity": "info"
    },
    {
      "trigger": "any",
      "targetAttribute": "isFirstAid",
      "effect": "POSITIVE",
      "feedbackMessage": "First aid supplies help you and others handle minor injuries.",
      "severity": "success"
    },
    {
      "trigger": "any",
      "targetAttribute": "isSensoryAid",
      "effect": "POSITIVE",
      "feedbackMessage": "Sensory aids (ear plugs, sunglasses) help manage overwhelming environments.",
      "severity": "info"
    }
  ],
  "newAttributes": [
    {
      "name": "blocksChemical",
      "description": "Provides sealed barrier against tear gas/pepper spray"
    },
    {
      "name": "isRespirator",
      "description": "Filters airborne particles (tear gas, smoke)"
    },
    {
      "name": "isFirstAid",
      "description": "Medical supplies for treating injuries"
    },
    {
      "name": "isSensoryAid",
      "description": "Helps manage sensory overload (noise, light)"
    },
    {
      "name": "supportsAssistiveTech",
      "description": "Powers mobility aids or assistive devices"
    }
  ],
  "beforeYouGoGuidance": [
    {
      "topic": "Buddy system",
      "guidance": "Attend with a trusted person who can assist if injured, retrieve belongings if arrested, or care for service animals"
    },
    {
      "topic": "Exit strategy",
      "guidance": "Scout the location beforehand, identify nearby businesses/transit, develop multiple departure routes"
    },
    {
      "topic": "Medication planning",
      "guidance": "Bring medications in original bottles, but only bring as much as you need for the protest duration"
    },
    {
      "topic": "Communication plan",
      "guidance": "Create a communication plan ahead of time to stay in touch and stay safe"
    },
    {
      "topic": "Phone security",
      "guidance": "Turn off location tracking, delete social media apps, use encrypted messaging, enable airplane mode"
    },
    {
      "topic": "Service animals",
      "guidance": "If arrest risk is high, arrange for someone trusted to take your animal"
    }
  ],
  "doNotBring": [
    "Your entire medication supply",
    "Valuables or large cash amounts",
    "Alcohol, illegal drugs, weapons",
    "Documents listing organizers or participant names"
  ]
}
```

---

## Confirmed Existing Guidance

| Existing Item | DREDF Says | Status |
|---------------|------------|--------|
| Loose Meds | Bring in original bottle, only what you need | ✅ Already warns |
| Water + Snacks | "Especially important for diabetics" | ✅ Reinforces hydration |
| Faraday Bag | Turn off location tracking | ✅ Already rewards |

---

## Source URL Update

Update `TrustedSourcePlan.md` DREDF entry to:
```
https://dredf.org/know-your-rights-for-disabled-protestors-guide/
```
