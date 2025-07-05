import { Tool } from '../data';

export const fastlane: Tool = {
  id: 'fastlane',
  name: 'Fastlane',
  description: 'Mobile app deployment automation',
  category: 'mobile-development',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install fastlane',
    windows: 'choco install fastlane',
    linux: 'gem install fastlane',
  },
  website: 'https://fastlane.tools/',
  icon: '/tools/fastlane.svg',
}; 