import { Tool } from '../data';

export const insomnia: Tool = {
  id: 'insomnia',
  name: 'Insomnia',
  description: 'API client and design platform',
  category: 'web-api-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask insomnia',
    windows: 'choco install insomnia-rest-api-client',
    linux: 'sudo snap install insomnia',
  },
  website: 'https://insomnia.rest/',
  icon: '/tools/insomnia.svg',
}; 