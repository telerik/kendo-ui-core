---
title: Troubleshooting
page_title: Troubleshooting | Visual Studio Integration | Telerik UI for ASP.NET Core
description: "Troubleshooting steps for Progress&reg; Telerik&reg; UI for ASP.NET Core Visual Studio extensions."
slug: troubleshooting_visualstudio_aspnetcore
position: 4
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Telerik UI for ASP.NET Core Visual Studio (VS) extensions.

## The Telerik menu is missing in Visual Studio

**Cause** The Visual Studio extensions are disabled or not correctly installed.

**Solution** Depending on whether the extension is disabled or not correctly installed, use either of the following approaches.

If the extension is disabled:

1. Open Visual Studio.
1. From the **Menu**, select **Tools** > **Extensions and Updates...**. For Visual Studio 2019, select **Extensions** > **Manage Extensions**.
1. Open the **Installed** tab.
1. Search for **Telerik ASP.NET Core VSExtensions** and make sure they are **Enabled**.

![Troubleshooting when the VS extension is disabled](images/vsextensions-disabled.png)

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

## See Also

* [Integrating Visual Studio in Your .Net Project (Overview)]({% slug overview_visualstudio_aspnetcore %})
* [Creating New Projects with Visual Studio]({% slug newprojectwizards_visualstudio_aspnetcore %})
* [Downloading the Latest Telerik UI for ASP.NET Core Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
