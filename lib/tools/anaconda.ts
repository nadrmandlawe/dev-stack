import { Tool } from '../data';

export const anaconda: Tool = {
  id: 'anaconda',
  name: 'Anaconda',
  description: 'Python distribution for data science',
  category: 'ai-ml-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask anaconda',
    windows: 'choco install anaconda3',
    linux: 'wget https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Linux-x86_64.sh && bash Anaconda3-2023.09-0-Linux-x86_64.sh',
  },
  website: 'https://www.anaconda.com/',
  icon: '/tools/anaconda.svg',
}; 