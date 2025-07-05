import { Tool } from '../data';

export const postman: Tool = {
  id: 'postman',
  name: 'Postman',
  description: 'API development and testing platform',
  category: 'web-api-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask postman',
    windows: 'choco install postman',
    linux: 'sudo snap install postman',
  },
  website: 'https://www.postman.com/',
  icon: '/tools/postman.svg',
}; 