import { Tool } from '../data';

export const pyenv: Tool = {
  id: 'pyenv',
  name: 'pyenv',
  description: 'Python version management',
  category: 'package-managers',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install pyenv',
    windows: 'choco install pyenv-win',
    linux: 'curl https://pyenv.run | bash',
  },
  website: 'https://github.com/pyenv/pyenv',
  icon: '/tools/python.svg',
}; 