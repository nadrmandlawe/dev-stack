import { Tool } from '../data';

export const reactNative: Tool = {
  id: 'react-native',
  name: 'React Native',
  description: 'Mobile app development framework',
  category: 'mobile-development',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'npm install -g react-native-cli',
    windows: 'npm install -g react-native-cli',
    linux: 'npm install -g react-native-cli',
  },
  website: 'https://reactnative.dev/',
  icon: '/tools/react-native.svg',
}; 