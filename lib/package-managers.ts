import { yarn } from './tools/yarn';
import { pnpm } from './tools/pnpm';
import { nvm } from './tools/nvm';
import { pyenv } from './tools/pyenv';
import { Tool } from './data';

export const packageManagers: Tool[] = [yarn, pnpm, nvm, pyenv]; 