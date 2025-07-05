import { Tool } from '../data';

export const java: Tool = {
  id: 'java',
  name: 'Java',
  description: 'Object-oriented programming language',
  category: 'programming-languages',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install openjdk',
    windows: 'choco install openjdk',
    linux: 'sudo apt-get install openjdk-17-jdk',
  },
  website: 'https://www.java.com/',
  icon: '/tools/java.svg',
}; 