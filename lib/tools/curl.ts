import { Tool } from '../data';

export const curl: Tool = {
  id: 'curl',
  name: 'cURL',
  description: 'Command line tool for transferring data',
  category: 'core-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install curl',
    windows: 'choco install curl',
    linux: 'sudo apt-get install curl',
  },
  website: 'https://curl.se/',
  icon: '/tools/curl.svg',
}; 