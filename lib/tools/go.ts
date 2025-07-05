import { Tool } from '../data';

export const go: Tool = {
  id: 'go',
  name: 'Go',
  description: 'Open source programming language',
  category: 'programming-languages',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install go',
    windows: 'choco install golang',
    linux: 'sudo apt-get install golang-go',
  },
  website: 'https://golang.org/',
  icon: '/tools/go.svg',
}; 