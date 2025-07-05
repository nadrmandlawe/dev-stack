import { Tool } from '../data';

export const wget: Tool = {
  id: 'wget',
  name: 'Wget',
  description: 'Internet file retriever',
  category: 'core-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install wget',
    windows: 'choco install wget',
    linux: 'sudo apt-get install wget',
  },
  website: 'https://www.gnu.org/software/wget/',
  icon: '/tools/wget.svg',
}; 