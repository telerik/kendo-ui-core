---
title: Using the Kendo CLI
page_title: Kendo CLI - Download and Installation
description: "Get started with the Kendo CLI to install and set up Kendo UI for jQuery projects from the command line."
components: ["general"]
slug: kendoui_kendo_cli
position: 75
---

# Using the Kendo CLI

The Kendo CLI (`@progress/kendo-cli`) is a command-line tool that helps you set up and manage Kendo UI for jQuery projects from the terminal.

With the Kendo CLI you can:

* Create a new Kendo UI for jQuery application from a built-in template.
* Scaffold Kendo UI components into an existing application.
* Build a custom Kendo UI script bundle with only the components your project needs.
* Set up your development environment, including license activation and AI assistant configuration.
* Migrate your project to the latest version of the Kendo UI packages.

## Prerequisites

Ensure you have Node 22 or Node 24 installed. See [Node Setup on Windows with nvm-windows]({% slug kendoui_node_setup_windows_nvm %}) for a quick setup guide.

## Installation

Install the Kendo CLI globally so the `kendo` command is available in any terminal session:

```sh
npm i -g @progress/kendo-cli
```

Verify the installation by checking the version:

```sh
kendo --version
```

## Available Commands

The following commands apply to Kendo UI for jQuery. Run `kendo --help` to see all available commands at any time.

| Command | Description |
|---|---|
| `kendo create jquery` | Create a new jQuery app from a built-in template. |
| `kendo scaffold jquery` | Add Kendo UI for jQuery components to an existing app. |
| `kendo custom-build jquery` | Generate a custom Kendo UI for jQuery UMD bundle with selected components. |
| `kendo setup jquery` | Set up Kendo UI for jQuery in your development environment. |
| `kendo migrate` | Migrate the project to the latest version of the Kendo UI packages. |
| `kendo license` | Manage your Kendo UI license (activate, refresh, info). |
| `kendo mcp config jquery` | Configure the Kendo UI for jQuery MCP server for your AI coding assistant. |
| `kendo machine-id` | Print a hardware-based hash for license troubleshooting. |

### kendo create jquery

Creates a new Kendo UI for jQuery application from a template. The available templates are:

| Template shorthand | Description |
|---|---|
| `jba` | Blank — a minimal starting point with Kendo UI scripts and stylesheets included and no pre-built pages. |
| `jqa` | Admin — a multi-view app with a Task Dashboard, Products, Performance statistics, and Account Settings pages, showcasing Grid, Charts, and navigational components. |
| `jda` | Dashboard — includes a ListView of team members and Scheduler and Chart components representing task and performance data. |
| `jdla` | Dashboard Layout — displays data through Chart components arranged in a TileLayout. |
| `jga` | Grid — demonstrates a simple Grid configuration. |
| `jsa` | Standard — showcases navigational components such as PanelBar, Menu, TabStrip, and TreeView. |

```sh
kendo create jquery jba MyApp
kendo create jquery jqa MyAdminApp --theme=bootstrap
```

After the project is generated, navigate into the new directory, install packages, and run:

```sh
cd MyApp
npm install
npm start
```

#### Options

| Option | Description | Default |
|---|---|---|
| `--theme` | Kendo theme to apply. Choices: `default`, `bootstrap`, `material`, `fluent`. | `default` |

### kendo scaffold jquery

Adds Kendo UI for jQuery components to an existing application. The command detects your project directory and guides you through selecting a component to add.

```sh
kendo scaffold jquery
```

### kendo custom-build jquery

Generates a custom Kendo UI for jQuery UMD bundle that includes only the components you select, reducing the overall file size. The CLI resolves and installs the target `@progress/kendo-ui` version, lets you choose components interactively, and outputs a single `kendo-custom.min.js` file. A `kendo-config.json` file is saved so you can reproduce the build later.

```sh
kendo custom-build jquery
kendo custom-build jquery --version xxxx.x.xxx
kendo custom-build jquery --no-interactive
kendo custom-build jquery --config path/to/kendo-config.json
```

#### Options

| Option | Description | Default |
|---|---|---|
| `--version` | Target `@progress/kendo-ui` version (2026 and later only). | Latest |
| `--config`, `-c` | Path to `kendo-config.json`. | `kendo-config.json` |
| `--interactive` | Run interactive component selection. Pass `--no-interactive` to skip prompts and use an existing config file. | `true` |

### kendo setup jquery

Sets up Kendo UI for jQuery in your development environment. The wizard checks for a valid license and opens a browser to authenticate if needed, then configures the product-specific MCP server for your IDE.

```sh
kendo setup jquery
```

> If you prefer not to install the package globally, you can use `npx`:
>
> ```sh
> npx @progress/kendo-cli kendo setup jquery
> ```

### kendo migrate

Migrates the project to the latest version of the Kendo UI packages and applies available codemods. Run the command in the root of your project:

```sh
kendo migrate
```

For more targeted migrations:

```sh
# Migrate a specific package between versions
kendo migrate @progress/kendo-ui --from 10 --to 11

# Only install updates, skip codemods
kendo migrate --no-codemods

# Only run codemods, skip package installation
kendo migrate --no-install

# Skip confirmation prompts
kendo migrate --force
```

#### Options

| Option | Description | Default |
|---|---|---|
| `packages` | One or more packages to migrate. If omitted, runs for all detected Kendo packages. | All packages |
| `--to` | Target version to migrate to. | Latest version |
| `--from` | Source version to migrate from. | Currently installed version |
| `-f`, `--force` | Skip all confirmation prompts. | `false` |
| `-i`, `--install` / `--no-install` | Install the updated `@progress` packages. Pass `--no-install` to skip installation and run codemods only. | `true` |
| `-c`, `--codemods` / `--no-codemods` | Run codemods for the listed or updated packages. Pass `--no-codemods` to skip codemods and install packages only. | `true` |
| `--peer-deps`, `--pd` / `--no-peer-deps` | Install `@progress` packages gathered from peer dependencies. | `true` |
| `-o`, `--optional` / `--no-optional` | Run optional codemods. Pass `--no-optional` to run only required transformations. | `true` |
| `--ignore-pattern` | Glob pattern for files and directories to exclude from codemod transformations. | — |
| `--ai-mode` | Display post-codemod instructions for changes that could not be applied automatically. | `false` |

### kendo license

Manages your Kendo UI license key.

```sh
# Activate a license key
kendo license activate

# Download or refresh a license key by authenticating in the browser
kendo license refresh

# Display the active license details
kendo license info
```

`kendo license activate` searches for a license key in the following locations, in order:

* The path specified in the `TELERIK_LICENSE_PATH` environment variable.
* The `TELERIK_LICENSE` or `KENDO_UI_LICENSE` environment variables.
* `telerik-license.txt` or `kendo-ui-license.txt` files in the current directory, each parent directory, or `~/.telerik/` (Linux and macOS) / `%APPDATA%\Telerik\` (Windows).

`kendo license refresh` opens a browser to authenticate with telerik.com and saves a fresh key to `~/.telerik/telerik-license.txt`.

`kendo license info` prints the audience, issue date, and list of products covered by the current license key.

### kendo mcp config jquery

Configures the Kendo UI for jQuery MCP server so your AI coding assistant can look up components, APIs, and best practices directly from the official documentation.

```sh
# Configure for all supported IDEs (default)
kendo mcp config jquery

# Configure for a specific IDE
kendo mcp config jquery --ide=cursor
kendo mcp config jquery --ide=vscode
kendo mcp config jquery --ide=visualstudio

# Overwrite existing entries
kendo mcp config jquery --ide=cursor --force

# Output machine-readable JSON
kendo mcp config jquery --json
```

#### Options

| Option | Description | Default |
|---|---|---|
| `--ide` | IDE to configure. Choices: `cursor`, `vscode`, `visualstudio`, `all`. | `all` |
| `--force` | Overwrite existing MCP server entries instead of skipping them. | `false` |
| `--json` | Print machine-readable JSON output instead of human-readable text. | `false` |

### kendo machine-id

Prints a hardware-based hash for your machine. Useful when troubleshooting license activation issues.

```sh
kendo machine-id
```

## Next Steps

* [Installing with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Building Custom Kendo UI Scripts Locally]({% slug kendoui_custom_builder_cli %})

## See Also

* [Downloading the Bundles]({% slug hosting_kendoui %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Licensing Overview]({% slug licensing-overview %})
