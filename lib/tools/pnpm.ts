import { Tool } from '../data';

export const pnpm: Tool = {
  id: 'pnpm',
  name: 'pnpm',
  description: 'Fast, disk space efficient package manager',
  category: 'package-managers',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'npm install -g pnpm',
    windows: 'npm install -g pnpm',
    linux: 'npm install -g pnpm',
  },
  website: 'https://pnpm.io/',
  icon: '/tools/pnpm.svg',
}; 