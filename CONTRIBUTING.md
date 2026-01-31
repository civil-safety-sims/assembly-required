# Contributing to Assembly Required

Thanks for your interest in helping out! We are building this project during a **Game Jam**, so we move fast, but because this is a safety tool, we must also move **carefully**.

## 🚨 The Golden Rule: Verified Data Only

This app simulates real-world protest risks. Giving a user bad advice (e.g., "wash eyes with milk") can cause real physical harm.

**If you contribute Code:**
* Speed is fine. Messy CSS is fine. We can fix it later.

**If you contribute Content (Items/Rules):**
* **Zero Tolerance for Guessing.** Do not use AI to generate safety tips without verifying them.
* **Sources Required.** Every new Item added to `gameData.ts` **MUST** include a `sourceUrl` linking to a trusted organization (EFF, NLG, CPJ, HRC, PHR).
* If you cannot find a source, do not add the item.

## 🛠️ How to Run Locally

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/YOUR_ORG_NAME/assembly-required.git](https://github.com/YOUR_ORG_NAME/assembly-required.git)
    cd assembly-required
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the dev server:**
    ```bash
    npm run dev
    ```

## 🤝 How You Can Help (Game Jam Mode)

We are currently looking for help with:

1.  **New Items:** We need more items for the "Paper Doll" loadout. (See `src/data/gameData.ts`).
2.  **Visuals:** Better icons or CSS improvements for the "Cyberpunk Dossier" aesthetic.
3.  **Scenarios:** Logic for new weather/threat combinations in `simulationEngine.ts`.

## 📄 License & Attribution

By contributing to **Assembly Required**, you agree that your contributions will be licensed as follows:

* **The Code** (React/JS/CSS) is licensed under the **MIT License**.
* **The Safety Data** (Text/Rules) is licensed under **Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)**.

This ensures the software remains open for developers, while the educational content remains free for activists to reuse and share.