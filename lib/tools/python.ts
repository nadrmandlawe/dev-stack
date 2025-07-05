import { Tool } from '../data';

export const python: Tool = {
  id: 'python',
  name: 'Python',
  description: 'High-level programming language',
  category: 'programming-languages',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install python',
    windows: 'choco install python',
    linux: 'sudo apt-get install python3 python3-pip',
  },
  website: 'https://www.python.org/',
  icon: '/tools/python.svg',
}; 