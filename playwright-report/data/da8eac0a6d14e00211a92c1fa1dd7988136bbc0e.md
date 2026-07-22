# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> E2E Test Suite >> Sending a message to the AI Mentor
- Location: tests\e2e.spec.ts:21:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - generic [ref=e4]:
        - link "PilotAI" [ref=e5] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e7]
          - generic [ref=e10]: PilotAI
        - button "Collapse sidebar" [expanded] [ref=e11] [cursor=pointer]:
          - img [ref=e12]
      - navigation "Main Navigation" [ref=e14]:
        - link "Dashboard" [ref=e15] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e16]
          - generic [ref=e21]: Dashboard
        - link "Projects" [ref=e22] [cursor=pointer]:
          - /url: /dashboard/projects
          - img [ref=e23]
          - generic [ref=e28]: Projects
        - link "Roadmaps" [ref=e29] [cursor=pointer]:
          - /url: /dashboard/roadmaps
          - img [ref=e30]
          - generic [ref=e32]: Roadmaps
        - link "AI Mentor" [ref=e33] [cursor=pointer]:
          - /url: /dashboard/mentor
          - img [ref=e34]
          - generic [ref=e38]: AI Mentor
        - link "GitHub Analytics" [ref=e39] [cursor=pointer]:
          - /url: /dashboard/github
          - img [ref=e40]
          - generic [ref=e44]: GitHub Analytics
        - link "Career Score" [ref=e45] [cursor=pointer]:
          - /url: /dashboard/career
          - img [ref=e46]
          - generic [ref=e49]: Career Score
        - link "Settings" [ref=e50] [cursor=pointer]:
          - /url: /dashboard/settings
          - img [ref=e51]
          - generic [ref=e54]: Settings
      - generic [ref=e55]:
        - generic [ref=e56]:
          - img "Yogender Verma's profile avatar" [ref=e58]
          - generic [ref=e59]:
            - heading "Yogender Verma" [level=4] [ref=e60]
            - paragraph [ref=e61]: yogendarverma0268@gmail.com
        - button "Sign out of account" [ref=e62] [cursor=pointer]:
          - img [ref=e63]
          - generic [ref=e66]: Sign Out
    - generic [ref=e67]:
      - banner [ref=e68]:
        - generic [ref=e69]:
          - heading "AI Mentor Workspace" [level=1] [ref=e70]
          - generic [ref=e71]: "Ready Score: 60%"
        - generic [ref=e72]:
          - button "Open global search (Ctrl K)" [ref=e73] [cursor=pointer]:
            - img [ref=e74]
            - generic [ref=e77]: Search pages and projects...
            - generic [ref=e78]: Ctrl K
          - 'link "Career Score: 60% match rate" [ref=e79] [cursor=pointer]':
            - /url: /dashboard/career
            - img [ref=e80]
            - generic [ref=e83]: "Career Score: 60%"
          - button "Switch to light theme" [ref=e84] [cursor=pointer]:
            - img [ref=e85]
          - button "Notifications" [ref=e92]:
            - img [ref=e93]
      - generic [ref=e97]:
        - generic [ref=e98]:
          - button "New Session Guidance" [ref=e100] [cursor=pointer]:
            - img [ref=e102]
            - generic [ref=e103]: New Session Guidance
          - generic [ref=e105] [cursor=pointer]:
            - generic [ref=e106]:
              - img [ref=e107]
              - generic [ref=e111]: New Conversation
            - button [ref=e112]:
              - img [ref=e113]
        - generic [ref=e116]:
          - generic [ref=e117]:
            - generic [ref=e118]:
              - img [ref=e120]
              - generic [ref=e123]:
                - heading "New Conversation" [level=3] [ref=e124]
                - paragraph [ref=e125]: "Context: Active Match Blueprint and Roadmap"
            - generic [ref=e126]:
              - button "🔥 ROAST MODE" [ref=e127] [cursor=pointer]:
                - generic [ref=e128]: 🔥
                - generic [ref=e129]: ROAST MODE
              - generic [ref=e130]: ONLINE
          - generic [ref=e132]:
            - img [ref=e134]
            - paragraph [ref=e138]: Hello! I am your AI Career Mentor. Ask me anything about your recommended projects, how to fill skill gaps, structuring your github portfolio, or preparing for interviews with recruiters!
          - generic [ref=e139]:
            - button "★ How to build custom whiteboard curves?" [ref=e140] [cursor=pointer]
            - button "★ Help me write my Docker-compose" [ref=e141] [cursor=pointer]
            - button "★ Suggest vector database steps" [ref=e142] [cursor=pointer]
          - generic [ref=e144]:
            - generic [ref=e145]: Ask AI Mentor for architectural guidelines
            - textbox "Ask AI Mentor for architectural guidelines" [ref=e146]:
              - /placeholder: Ask AI Mentor for architectural guidelines...
            - generic [ref=e147]:
              - button "Attach code or context file" [ref=e148] [cursor=pointer]:
                - img [ref=e149]
              - button "Send message to AI mentor" [ref=e151] [cursor=pointer]:
                - generic [ref=e152]: Send
                - img [ref=e154]
  - alert [ref=e157]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('E2E Test Suite', () => {
  4  |   test('User Authentication & Onboarding', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     // Check if the landing page title contains ProjectPilot AI
  7  |     await expect(page).toHaveTitle(/ProjectPilot AI/);
  8  |     
  9  |     // Additional assertions for auth and onboarding flow can be added here
  10 |   });
  11 | 
  12 |   test('Creating a new Project', async ({ page }) => {
  13 |     await page.goto('/dashboard/projects');
  14 |     
  15 |     // Wait for the projects page to load
  16 |     // This is a basic check to ensure the route renders without crashing
  17 |     const isDashboardVisible = await page.isVisible('text="Projects"');
  18 |     expect(isDashboardVisible).toBeTruthy();
  19 |   });
  20 | 
  21 |   test('Sending a message to the AI Mentor', async ({ page }) => {
  22 |     await page.goto('/dashboard/mentor');
  23 |     
  24 |     // Check if the mentor chat interface is loaded
  25 |     const isMentorLoaded = await page.isVisible('text="Mentor"');
> 26 |     expect(isMentorLoaded).toBeTruthy();
     |                            ^ Error: expect(received).toBeTruthy()
  27 |   });
  28 | });
  29 | 
```