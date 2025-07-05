import { Tool } from '../data';

export const intellij: Tool = {
  id: 'intellij',
  name: 'IntelliJ IDEA',
  description: 'Java IDE with advanced features',
  category: 'ides-editors',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask intellij-idea',
    windows: 'choco install intellijidea-community',
    linux: 'sudo snap install intellij-idea-community --classic',
  },
  website: 'https://www.jetbrains.com/idea/',
  icon: '/tools/intellij-idea.svg',
}; 