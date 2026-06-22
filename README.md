# Paul Chukwu Engineering Portfolio

Static GitHub Pages portfolio for Paul Chukwu, a University of Ottawa Computer Engineering student graduating in 2026 and focused on embedded systems, firmware, FPGA design, hardware software integration, and systems engineering.

## Run Locally

This site uses plain HTML, CSS, and JavaScript.

1. Open `index.html` directly in a browser, or serve the folder with any static server.
2. For a simple local server, run `python -m http.server 8000` from the repository root and open `http://localhost:8000`.

## Update Projects

Project cards are data-driven from `data/projects.json`.

To add a project:

1. Copy an existing project object in `data/projects.json`.
2. Update `title`, `category`, `summary`, `technologies`, `role`, `highlights`, `github`, `demo`, `image`, `featured`, `date`, and `tags`.
3. Use `featured: true` only for projects that should appear on the home page.
4. Keep `tags` lowercase so filters work. Current filters include `embedded`, `fpga`, `ai`, `android`, and `product`.

Do not invent metrics. If a result needs a real number later, use `Add metric here` until the number is verified.

## Update Resume

The public resume button points to:

`assets/Resume/Paul_Chukwu_Resume.pdf`

Replace that file with the newest resume when updating the site. If you prefer a different file name, update the links in `index.html` and `resume.html`.

## Deploy

The repository is compatible with GitHub Pages as a static site. Push changes to the branch configured for Pages, usually `main`.

## Main Files

- `index.html`: recruiter-friendly landing page
- `projects.html`: full project portfolio
- `skills.html`: grouped technical skills
- `resume.html`: resume download page
- `data/projects.json`: editable project data
- `styles.css`: shared visual system
- `script.js`: shared navigation and project rendering
