import { Tool } from '../data';

export const vscode: Tool = {
  id: 'vscode',
  name: 'Visual Studio Code',
  description: 'Lightweight but powerful source code editor',
  category: 'ides-editors',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask visual-studio-code',
    windows: 'choco install vscode',
    linux: 'sudo snap install code --classic',
  },
  website: 'https://code.visualstudio.com/',
  icon: '/tools/vscode.svg',
}; 