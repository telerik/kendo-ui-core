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

* Create a new Kendo UI for jQuery application from scratch.
* Add Kendo UI scripts and components to an existing application.
* Build custom Kendo UI script bundles with only the components your project needs.
* Set up your development environment for Kendo UI for jQuery.

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

All Kendo CLI commands for jQuery are grouped under the `kendo jquery` namespace.

| Command | Description |
|---|---|
| `kendo jquery create` | Create a new jQuery app. |
| `kendo jquery scaffold` | Add Kendo UI for jQuery scripts and components to existing apps. |
| `kendo jquery custom-build` | Generate a custom Kendo UI for jQuery UMD bundle with selected components. |
| `kendo jquery setup` | Set up Kendo UI for jQuery in your development environment. |

To list all available commands at any time, run:

```sh
kendo jquery --help
```

## Setting Up a Kendo UI for jQuery Project

To scaffold the required setup for a Kendo UI for jQuery project, run the following command inside your project folder:

```sh
kendo jquery setup
```

> If you prefer not to install the package globally, you can use `npx` to run the command without a prior global installation:
>
> ```sh
> npx @progress/kendo-cli kendo jquery setup
> ```

The `kendo jquery setup` command guides you through the initial project configuration and installs the required Kendo UI for jQuery dependencies.

## Next Steps

* [Installing with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Building Custom Kendo UI Scripts Locally]({% slug kendoui_custom_builder_cli %})

## See Also

* [Downloading the Bundles]({% slug hosting_kendoui %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Licensing Overview]({% slug licensing-overview %})
