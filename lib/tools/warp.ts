import { Tool } from '../data';

export const warp: Tool = {
  id: 'warp',
  name: 'Warp',
  description: 'Modern terminal with AI',
  category: 'terminal-enhancements',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask warp',
    windows: 'choco install warp',
    linux: 'curl -L https://app.warp.dev/install.sh | sh',
  },
  website: 'https://www.warp.dev/',
  icon: '/tools/warp.svg',
}; 