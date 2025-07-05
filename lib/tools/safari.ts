import { Tool } from '../data';

export const safari: Tool = {
  id: 'safari',
  name: 'Safari',
  description: "Apple's web browser",
  category: 'browsers',
  compatibleOS: ['macos'],
  installationCommands: {
    macos: 'echo "Safari is pre-installed on macOS"',
  },
  website: 'https://www.apple.com/safari/',
  icon: '/tools/safari.svg',
}; 