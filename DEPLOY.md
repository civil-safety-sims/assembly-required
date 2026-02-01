# Deploying Assembly Required

## Prerequisites
- **Node.js** (v20+ recommended)
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Git**

## One-Time Setup
1.  Login to Firebase:
    ```bash
    firebase login
    ```
2.  Initialize the project (if not already done):
    ```bash
    firebase init hosting
    ```

## Deployment Steps
Runs the build script and deploys the `dist` folder to Firebase Hosting.

1.  **Navigate to the project directory:**
    ```bash
    cd cyberpunk-dossier
    ```

2.  **Build the project:**
    ```bash
    npm run build
    ```
    *This compiles the TypeScript and Vite project into the `dist` folder.*

3.  **Deploy to Firebase:**
    ```bash
    firebase deploy --only hosting
    ```

## Verification
After deployment, the CLI will output a hosting URL (e.g., `https://assembly-required-woo-v1.web.app`). Visit this URL to verify the changes are live.

## Rule of Done (CRITICAL)
**A task is ONLY complete when the following steps are performed:**
1.  **Code Changes** (Tests pass locally)
2.  **`npm run build`** (Must return exit code 0)
3.  **`firebase deploy --only hosting`** (Must see "Deploy complete!")
4.  **Verification** (Check the live URL)

**NEVER** mark a task as "Done" without running these steps. The code on your machine does not exist until it is on the server.
