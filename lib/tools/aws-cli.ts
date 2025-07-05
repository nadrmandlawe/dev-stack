import { Tool } from '../data';

export const awsCli: Tool = {
  id: 'aws-cli',
  name: 'AWS CLI',
  description: 'Command line interface for AWS',
  category: 'cloud-devops',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install awscli',
    windows: 'choco install awscli',
    linux: 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install',
  },
  website: 'https://aws.amazon.com/cli/',
  icon: '/tools/aws.svg',
}; 