---
title: Troubleshooting
page_title: Troubleshooting | UI for ASP.NET MVC Visual Studio Integration
description: "Troubleshooting Progress&reg; Telerik&reg; UI for ASP.NET MVC Visual Studio Extensions."
slug: troubleshooting_visualstudio_aspnetmvc
position: 11
---

# Troubleshooting

This article provides solutions to common issues you may encounter while integrating Telerik UI for ASP.NET MVC in Visual Studio.

## The Telerik menu is missing in Visual Studio**

**Cause**

Telerik Visual Studio Extensions are disabled or not installed correctly.

**Suggested solution 1(Extension is Disabled):**

* Open Visual Studio;
* Go to menu Tools - > Extensions and Updates...(for Visual Studio 2019 Extensions - > Manage Extensions)
* Open the Installed tab on the left​
* Search for Telerik ASP.NET MVC VSExtensions and make sure they are Enabled

![vsextensions-disabled](images/vsextensions-disabled.png)

**Suggested solution 2(Extension is not installed):**

* Open Visual Studio;
* Go to menu Tools - > Extensions and Updates...(for Visual Studio 2019 Extensions - > Manage Extensions)
* Open the Online tab on the left​
* Search for Telerik ASP.NET MVC VSExtensions
* Download and install the extensions

> If the article does not help solving your problem, please follow these steps to generate Visual Studio [ActivityLog](https://docs.microsoft.com/en-us/visualstudio/ide/reference/log-devenv-exe?view=vs-2019) file before contacting our support:
> * Open [Developer Command prompt](https://docs.microsoft.com/en-us/dotnet/framework/tools/developer-command-prompt-for-vs) for Visual Studio 20xx under **Administrative rights**.
> * Execute the command - devenv /log %userprofile%\desktop\ActivityLog.xml . This will start Visual Studio and create logs on your Desktop.
> * Reproduce the problem
> * Attach the **Activitylog** files when you contact our support.
