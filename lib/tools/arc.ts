import { Tool } from '../data';

export const arc: Tool = {
  id: 'arc',
  name: 'Arc',
  description: "The browser company's browser",
  category: 'browsers',
  compatibleOS: ['macos'],
  installationCommands: {
    macos: 'brew install --cask arc',
  },
  website: 'https://arc.net/',
  icon: '/tools/arc.svg',
}; 