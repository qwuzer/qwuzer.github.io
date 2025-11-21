# Qwuzer's Homepage

A modern, interactive digital desktop portfolio built with React and TypeScript. This project features a macOS-inspired interface with window management, a dock, and various interactive applications.

## 🌐 Live Site

Visit the live site: [qwuzer.github.io](https://qwuzer.github.io)

## 🚀 Features

- **macOS-inspired UI**: Beautiful desktop interface with window management
- **Interactive Applications**: Finder, About, Projects, Photos, Music, Mail, and more
- **Spotlight Search**: Quick app launcher with keyboard shortcuts
- **Responsive Design**: Works seamlessly across different screen sizes
- **Modern Tech Stack**: Built with the latest web technologies

## 🛠️ Technologies

This project is built with:

- **Vite** - Next-generation frontend tooling
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Beautiful icon library

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/qwuzer/qwuzer.github.io.git
cd qwuzer.github.io
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
qwuzer.github.io/
├── public/          # Static assets and favicons
├── src/
│   ├── components/ # React components
│   │   ├── ui/     # shadcn/ui components
│   │   └── windows/# Application window components
│   ├── pages/      # Page components
│   ├── hooks/      # Custom React hooks
│   ├── lib/        # Utility functions
│   └── assets/     # Images and other assets
├── .github/
│   └── workflows/  # GitHub Actions workflows
└── dist/           # Production build output
```

## 🚢 Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

The deployment workflow:

1. Builds the project using Vite
2. Uploads the build artifacts
3. Deploys to GitHub Pages

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Qwuzer**

- GitHub: [@qwuzer](https://github.com/qwuzer)
- Website: [qwuzer.github.io](https://qwuzer.github.io)

---

Made with ❤️ using React and TypeScript
