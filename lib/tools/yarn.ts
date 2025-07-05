import { Tool } from '../data';

export const yarn: Tool = {
  id: 'yarn',
  name: 'Yarn',
  description: 'Fast, reliable dependency management',
  category: 'package-managers',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'npm install -g yarn',
    windows: 'npm install -g yarn',
    linux: 'npm install -g yarn',
  },
  website: 'https://yarnpkg.com/',
  icon: '/tools/yarn.svg',
}; 