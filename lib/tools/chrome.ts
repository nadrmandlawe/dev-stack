import { Tool } from '../data';

export const chrome: Tool = {
  id: 'chrome',
  name: 'Google Chrome',
  description: 'Fast, secure web browser',
  category: 'browsers',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask google-chrome',
    windows: 'choco install googlechrome',
    linux: 'wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list && sudo apt-get update && sudo apt-get install google-chrome-stable',
  },
  website: 'https://www.google.com/chrome/',
  icon: '/tools/chrome.svg',
}; 