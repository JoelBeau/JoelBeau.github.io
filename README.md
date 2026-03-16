# Joel Beauregard Portfolio

Modern, GitHub Pages-ready personal portfolio site built with plain HTML, CSS, and JavaScript. The design leans into a polished developer terminal and systems-dashboard aesthetic while staying readable, recruiter-friendly, and easy to customize.

## Project Overview

This portfolio is designed to:

- introduce Joel Beauregard with a strong technical first impression
- highlight Oracle internship experience and returning internship momentum
- showcase standout projects like SocketScout and Thermodynamics Database
- communicate interests in systems, infrastructure, security, networking, and practical software engineering
- stay lightweight, responsive, and simple to deploy on GitHub Pages

## File Structure

```text
.
├── index.html
├── styles.css
├── script.js
└── README.md
```

Optional later additions:

- `assets/Joel_Beauregard_Resume.pdf` for your resume link
- `assets/` for project screenshots, icons, or a `CNAME` file if you use a custom domain

## How To Customize Content

### 1. Update personal links

Search for these placeholder values in [index.html](/Users/jbeau/Documents/joelbeauregard.github.io/index.html):

- `https://github.com/your-username`
- `https://www.linkedin.com/in/your-linkedin`
- `you@example.com`
- `assets/Joel_Beauregard_Resume.pdf`

Replace them with your real GitHub, LinkedIn, email, and resume file path.

### 2. Update internship details

In [index.html](/Users/jbeau/Documents/joelbeauregard.github.io/index.html), find the Oracle experience section and replace the placeholder line about team, org, technologies, and outcomes with the exact details you want to publish.

### 3. Update education details

In [index.html](/Users/jbeau/Documents/joelbeauregard.github.io/index.html), update:

- expected graduation date
- GPA
- coursework

You can also rename the degree wording if you want it to match your resume exactly.

### 4. Update project details

Each project card in [index.html](/Users/jbeau/Documents/joelbeauregard.github.io/index.html) is reusable. To add another project:

- duplicate an existing `.project-card`
- update the title, description, bullet points, tags, and link
- keep the same structure for consistent styling

### 5. Update the hero and bio copy

The hero intro and About section in [index.html](/Users/jbeau/Documents/joelbeauregard.github.io/index.html) are written as polished starter content. Edit them to better match your voice, exact technical interests, and current goals over time.

## How To Tweak The Design

Most visual customization happens in [styles.css](/Users/jbeau/Documents/joelbeauregard.github.io/styles.css).

Useful areas to edit:

- color palette: change variables in `:root`
- spacing and section sizing: update `.section`, `.container`, and component padding
- fonts: replace the Google Fonts import in [index.html](/Users/jbeau/Documents/joelbeauregard.github.io/index.html)
- card look and glow: adjust `.surface-card`, `.project-card`, `.terminal-panel`
- hero behavior and nav states: update [script.js](/Users/jbeau/Documents/joelbeauregard.github.io/script.js)

## JavaScript Behavior

[script.js](/Users/jbeau/Documents/joelbeauregard.github.io/script.js) only handles lightweight UI behavior:

- mobile nav toggle
- active navigation highlight on scroll
- terminal-style typing effect in the hero
- reveal-on-scroll animation
- auto-updating footer year

If you want a fully static experience without animation, you can remove the typing effect and reveal logic without affecting layout.

## GitHub Pages Deployment

### Option 1: Deploy from the root of a repository

1. Push these files to a GitHub repository.
2. In GitHub, open `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
5. Choose your main branch and `/ (root)` folder.
6. Save and wait for GitHub Pages to publish the site.

### Option 2: User or organization site

If the repository is named like `your-username.github.io`, GitHub Pages will serve it as your main user site.

## Custom Domain / CNAME

If you want to use a custom domain later:

1. Add a file named `CNAME` in the repository root.
2. Put your domain inside it, for example `www.yourdomain.com`.
3. Configure your DNS records in your domain provider.
4. Update the GitHub Pages custom domain setting in the repository.

## Editing Tips

- Keep resume, GitHub, LinkedIn, and email links current first because recruiters will click those immediately.
- If you add screenshots later, compress them so the site stays fast.
- Keep project descriptions concise and outcomes-oriented.
- Use exact internship language you are comfortable publishing publicly.
- Review the site on desktop and mobile after any major content change.

## Next Suggested Improvements

- add a real resume PDF in `assets/`
- add real GitHub and LinkedIn links
- replace placeholder education details
- add screenshots or diagrams for standout projects if desired
- add a favicon and social sharing meta tags later
