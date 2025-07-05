import { Tool } from '../data';

export const vercelCli: Tool = {
  id: 'vercel-cli',
  name: 'Vercel CLI',
  description: 'Command line interface for Vercel',
  category: 'cloud-devops',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'npm install -g vercel',
    windows: 'npm install -g vercel',
    linux: 'npm install -g vercel',
  },
  website: 'https://vercel.com/docs/cli',
  icon: '/tools/vercel.svg',
}; 