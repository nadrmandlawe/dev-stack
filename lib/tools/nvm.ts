import { Tool } from '../data';

export const nvm: Tool = {
  id: 'nvm',
  name: 'NVM',
  description: 'Node Version Manager',
  category: 'package-managers',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash',
    windows: 'choco install nvm',
    linux: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash',
  },
  website: 'https://github.com/nvm-sh/nvm',
  icon: '/tools/nvm.svg',
}; 