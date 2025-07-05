import { Tool } from '../data';

export const sublimeText: Tool = {
  id: 'sublime-text',
  name: 'Sublime Text',
  description: 'Sophisticated text editor for code',
  category: 'ides-editors',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask sublime-text',
    windows: 'choco install sublimetext4',
    linux: 'wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add - && echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list && sudo apt-get update && sudo apt-get install sublime-text',
  },
  website: 'https://www.sublimetext.com/',
  icon: '/tools/sublime-text.svg',
}; 