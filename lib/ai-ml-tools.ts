import { anaconda } from './tools/anaconda';
import { jupyter } from './tools/jupyter';
import { ollama } from './tools/ollama';
import { lmStudio } from './tools/lm-studio';
import { Tool } from './data';

export const aiMlTools: Tool[] = [anaconda, jupyter, ollama, lmStudio]; 