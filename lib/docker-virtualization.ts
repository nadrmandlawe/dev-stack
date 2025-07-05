import { dockerDesktop } from './tools/docker-desktop';
import { dockerEngine } from './tools/docker-engine';
import { virtualbox } from './tools/virtualbox';
import { utm } from './tools/utm';
import { Tool } from './data';

export const dockerVirtualization: Tool[] = [dockerDesktop, dockerEngine, virtualbox, utm]; 