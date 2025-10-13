# Task 5 – npm/yarn Basics (Browser App)

A currency converter built with Vite, axios and dayjs. It demonstrates initializing a project, installing packages, using npm scripts, importing modules, and running a web app in the browser.

## What I used (npm packages)

- axios: Promise-based HTTP client used to fetch exchange rates.
- dayjs: Lightweight date library used to format the "last updated" timestamp.

The app tries `https://api.exchangerate.host` first and automatically falls back to `https://open.er-api.com` if CORS blocks the first.

## How to run locally

```bash
npm install
npm run dev
# open the printed URL (e.g. http://localhost:5173)
```

## Build and preview

```bash
npm run build
npm run preview
```

## Project Scripts (from package.json)

- dev: Start Vite dev server
- build: Production build
- preview: Preview production build locally

## Files to review

- `index.html` – app entry
- `src/main.js` – UI + fetch/convert logic
- `src/style.css` – vibrant styles & animations

## 🤝 Contributing

This is an internship deliverable project. For suggestions or improvements, please reach out through the appropriate channels.

## 📄 License

This project is part of the FlexiSaf Internship Program. All rights reserved.

## 👨‍💻 Author

**Blaqbeard** - FlexiSaf Intern

- **Project:** Task 5 Intermediate Deliverable
- **Focus:** Node.js/npm/yarn Implementation
- **Duration:** 1 week development cycle

---

_Built with dedication and attention to detail for the FlexiSaf Internship Program_

**Last Updated:** October 2025
**Version:** 2.5.0
**Status:** Complete ✅
