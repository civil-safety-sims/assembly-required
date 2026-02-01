# Handoff: OSHA Safety Standards Integration

**Source:** [OSHA Respiratory Protection](https://www.osha.gov/respiratory-protection) & [OSHA Eye Protection](https://www.osha.gov/eye-face-protection)

## Summary
OSHA standards provide critical distinctions for PPE effectiveness. For protest safety (tear gas/smoke), the key takeaways are the difference between "particulate filtration" (Respirators) vs "fluid resistance" (Surgical Masks), and "chemical splash protection" (Goggles) vs "impact protection" (Safety Glasses).

## Key Concepts

### 1. Respiratory Protection
*   **Guidance:** Surgical masks do **NOT** seal and do **NOT** filter fine particulates (smoke/gas). They are for outgoing droplet containment.
*   **Standard:** N95/P100 Respirators (NIOSH/OSHA approved) require a tight seal and filter 95-99% of particulates.
*   **Rule Implication:** N95s provide *protection* against gas/smoke; Surgical masks do *not* (though they might help anonymity or minor dust).

### 2. Eye Protection (ANSI Z87.1)
*   **Guidance:** Safety glasses (Z87+) protect against *impact* but often have gaps.
*   **Standard:** Chemical Splash Goggles (ANSI Z87.1 D3) with *indirect venting* provide a seal against splashes and vapors while allowing some airflow.
*   **Rule Implication:** Goggles provide *high* chemical protection. Safety glasses provide *low/none* against gas but *high* against rubber bullets (impact).

## Implementation Details

### New Attributes (`SafetyItemAttributes`)
*   `isImpactRated`: boolean (ANSI Z87.1+). Protects against kinetic threats (rubber bullets).
*   `isSealable`: boolean. item creates an air-tight seal (Goggles, Gas Mask).

### New Items (`SafetyItem`)

| Item | Slot | Attributes | Notes |
|------|------|------------|-------|
| **Surgical Mask** | `face` | `isAnonymizing: true` | No gas protection. Good for anonymity. |
| **Safety Glasses** | `eyes` | `isImpactRated: true` | Protection vs projectiles, not gas. |
| **Chem Splash Goggles** | `eyes` | `blocksChemical: true`, `isSealable: true` | High chemical protection. |
| **Respirator (Half Face)** | `face` | `isRespirator: true`, `blocksChemical: true` | P100 cartridges block organic vapors (better than N95). |

### New Rules (`simulationEngine.ts`)

1.  **Improper PPE (Masks)**
    *   **Trigger:** Equipped `Surgical Mask` AND Chemical Threat.
    *   **Feedback:** "FALSE SENSE OF SECURITY: Surgical masks don't seal against gas. (OSHA)" (-5 Pts)

2.  **Impact Protection**
    *   **Trigger:** Equipped `isImpactRated` AND Kinetic Threat (Rubber Bullets).
    *   **Feedback:** "EYES SHIELDED: ANSI Z87+ rating protects against projectile impacts. (OSHA)" (+10 Pts)

3.  **Vapor Seal**
    *   **Trigger:** Equipped `isSealable` AND Chemical Threat.
    *   **Feedback:** "SEALED: Goggles/Mask effectively block chemical vapors. (OSHA)" (+15 Pts)

## Verification Plan
*   Equip Surgical Mask -> Trigger Chemical Threat -> Expect Warning.
*   Equip Safety Glasses -> Trigger Kinetic Threat -> Expect Success.
