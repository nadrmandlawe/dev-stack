import { Tool } from '../data';

export const git: Tool = {
  id: 'git',
  name: 'Git',
  description: 'Distributed version control system',
  category: 'core-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install git',
    windows: 'choco install git',
    linux: 'sudo apt-get install git',
  },
  website: 'https://git-scm.com/',
  icon: '/tools/git.svg',
}; 