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
import type { LucideIcon } from 'lucide-react';
import {
  Wrench,
  Code2,
  FileCode,
  Globe,
  Boxes,
  Compass,
  Cloud,
  Database,
  Package,
  Brain,
  Smartphone,
  Terminal,
} from 'lucide-react';

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
  icon: LucideIcon;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    id: 'core-tools',
    name: 'Core Tools',
    description: 'Essential development tools and utilities',
    icon: Wrench,
    tools: coreTools,
  },
  {
    id: 'programming-languages',
    name: 'Programming Languages',
    description: 'Programming language runtimes and SDKs',
    icon: Code2,
    tools: programmingLanguages,
  },
  {
    id: 'ides-editors',
    name: 'IDEs & Editors',
    description: 'Integrated development environments and code editors',
    icon: FileCode,
    tools: idesEditors,
  },
  {
    id: 'web-api-tools',
    name: 'Web & API Tools',
    description: 'Tools for web development and API testing',
    icon: Globe,
    tools: webApiTools,
  },
  {
    id: 'docker-virtualization',
    name: 'Docker & Virtualization',
    description: 'Containerization and virtualization tools',
    icon: Boxes,
    tools: dockerVirtualization,
  },
  {
    id: 'browsers',
    name: 'Browsers',
    description: 'Web browsers for development and testing',
    icon: Compass,
    tools: browsers,
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Cloud platforms and DevOps tools',
    icon: Cloud,
    tools: cloudDevops,
  },
  {
    id: 'database-tools',
    name: 'Database Tools',
    description: 'Database management and development tools',
    icon: Database,
    tools: databaseTools,
  },
  {
    id: 'package-managers',
    name: 'Package Managers',
    description: 'Language-specific package managers',
    icon: Package,
    tools: packageManagers,
  },
  {
    id: 'ai-ml-tools',
    name: 'AI/ML Tools',
    description: 'Artificial intelligence and machine learning tools',
    icon: Brain,
    tools: aiMlTools,
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    description: 'Tools for mobile app development',
    icon: Smartphone,
    tools: mobileDevelopment,
  },
  {
    id: 'terminal-enhancements',
    name: 'Terminal Enhancements',
    description: 'Terminal customization and productivity tools',
    icon: Terminal,
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