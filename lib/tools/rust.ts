import { Tool } from '../data';

export const rust: Tool = {
  id: 'rust',
  name: 'Rust',
  description: 'Systems programming language',
  category: 'programming-languages',
  compatibleOS: ['macos', 'windows', 'linux'],
  installationCommands: {
    macos: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
    windows: 'choco install rust',
    linux: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
  },
  website: 'https://www.rust-lang.org/',
  icon: '/tools/rust.svg',
}; 