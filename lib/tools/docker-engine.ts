import { Tool } from '../data';

export const dockerEngine: Tool = {
  id: 'docker-engine',
  name: 'Docker Engine',
  description: 'Docker runtime for Linux',
  category: 'docker-virtualization',
  compatibleOS: ['linux'],
  installationCommands: {
    linux: 'curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh',
  },
  website: 'https://docs.docker.com/engine/',
  icon: '/tools/docker.svg',
}; 