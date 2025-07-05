import { git } from './tools/git';
import { githubCli } from './tools/github-cli';
import { curl } from './tools/curl';
import { wget } from './tools/wget';
import { ssh } from './tools/ssh';
import { Tool } from './data';

export const coreTools: Tool[] = [git, githubCli, curl, wget, ssh]; 