import { Tool } from '../data';

export const brave: Tool = {
  id: 'brave',
  name: 'Brave',
  description: 'Privacy-focused browser with built-in ad blocker',
  category: 'browsers',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask brave-browser',
    windows: 'choco install brave',
    linux: 'sudo apt-get install brave-browser',
  },
  website: 'https://brave.com/',
  icon: '/tools/brave.svg',
}; 