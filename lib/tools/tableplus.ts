import { Tool } from '../data';

export const tableplus: Tool = {
  id: 'tableplus',
  name: 'TablePlus',
  description: 'Modern database management tool',
  category: 'database-tools',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: 'brew install --cask tableplus',
    windows: 'choco install tableplus',
    linux: 'wget -O - https://deb.tableplus.com/apt/public.key | sudo apt-key add - && sudo add-apt-repository "deb https://deb.tableplus.com/debian/22 tableplus main" && sudo apt-get update && sudo apt-get install tableplus',
  },
  website: 'https://tableplus.com/',
  icon: '/tools/tableplus.svg',
};
