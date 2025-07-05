import { Tool, OperatingSystem } from './data';

export interface ScriptConfig {
  os: OperatingSystem;
  tools: Tool[];
  includePackageManagers: boolean;
  includePathSetup: boolean;
  includeShellConfig: boolean;
  customName?: string;
}

export function generateScript(config: ScriptConfig): string {
  const { os } = config;
  
  if (os === 'windows') {
    return generatePowerShellScript(config);
  } else {
    return generateBashScript(config);
  }
}

function generatePowerShellScript(config: ScriptConfig): string {
  const { tools, includePathSetup, includeShellConfig } = config;
  const timestamp = new Date().toISOString().split('T')[0];
  
  let script = `# DevSetup Generator Script
# Generated on ${timestamp}
# Operating System: Windows
# Tools: ${tools.map(t => t.name).join(', ')}

# Set execution policy to allow script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Function to write colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Function to check if command exists
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

Write-ColorOutput "🚀 Starting DevSetup installation..." "Green"
Write-ColorOutput "This script will install the following tools:" "Yellow"
$tools | ForEach-Object { Write-ColorOutput "  • $($_.name)" "Cyan" }
Write-ColorOutput ""

# Check if Chocolatey is installed
if (-not (Test-Command "choco")) {
    Write-ColorOutput "📦 Installing Chocolatey package manager..." "Yellow"
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    Write-ColorOutput "✅ Chocolatey installed successfully" "Green"
} else {
    Write-ColorOutput "✅ Chocolatey already installed" "Green"
}

# Install tools
Write-ColorOutput "🔧 Installing selected tools..." "Yellow"
$tools | ForEach-Object {
    $tool = $_
    if ($tool.installationCommands.windows) {
        Write-ColorOutput "Installing $($tool.name)..." "Cyan"
        try {
            Invoke-Expression $tool.installationCommands.windows
            Write-ColorOutput "✅ $($tool.name) installed successfully" "Green"
        } catch {
            Write-ColorOutput "❌ Failed to install $($tool.name): $($_.Exception.Message)" "Red"
        }
    } else {
        Write-ColorOutput "⚠️  No Windows installation command for $($tool.name)" "Yellow"
    }
}

`;

  if (includePathSetup) {
    script += `
# Setup PATH environment variables
Write-ColorOutput "🔧 Setting up PATH environment variables..." "Yellow"
$envPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")

# Add common development paths
$devPaths = @(
    "$env:USERPROFILE\\AppData\\Local\\Programs\\Microsoft VS Code\\bin",
    "$env:USERPROFILE\\AppData\\Roaming\\npm",
    "$env:USERPROFILE\\.cargo\\bin",
    "$env:USERPROFILE\\AppData\\Local\\Programs\\Git\\bin"
)

foreach ($path in $devPaths) {
    if (Test-Path $path) {
        if ($envPath -notlike "*$path*") {
            $envPath += ";$path"
            Write-ColorOutput "Added $path to PATH" "Green"
        }
    }
}

[System.Environment]::SetEnvironmentVariable("PATH", $envPath, "User")
Write-ColorOutput "✅ PATH environment variables configured" "Green"
`;
  }

  if (includeShellConfig) {
    script += `
# Setup PowerShell profile
Write-ColorOutput "🔧 Setting up PowerShell profile..." "Yellow"
$profilePath = $PROFILE.CurrentUserAllHosts
$profileDir = Split-Path $profilePath -Parent

if (!(Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force
}

if (!(Test-Path $profilePath)) {
    New-Item -ItemType File -Path $profilePath -Force
}

# Add useful aliases and functions
$profileContent = @"

# DevSetup Generator Profile Additions
# Generated on ${timestamp}

# Useful aliases
Set-Alias ll Get-ChildItem
Set-Alias g git
Set-Alias c code

# Function to open current directory in VS Code
function code. { code . }

# Function to open current directory in explorer
function explorer. { explorer . }

# Function to refresh environment variables
function refresh-env {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

"@

Add-Content -Path $profilePath -Value $profileContent
Write-ColorOutput "✅ PowerShell profile configured" "Green"
`;
  }

  script += `
Write-ColorOutput ""
Write-ColorOutput "🎉 DevSetup installation completed!" "Green"
Write-ColorOutput "Please restart your terminal to apply all changes." "Yellow"
Write-ColorOutput ""
Write-ColorOutput "Installed tools:" "Yellow"
$tools | ForEach-Object { Write-ColorOutput "  ✅ $($_.name)" "Green" }
Write-ColorOutput ""
Write-ColorOutput "Happy coding! 🚀" "Green"
`;

  return script;
}

function generateBashScript(config: ScriptConfig): string {
  const { tools, includePathSetup, includeShellConfig } = config;
  const timestamp = new Date().toISOString().split('T')[0];
  const isMacOS = config.os === 'macos';
  
  let script = `#!/bin/bash
# DevSetup Generator Script
# Generated on ${timestamp}
# Operating System: ${config.os === 'macos' ? 'macOS' : 'Linux'}
# Tools: ${tools.map(t => t.name).join(', ')}

set -e  # Exit on any error

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
CYAN='\\033[0;36m'
NC='\\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "\\033[1;34m[INFO]\\033[0m $1"
}

print_success() {
    echo -e "\\033[1;32m[SUCCESS]\\033[0m $1"
}

print_warning() {
    echo -e "\\033[1;33m[WARNING]\\033[0m $1"
}

print_error() {
    echo -e "\\033[1;31m[ERROR]\\033[0m $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

print_status "🚀 Starting DevSetup installation..."
print_status "This script will install the following tools:"
for tool in "${tools.map(t => t.name).join('" "')}"; do
    echo -e "  \${CYAN}• \$tool\${NC}"
done
echo

`;

  if (isMacOS) {
    script += `# Check if Homebrew is installed
if ! command_exists brew; then
    print_status "📦 Installing Homebrew package manager..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == "arm64" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    print_success "Homebrew installed successfully"
else
    print_success "Homebrew already installed"
fi

`;
  } else {
    script += `# Update package lists
print_status "📦 Updating package lists..."
sudo apt-get update

`;
  }

  script += `# Install tools
print_status "🔧 Installing selected tools..."
`;

  tools.forEach(tool => {
    const command = tool.installationCommands[config.os];
    if (command) {
      script += `
# Installing ${tool.name}
print_status "Installing ${tool.name}..."
if ${command}; then
    print_success "${tool.name} installed successfully"
else
    print_error "Failed to install ${tool.name}"
    exit 1
fi
`;
    } else {
      script += `
# ${tool.name} - No installation command for ${config.os}
print_warning "No ${config.os} installation command for ${tool.name}"
`;
    }
  });

  if (includePathSetup) {
    script += `
# Setup PATH environment variables
print_status "🔧 Setting up PATH environment variables..."
`;
    
    if (isMacOS) {
      script += `
# Add common development paths to shell profile
SHELL_PROFILE="$HOME/.zshrc"
if [[ ! -f "$SHELL_PROFILE" ]]; then
    SHELL_PROFILE="$HOME/.bash_profile"
fi

# Add Homebrew to PATH
if ! grep -q "homebrew" "$SHELL_PROFILE" 2>/dev/null; then
    echo 'export PATH="/opt/homebrew/bin:$PATH"' >> "$SHELL_PROFILE"
fi

# Add other common paths
PATHS=(
    "$HOME/.cargo/bin"
    "$HOME/.local/bin"
    "$HOME/.npm-global/bin"
)

for path in "\${PATHS[@]}"; do
    if [[ -d "$path" ]] && ! grep -q "$path" "$SHELL_PROFILE" 2>/dev/null; then
        echo "export PATH=\"$path:\$PATH\"" >> "$SHELL_PROFILE"
    fi
done

print_success "PATH environment variables configured"
`;
    } else {
      script += `
# Add common development paths
PATHS=(
    "$HOME/.cargo/bin"
    "$HOME/.local/bin"
    "$HOME/.npm-global/bin"
)

for path in "\${PATHS[@]}"; do
    if [[ -d "$path" ]]; then
        if ! grep -q "$path" ~/.bashrc 2>/dev/null; then
            echo "export PATH=\"$path:\$PATH\"" >> ~/.bashrc
        fi
    fi
done

print_success "PATH environment variables configured"
`;
    }
  }

  if (includeShellConfig) {
    script += `
# Setup shell configuration
print_status "🔧 Setting up shell configuration..."
`;
    
    if (isMacOS) {
      script += `
SHELL_PROFILE="$HOME/.zshrc"
if [[ ! -f "$SHELL_PROFILE" ]]; then
    SHELL_PROFILE="$HOME/.bash_profile"
fi

# Add useful aliases and functions
if ! grep -q "DevSetup Generator" "$SHELL_PROFILE" 2>/dev/null; then
    cat >> "$SHELL_PROFILE" << 'EOF'

# DevSetup Generator Profile Additions
# Generated on ${timestamp}

# Useful aliases
alias ll='ls -la'
alias g='git'
alias c='code'
alias code.='code .'
alias explorer.='open .'

# Function to refresh environment variables
refresh-env() {
    source "$SHELL_PROFILE"
}

EOF
    print_success "Shell profile configured"
else
    print_warning "Shell profile already contains DevSetup configuration"
fi
`;
    } else {
      script += `
# Add useful aliases and functions to bashrc
if ! grep -q "DevSetup Generator" ~/.bashrc 2>/dev/null; then
    cat >> ~/.bashrc << 'EOF'

# DevSetup Generator Profile Additions
# Generated on ${timestamp}

# Useful aliases
alias ll='ls -la'
alias g='git'
alias c='code'
alias code.='code .'
alias explorer.='xdg-open .'

# Function to refresh environment variables
refresh-env() {
    source ~/.bashrc
}

EOF
    print_success "Shell profile configured"
else
    print_warning "Shell profile already contains DevSetup configuration"
fi
`;
    }
  }

  script += `
echo
print_success "🎉 DevSetup installation completed!"
print_warning "Please restart your terminal or run 'source ~/.zshrc' (macOS) or 'source ~/.bashrc' (Linux) to apply changes."
echo
print_status "Installed tools:"
`;

  tools.forEach(tool => {
    script += `echo -e "  \${GREEN}✅ ${tool.name}\${NC}"\n`;
  });

  script += `
echo
print_success "Happy coding! 🚀"
`;

  return script;
}

export function downloadScript(script: string, filename: string): void {
  const blob = new Blob([script], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
} 