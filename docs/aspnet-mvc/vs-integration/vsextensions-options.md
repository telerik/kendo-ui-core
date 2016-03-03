---
title: Visual Studio Extensions Options
page_title: Visual Studio Extensions Options | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to use the settings Visual Studio provides that allow you to configure the Telerik UI for ASP.NET MVC Visual Studio Extensions to best suit your needs."
slug: vsextensionsoptions_visualstudio_aspnetmvc
position: 5
---

# Visual Studio Extensions Options

The Visual Studio Extensions options dialog provides settings, allowing you to configure the Telerik UI for ASP.NET MVC Visual Studio Extensions to best suit тхе  needs of your projects.

It can be accessed by clicking on **Telerik** > **VSExtensions Options**.

**Figure 1. The Options menu**

![Options menu](/aspnet-mvc/vs-integration/images/options_menu.png)

The Options dialog contains two sets of options that affect the Telerik UI for ASP.NET MVC Visual Studio Extensions.

## General Settings

The settings under the General category affect all of the installed Telerik Visual Studio Extensions.

**Figure 2. The General Settings Options dialog**

![Options Dialog](/aspnet-mvc/vs-integration/images/options.png)

### Project Setup

Set the default value for the **Add referenced assemblies to solution** option in the Project Configuration Wizard through **Add referenced assemblies to solution and source control**.

### Project Upgrade Notifications

Set the project upgrade notifications for detected local distributions by using the options under the **Project Upgrade Notifications for Detected Local Distributions**:

- **Suggest project upgrades for Telerik product version available on my computer**&mdash;When enabled, you are prompted to upgrade upon opening a project, which is not using the latest version of Telerik products installed on your system.
- **Suggest upgrades when an equal Dev release detected on projects using a Trial**&mdash;When enabled, you are prompted to upgrade if a licensed version is available on your system, but the current project uses a trial version.

### Other Notifications

- **Notify me when a Telerik subscription I have is about to expire**&mdash;When enabled, you receive reminders if any of your subscriptions expire within the next month.

> **Important**
>
> You benefit from subscription reminders only if you saved your credentials in the Latest Version Acquirer tool.

### Download Folder Selection

- **Select a folder for downloads**&mdash;Configures the path where the extensions look for and store distributions.

> **Important**
>
> Changing the folder path does not move existing folder contents from your previous path. Move your previous folder contents manually if you still want to use them.

## Telerik UI for ASP.NET MVC Settings

All settings under the Kendo UI category affect only the Telerik UI for ASP.NET MVC Visual Studio Extensions.

**Figure 3. The Telerik UI for ASP.NET MVC Settings dialog**

![Options Dialog](/aspnet-mvc/vs-integration/images/options_kendo.png)

### Latest Version Retrieval

- **Include internal builds in Latest Version update and retrieval**&mdash;When enabled, the Latest Version Acquirer tool retrieves internal builds as well as official releases when checking for a new version.

### Notifications

- **Show me message when a newer version is available on www.telerik.com**&mdash;When enabled, you receive notifications if a new version of Telerik UI for ASP.NET MVC is available on the Telerik website.

## See Also

Other articles on Telerik UI for ASP.NET MVC Visual Studio integration:

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [New Project Wizards]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Project Wizard Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Project Wizard Upgrade]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})
* [Project Wizard Conversion]({% slug projectwizardcoversion_visualstudio_aspnetmvc %})
* [Latest Version Retrieval]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
