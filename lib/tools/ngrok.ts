import { Tool } from '../data';

export const ngrok: Tool = {
  id: 'ngrok',
  name: 'ngrok',
  description: 'Secure tunnels to localhost',
  category: 'web-api-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install ngrok',
    windows: 'choco install ngrok',
    linux: 'sudo snap install ngrok',
  },
  website: 'https://ngrok.com/',
  icon: '/tools/ngrok.svg',
}; 