---
title: Troubleshooting
page_title: Troubleshooting | UI for ASP.NET Core Visual Studio Integration
description: "Troubleshooting steps for Progress&reg; Telerik&reg; UI for ASP.NET Core Visual Studio Extensions."
slug: troubleshooting_visualstudio_aspnetcore
position: 4
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the UI for ASP.NET Core Visual Studio (VS) Extensions.

## The Telerik menu is missing in Visual Studio

**Cause**

The Visual Studio Extensions are disabled or not correctly installed.

**Solution**

If the extension is disabled:

1. Open Visual Studio.
1. From the **Menu**, select **Tools** > **Extensions and Updates...**. For Visual Studio 2019, select **Extensions** > **Manage Extensions**.
1. Open the **Installed** tab.
1. Search for **Telerik ASP.NET Core VSExtensions** and make sure they are **Enabled**.

![vsextensions-disabled](images/vsextensions-disabled.png)

If the extension is not correctly installed:

1. Open Visual Studio.
1. From the **Menu**, select **Tools** > **Extensions and Updates...**. For Visual Studio 2019, select **Extensions** > **Manage Extensions**.
1. Open the **Online** tab.
1. Search for **Telerik ASP.NET Core VSExtensions**>
1. Download and install the extensions.

If after you apply the described approaches the issue persists, contact the Support Team at Progress after you generate Visual Studio [ActivityLog](https://docs.microsoft.com/en-us/visualstudio/ide/reference/log-devenv-exe?view=vs-2019) file:

1. Under **Administrative rights**, open the [**Developer Command** prompt](https://docs.microsoft.com/en-us/dotnet/framework/tools/developer-command-prompt-for-vs) for Visual Studio 20xx.
1. Execute the `devenv /log %userprofile%\desktop\ActivityLog.xml` command to start Visual Studio and create logs on your Desktop.
1. Reproduce the issue.
1. Attach the `Activitylog` files when you contact our support.
