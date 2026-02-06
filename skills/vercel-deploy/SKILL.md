---
name: vercel-deploy
description: Deploys the current project to Vercel using the Vercel CLI (via npx). Use when the user wants to publish, update, or deploy their application to Vercel.
---

# Vercel Deployment Skill

This skill provides a streamlined workflow for deploying projects to Vercel.

## Workflow

1.  **Verify Configuration**: Check for `vercel.json` or other relevant configuration files (e.g., `package.json`).
2.  **Deployment**: Execute the deployment using `npx vercel`.
    -   For production deployment: `npx vercel --prod`
    -   For preview deployment: `npx vercel`
3.  **Handle Authentication/Linking**: If the project is not linked or the user is not logged in, the command will prompt for interaction. Advise the user to follow the CLI prompts.
4.  **Extract URL**: Capture and display the deployment URL from the command output.

## Best Practices

-   **Pre-deploy Build**: If the project requires a specific build step that isn't configured in Vercel's dashboard, run it locally first or ensure `vercel.json` includes the correct `build` commands.
-   **Environment Variables**: Remind the user to set up any necessary environment variables in the Vercel dashboard if the deployment fails due to missing secrets.
-   **Output Cleaning**: Use `npx vercel --prod --yes` for non-interactive production deployments if the project is already linked.

## Example Usage

### Production Deploy
```bash
npx vercel --prod --yes
```

### Preview Deploy
```bash
npx vercel
```