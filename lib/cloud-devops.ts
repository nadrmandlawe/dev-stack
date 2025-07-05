import { awsCli } from './tools/aws-cli';
import { kubectl } from './tools/kubectl';
import { terraform } from './tools/terraform';
import { vercelCli } from './tools/vercel-cli';
import { Tool } from './data';

export const cloudDevops: Tool[] = [awsCli, kubectl, terraform, vercelCli]; 