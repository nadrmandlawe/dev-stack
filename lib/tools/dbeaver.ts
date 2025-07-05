import { Tool } from '../data';

export const dbeaver: Tool = {
  id: 'dbeaver',
  name: 'DBeaver',
  description: 'Universal database tool',
  category: 'database-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask dbeaver-community',
    windows: 'choco install dbeaver',
    linux: 'sudo snap install dbeaver-ce',
  },
  website: 'https://dbeaver.io/',
  icon: '/tools/dbeaver.svg',
};
