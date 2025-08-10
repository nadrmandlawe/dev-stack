export type Preset = {
  name: string;
  description: string;
  toolIds: string[];
};

export const PRESETS: Preset[] = [
  {
    name: "Web Developer",
    description: "Node.js, editors, browsers and API tools for modern web apps.",
    toolIds: [
      "git",
      "github-cli",
      "nodejs",
      "nvm",
      "pnpm",
      "yarn",
      "vscode",
      "chrome",
      "firefox",
      "postman",
      "curl",
      "wget",
    ],
  },
  {
    name: "Mobile Developer",
    description: "React Native + Expo essentials for cross‑platform apps.",
    toolIds: [
      "git",
      "github-cli",
      "nodejs",
      "nvm",
      "yarn",
      "vscode",
      "react-native",
      "expo",
      "ngrok",
    ],
  },
  {
    name: "AI/ML Engineer",
    description: "Python, Anaconda, Jupyter and editor tooling.",
    toolIds: [
      "python",
      "anaconda",
      "jupyter",
      "vscode",
      "git",
      "github-cli",
      "curl",
      "wget",
    ],
  },
  {
    name: "DevOps Engineer",
    description: "Docker, Kubernetes, Terraform and cloud CLI.",
    toolIds: [
      "git",
      "github-cli",
      "docker-engine",
      "docker-desktop",
      "kubectl",
      "terraform",
      "aws-cli",
      "oh-my-zsh",
      "starship",
      "iterm2",
    ],
  },
  {
    name: "Backend (Go)",
    description: "Go toolchain with API clients and DB tools.",
    toolIds: [
      "go",
      "git",
      "github-cli",
      "vscode",
      "httpie",
      "postman",
      "docker-engine",
      "tableplus",
    ],
  },
  {
    name: "Full‑Stack (Node + Mongo)",
    description: "Node.js stack with MongoDB tools and Docker.",
    toolIds: [
      "git",
      "github-cli",
      "nodejs",
      "nvm",
      "pnpm",
      "yarn",
      "vscode",
      "postman",
      "mongodb-compass",
      "docker-engine",
    ],
  },
];


