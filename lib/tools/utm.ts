import { Tool } from '../data';

export const utm: Tool = {
  id: 'utm',
  name: 'UTM',
  description: 'Virtual machines for macOS',
  category: 'docker-virtualization',
  compatibleOS: ['macos'],
  installationCommands: {
    macos: 'brew install --cask utm',
  },
  website: 'https://mac.getutm.app/',
  icon: '/tools/utm.svg',
}; 