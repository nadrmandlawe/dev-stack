# DevStack - Development Environment Setup Tool

A modern web application that helps developers quickly set up their development environment by generating custom installation scripts for macOS, Windows, and Linux.

## Features

- **Multi-OS Support**: Generate setup scripts for macOS, Windows, and Linux
- **Tool Selection**: Choose from a curated list of development tools, IDEs, and utilities
- **Quick Presets**: Use predefined tool combinations for common development stacks
- **Custom Scripts**: Generate personalized installation scripts with your project name
- **Share URLs**: Share your tool selections via URL
- **Modern UI**: Built with Next.js, TypeScript, and Tailwind CSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. **Select Your OS**: Choose your target operating system (macOS, Windows, or Linux)
2. **Choose Tools**: Browse through categories and select the tools you need
3. **Generate Script**: Click "Generate Script" to create your custom installation script
4. **Download or Copy**: Download the script file or copy it to your clipboard
5. **Run**: Execute the generated script on your target system

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Bun](https://bun.sh/)

## Project Structure

```
devstack/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── lib/                # Utility functions and data
│   ├── tools/          # Tool definitions
│   └── ...             # Script generation logic
└── public/             # Static assets
    └── tools/          # Tool icons
```

## Contributing

Contributions are welcome! Feel free to:

- Add new development tools
- Improve the UI/UX
- Fix bugs or add features
- Update tool installation commands

## License

This project is open source and available under the [MIT License](LICENSE).
