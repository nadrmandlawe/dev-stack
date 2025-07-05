import { Tool } from '../data';

export const lmStudio: Tool = {
  id: 'lm-studio',
  name: 'LM Studio',
  description: 'Local LLM inference and training',
  category: 'ai-ml-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask lmstudio',
    windows: 'choco install lmstudio',
    linux: 'echo "Download from https://lmstudio.ai/"',
  },
  website: 'https://lmstudio.ai/',
  icon: '/tools/lm-studio.svg',
}; 