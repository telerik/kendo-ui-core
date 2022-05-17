---
title: Telerik NuGet
description: "Common issues that may occur when you use the Telerik NuGet server to install Telerik UI an Kendo UI packages"
page_title: Telerik NuGet Troubleshooting
slug: troubleshooting_telerik_nuget
tags: long, nuget, package, installation
---


# Troubleshooting Telerik NuGet

This article provides solutions to common issues that you may observe when working with the Telerik NuGet server and the NuGet packages that it provides.

## Issue: The NuGet Package Takes Too Long to Install or Update on Visual Studio

The NuGet package takes too long to install or update on Visual Studio. How to improve the installation and update times?

### Solution

* Disable the auto-sync in the `_references.js` file by modifying the following `/// <autosync enabled="false" />` line.
* You can also disconnect the project from the source control before running the Update Wizard.

## Issue: Telerik NuGet Returns 401 Logon Failed after Password Change

After changing your Telerik password, you get `[Telerik Nuget] The V2 feed at '...' returned an unexpected status code '401 Logon failed.'` error in the NuGet Package Manager.

### Solution

After changing your Telerik password, you must reset your credentials in the `NuGet.config` file. To do this, run the `NuGet Sources Update -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your new password"` command.

The password must contain only ASCII characters.

As an alternative, you can [reset your Telerik NuGet Feed credentials from the Windows Credentials Manager](#solution-2-windows-credentials-manager)

## Issue: Resetting Telerik Nuget Credentials

On Windows, if you enter and save wrong credentials for the Telerik NuGet or if you change your Telerik credentials, you won't have access to the desired NuGet packages. Before you can enter the correct user name and password, you must clear the saved credentials.

### Solution 1: Resetting The Credentials in NuGet.config

Try resetting your credentials by using the approach suggested in the [Telerik NuGet returns 401 Logon failed after password change](#issue-telerik-nuget-returns-401-logon-failed-after-password-change). If the credentials are not updated, continue with [Solution 2 below](#solution-2-windows-credentials-manager).

### Solution 2: Windows Credentials Manager

Alternatively, use Windows Credentials Manager to remove the saved credentials:

1. In Visual Studio navigate to **Tools** > **NuGet Package Manager** > **Package Manager Settings**. Select **NuGet Package Manager**, click **Package Sources**, and remove the listed Telerik NuGet package source.
1. Close Visual Studio.
1. Open the Windows Credentials Manager. To access it, navigate to **Control Panel** > **User Accounts** > **Credential Manager**.
1. Click **Windows Credentials**.
1. Remove the following saved credentials:
    * `nuget.telerik.com`
    * `VSCredentials_nuget.telerik.com`
![My Image](../knowledge-base/images/windows-credential-manager.png)
1. Add the Telerik NuGet Feed again, and then enter the correct credentials. For more details, see the {% if site.core %} [Installing with Nuget]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) {% else %} [Installing with Nuget]({% slug aspnetmvc_nuget %}) {% endif %} article.
1. If desired, verify the NuGet credentials by inspecting the `NuGet.config` file located in `%AppData%\NuGet\NuGet.config`
