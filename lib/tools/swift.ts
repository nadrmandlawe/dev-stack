import { Tool } from '../data';

export const swift: Tool = {
  id: 'swift',
  name: 'Swift',
  description: "Apple's programming language",
  category: 'programming-languages',
  compatibleOS: ['macos'],
  installationCommands: {
    macos: 'xcode-select --install',
  },
  website: 'https://swift.org/',
  icon: '/tools/swift.svg',
}; 