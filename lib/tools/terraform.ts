import { Tool } from '../data';

export const terraform: Tool = {
  id: 'terraform',
  name: 'Terraform',
  description: 'Infrastructure as code tool',
  category: 'cloud-devops',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install terraform',
    windows: 'choco install terraform',
    linux: 'sudo apt-get install terraform',
  },
  website: 'https://www.terraform.io/',
  icon: '/tools/terraform.svg',
}; 