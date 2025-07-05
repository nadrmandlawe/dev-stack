import { Tool } from '../data';

export const dockerDesktop: Tool = {
  id: 'docker-desktop',
  name: 'Docker Desktop',
  description: 'Containerization platform',
  category: 'docker-virtualization',
  compatibleOS: ['macos', 'windows'],
  installationCommands: {
    macos: 'brew install --cask docker',
    windows: 'choco install docker-desktop',
  },
  website: 'https://www.docker.com/products/docker-desktop',
  icon: '/tools/docker.svg',
}; 