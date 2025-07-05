import { ohMyZsh } from './tools/oh-my-zsh';
import { starship } from './tools/starship';
import { iterm2 } from './tools/iterm2';
import { warp } from './tools/warp';
import { Tool } from './data';

export const terminalEnhancements: Tool[] = [ohMyZsh, starship, iterm2, warp]; 