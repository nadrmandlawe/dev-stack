import { Tool } from '../data';

export const firefox: Tool = {
  id: 'firefox',
  name: 'Mozilla Firefox',
  description: 'Privacy-focused web browser',
  category: 'browsers',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask firefox',
    windows: 'choco install firefox',
    linux: 'sudo apt-get install firefox',
  },
  website: 'https://www.mozilla.org/firefox/',
  icon: '/tools/firefox.svg',
}; 