import { Tool } from '../data';

export const ssh: Tool = {
  id: 'ssh',
  name: 'SSH',
  description: 'Secure Shell for remote access',
  category: 'core-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install openssh',
    windows: 'choco install openssh',
    linux: 'sudo apt-get install openssh-client',
  },
  website: 'https://www.openssh.com/',
  icon: '/tools/ssh.svg',
}; 