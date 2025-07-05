import { Tool } from '../data';

export const jupyter: Tool = {
  id: 'jupyter',
  name: 'Jupyter',
  description: 'Interactive computing and data science',
  category: 'ai-ml-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'pip install jupyter',
    windows: 'pip install jupyter',
    linux: 'pip install jupyter',
  },
  website: 'https://jupyter.org/',
  icon: '/tools/jupyter.svg',
}; 