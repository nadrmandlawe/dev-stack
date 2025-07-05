import { Tool } from '../data';

export const flutter: Tool = {
  id: 'flutter',
  name: 'Flutter',
  description: "Google's UI toolkit for mobile apps", 
  category: 'mobile-development',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask flutter',
    windows: 'choco install flutter',
    linux: 'sudo snap install flutter --classic',
  },
  website: 'https://flutter.dev/',
  icon: '/tools/flutter.svg',
}; 