import { Tool } from '../data';

export const kubectl: Tool = {
  id: 'kubectl',
  name: 'kubectl',
  description: 'Kubernetes command line tool',
  category: 'cloud-devops',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install kubectl',
    windows: 'choco install kubernetes-cli',
    linux: 'sudo apt-get install kubectl',
  },
  website: 'https://kubernetes.io/docs/reference/kubectl/',
  icon: '/tools/kubectl.svg',
}; 