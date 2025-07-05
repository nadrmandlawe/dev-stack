import { Tool } from '../data';

export const starship: Tool = {
  id: 'starship',
  name: 'Starship',
  description: 'Cross-shell prompt customization',
  category: 'terminal-enhancements',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install starship',
    windows: 'choco install starship',
    linux: 'curl -sS https://starship.rs/install.sh | sh',
  },
  website: 'https://starship.rs/',
  icon: '/tools/starship.svg',
}; 