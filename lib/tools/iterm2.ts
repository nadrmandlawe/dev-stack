import { Tool } from '../data';

export const iterm2: Tool = {
  id: 'iterm2',
  name: 'iTerm2',
  description: 'Terminal emulator for macOS',
  category: 'terminal-enhancements',
  compatibleOS: ['macos'],
  installationCommands: {
    macos: 'brew install --cask iterm2',
  },
  website: 'https://iterm2.com/',
  icon: '/tools/iterm2.svg',
}; 