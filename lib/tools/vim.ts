import { Tool } from '../data';

export const vim: Tool = {
  id: 'vim',
  name: 'Vim',
  description: 'Highly configurable text editor',
  category: 'ides-editors',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install vim',
    windows: 'choco install vim',
    linux: 'sudo apt-get install vim',
  },
  website: 'https://www.vim.org/',
  icon: '/tools/vim.svg',
}; 