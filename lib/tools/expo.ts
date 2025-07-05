import { Tool } from '../data';

export const expo: Tool = {
  id: 'expo',
  name: 'Expo',
  description: 'React Native development platform',
  category: 'mobile-development',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'npm install -g expo-cli',
    windows: 'npm install -g expo-cli',
    linux: 'npm install -g expo-cli',
  },
  website: 'https://expo.dev/',
  icon: '/tools/expo.svg',
}; 