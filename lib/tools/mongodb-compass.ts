import { Tool } from '../data';

export const mongodbCompass: Tool = {
  id: 'mongodb-compass',
  name: 'MongoDB Compass',
  description: 'MongoDB GUI',
  category: 'database-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask mongodb-compass',
    windows: 'choco install mongodb-compass',
    linux: 'sudo snap install mongodb-compass',
  },
  website: 'https://www.mongodb.com/products/compass',
  icon: '/tools/mongodb.svg',
};
