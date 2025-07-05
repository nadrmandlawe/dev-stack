import { Tool } from '../data';

export const githubCli: Tool = {
  id: 'github-cli',
  name: 'GitHub CLI',
  description: 'GitHub on the command line',
  category: 'core-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install gh',
    windows: 'choco install gh',
    linux: 'sudo apt-get install gh',
  },
  website: 'https://cli.github.com/',
  icon: '/tools/github.svg',
}; 