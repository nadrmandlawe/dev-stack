import { postman } from './tools/postman';
import { insomnia } from './tools/insomnia';
import { httpie } from './tools/httpie';
import { ngrok } from './tools/ngrok';
import { Tool } from './data';

export const webApiTools: Tool[] = [postman, insomnia, httpie, ngrok]; 