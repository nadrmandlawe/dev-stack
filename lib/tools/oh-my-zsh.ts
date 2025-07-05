import { Tool } from '../data';

export const ohMyZsh: Tool = {
  id: 'oh-my-zsh',
  name: 'Oh My Zsh',
  description: 'Framework for managing Zsh configuration',
  category: 'terminal-enhancements',
  compatibleOS: ['macos', 'linux'],
  installationCommands: {
    macos: 'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"',
    linux: 'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"',
  },
  website: 'https://ohmyz.sh/',
  icon: '/tools/oh-my-zsh.svg',
}; 