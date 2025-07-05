import { Tool } from '../data';

export const cursor: Tool = {
  id: 'cursor',
  name: 'Cursor',
  description: 'AI-first code editor',
  category: 'ides-editors',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask cursor',
    windows: 'choco install cursor',
    linux: 'curl -L https://download.cursor.sh/linux/appImage/x64/cursor-latest.AppImage -o cursor && chmod +x cursor',
  },
  website: 'https://cursor.sh/',
  icon: '/tools/cursor.svg',
}; 