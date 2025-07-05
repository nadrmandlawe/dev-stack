import { Tool } from '../data';

export const httpie: Tool = {
  id: 'httpie',
  name: 'HTTPie',
  description: 'User-friendly HTTP client',
  category: 'web-api-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install httpie',
    windows: 'choco install httpie',
    linux: 'sudo apt-get install httpie',
  },
  website: 'https://httpie.io/',
  icon: '/tools/httpie.svg',
}; 