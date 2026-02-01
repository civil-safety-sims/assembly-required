# Handoff: National Lawyers Guild (NLG) Integration

**Source:** [NLG Know Your Rights](https://www.nlg.org/know-your-rights/)

## Summary
The National Lawyers Guild provides legal support for protesters. Their key advice focuses on understanding legal rights, minimizing data exposure during arrests, and ensuring access to legal counsel.

## Key Concepts

### 1. Identity Management
*   **Guidance:** "Minimize personal items." Do not bring anything you aren't prepared to lose or have examined by police.
*   **ID:** Carrying ID is a trade-off. It speeds up processing if arrested but links you to the event. Non-citizens *must* carry papers; citizens generally don't have to (state and situation-dependent).
*   **Risk:** Wallets/IDs can be confiscated or used to identify/dox protesters.

### 2. Legal Support
*   **Guidance:** Write the NLG Legal Hotline number on your arm in permanent marker.
*   **Why:** Phones are often confiscated or broken. You need the number *memorized* or *written on you*.

## Implementation Details

### New Attributes (`SafetyItemAttributes`)
*   `isIdentifying`: boolean. Item links to personal identity (Wallet, Work ID).
*   `hasLegalContact`: boolean. Item provides access to legal support (written number).

### New Items (`SafetyItem`)

| Item | Slot | Attributes | Notes |
|------|------|------------|-------|
| **Wallet with ID** | `pockets` | `isIdentifying: true` | Convenient but risky. |
| **Legal Hotline (Body Written)** | `body` | `hasLegalContact: true` | Vital for post-arrest support. |

### New Rules (`simulationEngine.ts`)

1.  **Identity Exposure Risk**
    *   **Trigger:** Equipped `isIdentifying` item AND Threat Level `High`.
    *   **Effect:** -10 Score.
    *   **Feedback:** "DATA RISK: Carrying personal ID/Wallet risks confiscation and identification. (NLG)"

2.  **Legal Safety Net**
    *   **Trigger:** Equipped `hasLegalContact` item.
    *   **Effect:** +10 Score.
    *   **Feedback:** "LEGAL SUPPORT: You have a legal number written on your body. You can call for help if arrested. (NLG)"

## Verification Plan
*   Equip Wallet -> Expect Warning at High Threat.
*   Equip Legal Hotline -> Expect Success message.
