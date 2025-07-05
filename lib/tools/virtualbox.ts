import { Tool } from '../data';

export const virtualbox: Tool = {
  id: 'virtualbox',
  name: 'VirtualBox',
  description: 'Cross-platform virtualization software',
  category: 'docker-virtualization',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask virtualbox',
    windows: 'choco install virtualbox',
    linux: 'sudo apt-get install virtualbox',
  },
  website: 'https://www.virtualbox.org/',
  icon: '/tools/virtualbox.svg',
}; 