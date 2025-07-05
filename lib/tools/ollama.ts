import { Tool } from '../data';

export const ollama: Tool = {
  id: 'ollama',
  name: 'Ollama',
  description: 'Local large language models',
  category: 'ai-ml-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install ollama',
    windows: 'choco install ollama',
    linux: 'curl -fsSL https://ollama.ai/install.sh | sh',
  },
  website: 'https://ollama.ai/',
  icon: '/tools/ollama.svg',
}; 