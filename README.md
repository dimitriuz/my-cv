# Interactive CV Generator

A modern, interactive CV built with Vue 3, TypeScript, and Vite. Features both web view and PDF export functionality with a consistent dark theme design.

## Features

- 🎨 Dark theme with VS Code-inspired design
- 📱 Responsive layout
- 🌍 i18n support for multiple languages
- 📄 PDF export with custom formatting
- 🎯 Interactive web interface
- 💼 Organized content structure using JSON
- 🌐 Automatic language detection based on user's browser settings
- 💾 Language preference persistence

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Vite
- Vue-i18n for localization
- jsPDF for PDF generation
- Heroicons for UI icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dimitriuz/my-cv.git

# Navigate to project directory
cd my-cv

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist` directory.

### Deployment

#### Using Nginx (recommended)

1. Build the project
```bash
npm run build
```

2. Copy the contents of `dist` to your web server
```bash
sudo cp -r dist/* /var/www/html/
```

3. Configure Nginx (example configuration):
```nginx
server {
    listen 80;
    server_name yourcv.domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Using GitHub Pages

1. Update `vite.config.ts` with your base URL:
```typescript
export default defineConfig({
    base: '/my-cv/',
    // ...other config
})
```

2. Deploy using GitHub Actions (workflow included in repository)

## Customization

To customize the CV content, modify the JSON files in `src/locales/`:
- `en.json` - English content
- Add more language files as needed (e.g., `fr.json`, `es.json`)

## License

MIT License - feel free to use this project for your own CV!
