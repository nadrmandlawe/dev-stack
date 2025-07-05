import { vscode } from './tools/vscode';
import { cursor } from './tools/cursor';
import { intellij } from './tools/intellij';
import { vim } from './tools/vim';
import { sublimeText } from './tools/sublime-text';
import { Tool } from './data';

export const idesEditors: Tool[] = [vscode, cursor, intellij, vim, sublimeText]; 