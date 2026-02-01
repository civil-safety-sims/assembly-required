# Developer Handoff: WITNESS Filming & Documentation

**Date:** 2026-02-01
**Source:** WITNESS (Search Summary & General Guidance)
**Scope:** Ethical filming, digital security, and documentation rights.

---

## Extracted Data

```json
{
  "sourceMeta": {
    "name": "WITNESS: Filming Protests & Demonstrations",
    "url": "https://witness.org"
  },
  "newItems": [
    {
      "id": "item-emergency-contact",
      "name": "Emergency Info (Written on Body)",
      "slot": "body",
      "attributes": { "hasEmergencyContact": true },
      "tags": ["legal", "safety"]
    },
    {
      "id": "item-signal-app",
      "name": "Signal App",
      "slot": "pockets",
      "attributes": { "hasEncryptedComms": true },
      "tags": ["tech", "security"]
    }
  ],
  "updatedItems": [
    {
      "id": "item-smartphone",
      "changes": {
        "attributes": { "isDocumentation": true, "params_biometrics": "OFF" },
        "note": "Disable biometric unlock (FaceID/TouchID) to prevent compelled access."
      }
    },
    {
      "id": "item-portable-charger",
      "changes": {
        "sourceName": "WITNESS (Secondary Source)",
        "note": " Essential for long documentation sessions."
      }
    }
  ],
  "newRules": [
    {
      "trigger": "police_presence",
      "targetAttribute": "isDocumentation",
      "effect": "POSITIVE",
      "feedbackMessage": "Right to Record: Documenting public officials in public spaces is your constitutional right.",
      "severity": "info"
    },
    {
      "trigger": "arrest",
      "targetAttribute": "params_biometrics_on",
      "effect": "NEGATIVE",
      "feedbackMessage": "Biometric Unlock (FaceID) can be legally compelled. Use a passcode instead.",
      "severity": "warning"
    },
    {
      "trigger": "documentation",
      "targetAttribute": "isDocumentation",
      "effect": "TIP",
      "feedbackMessage": "Filming Tip: Hold shots for 10 seconds. Film street signs for location context.",
      "severity": "success"
    },
    {
      "trigger": "any",
      "targetAttribute": "hasEmergencyContact",
      "effect": "POSITIVE",
      "feedbackMessage": "Emergency Info on your body ensures legal support can be contacted if your phone is taken.",
      "severity": "success"
    }
  ],
  "newAttributes": [
    {
      "name": "isDocumentation",
      "description": "Item allows recording of video/audio evidence"
    },
    {
      "name": "hasEmergencyContact",
      "description": "Emergency info physically available (not just in phone)"
    },
    {
      "name": "hasEncryptedComms",
      "description": "Uses end-to-end encryption (Signal/Wire)"
    }
  ]
}
```

---

## Implementation Notes

- **Smartphones**: We likely already have a `Smartphone` item. We should add `isDocumentation`.
- **Biometrics**: We already have `isBiometric`. WITNESS confirms we should WARN against this.
- **Documentation Logic**:
    - If `isDocumentation` is equipped -> Generic "Right to Record" bonus.
    - If `isDocumentation` AND `biometrics` -> Warning "Disable biometrics".
