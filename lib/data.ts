import { coreTools } from './core-tools';
import { programmingLanguages } from './programming-languages';
import { webApiTools } from './web-api-tools';
import { dockerVirtualization } from './docker-virtualization';
import { browsers } from './browsers';
import { cloudDevops } from './cloud-devops';
import { databaseTools } from './database-tools';
import { idesEditors } from './ides-editors';
import { packageManagers } from './package-managers';
import { aiMlTools } from './ai-ml-tools';
import { mobileDevelopment } from './mobile-development';
import { terminalEnhancements } from './terminal-enhancements';

export type OperatingSystem = 'macos' | 'windows' | 'linux';

export const operatingSystemIcons: Record<OperatingSystem, string> = {
  macos: '/apple.svg',
  windows: '/windows.svg',
  linux: '/linux.svg',
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  compatibleOS: OperatingSystem[];
  installationCommands: {
    [key in OperatingSystem]?: string;
  };
  website?: string;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    id: 'core-tools',
    name: 'Core Tools',
    description: 'Essential development tools and utilities',
    icon: '🔧',
    tools: coreTools,
  },
  {
    id: 'programming-languages',
    name: 'Programming Languages',
    description: 'Programming language runtimes and SDKs',
    icon: '💻',
    tools: programmingLanguages,
  },
  {
    id: 'ides-editors',
    name: 'IDEs & Editors',
    description: 'Integrated development environments and code editors',
    icon: '📝',
    tools: idesEditors,
  },
  {
    id: 'web-api-tools',
    name: 'Web & API Tools',
    description: 'Tools for web development and API testing',
    icon: '🌐',
    tools: webApiTools,
  },
  {
    id: 'docker-virtualization',
    name: 'Docker & Virtualization',
    description: 'Containerization and virtualization tools',
    icon: '🐳',
    tools: dockerVirtualization,
  },
  {
    id: 'browsers',
    name: 'Browsers',
    description: 'Web browsers for development and testing',
    icon: '🌍',
    tools: browsers,
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Cloud platforms and DevOps tools',
    icon: '☁️',
    tools: cloudDevops,
  },
  {
    id: 'database-tools',
    name: 'Database Tools',
    description: 'Database management and development tools',
    icon: '🗄️',
    tools: databaseTools,
  },
  {
    id: 'package-managers',
    name: 'Package Managers',
    description: 'Language-specific package managers',
    icon: '📦',
    tools: packageManagers,
  },
  {
    id: 'ai-ml-tools',
    name: 'AI/ML Tools',
    description: 'Artificial intelligence and machine learning tools',
    icon: '🤖',
    tools: aiMlTools,
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    description: 'Tools for mobile app development',
    icon: '📱',
    tools: mobileDevelopment,
  },
  {
    id: 'terminal-enhancements',
    name: 'Terminal Enhancements',
    description: 'Terminal customization and productivity tools',
    icon: '💻',
    tools: terminalEnhancements,
  }
];

export const getToolsByCategory = (categoryId: string): Tool[] => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.tools : [];
};

export const getToolsByOS = (os: OperatingSystem): Tool[] => {
  return categories.flatMap(category => 
    category.tools.filter(tool => tool.compatibleOS.includes(os))
  );
};

export const getAllTools = (): Tool[] => {
  return categories.flatMap(category => category.tools);
}; 