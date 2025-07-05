import { Tool } from '../data';

export const nodejs: Tool = {
  id: 'nodejs',
  name: 'Node.js',
  description: "JavaScript runtime built on Chrome's V8 engine",
  category: 'programming-languages',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install node',
    windows: 'choco install nodejs',
    linux: 'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs',
  },
  website: 'https://nodejs.org/',
  icon: '/tools/nodejs.svg',
}; 