import { Button } from '@/components/ui/button';

interface QuickPresetsProps {
  onPresetSelect: (toolIds: string[]) => void;
}

const PRESETS = [
  {
    name: 'Web Developer',
    toolIds: [
      'git', 'github-cli', 'curl', 'wget', 'nodejs', 'python', 'vscode', 'postman', 'chrome', 'firefox', 'yarn', 'pnpm', 'nvm', 'oh-my-zsh', 'starship'
    ]
  },
  {
    name: 'Mobile Developer',
    toolIds: [
      'git', 'github-cli', 'nodejs', 'python', 'vscode', 'react-native', 'expo', 'android-studio', 'yarn', 'pnpm', 'nvm', 'oh-my-zsh', 'starship'
    ]
  },
  {
    name: 'AI/ML',
    toolIds: [
      'python', 'anaconda', 'jupyter', 'vscode', 'git', 'github-cli', 'oh-my-zsh', 'starship'
    ]
  }
];

export function QuickPresets({ onPresetSelect }: QuickPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2 my-2">
      {PRESETS.map(preset => (
        <Button
          key={preset.name}
          variant="outline"
          size="sm"
          onClick={() => onPresetSelect(preset.toolIds)}
        >
          {preset.name}
        </Button>
      ))}
    </div>
  );
} 