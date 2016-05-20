---
title: Project Wizard Upgrade
page_title: Project Wizard Upgrade | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to upgrade a Telerik UI for ASP.NET MVC application."
slug: projectwizardupgrade_visualstudio_aspnetmvc
position: 4
---

# Project Wizard Upgrade

This article demonstrates how to upgrade a Telerik UI for ASP.NET MVC application.

## Getting Started

### Launch the Wizard

To launch the Upgrade Wizard, go to the menu and click **Telerik** > **UI for ASP.NET MVC** > **Upgrade Wizard**.

**Figure 1. Launch the Upgrade Wizard**

![Choose projects](/aspnet-mvc/vs-integration/images/upgrade_menu.png)

The first screen of the Upgrade Wizard describes what will be upgraded.

**Figure 2. The warning page of the Upgrade Wizard**

![Upgrade wizard warning page](/aspnet-mvc/vs-integration/images/upgrade_warning.png)

In addition to the pure assembly reference change, the Upgrade Wizard provides important features, such as:
- Check and retrieve the latest available Telerik UI for ASP.NET MVC release.
- Change the version of Telerik UI for ASP.NET MVC in the projects the Solution uses.

### Choose Projects to Update

**Figure 3. Update project resources**

![update Project Resources](/aspnet-mvc/vs-integration/images/upgrade1.png)

The page allows you to configure the options, such as:

- **Version**&mdash;Select from all previously installed or downloaded versions using the Visual Studio Extensions.
- **Add referenced assemblies to solution**&mdash;Choose whether to copy referenced assemblies to your solution folder. The assemblies will automatically be added to the source control when using the Microsoft Team Foundation Server.
- **Download**&mdash;Launch the Latest Version Acquirer tool.
- **Browse**&mdash;Browse to a location where the new version is manually downloaded and extracted.
- **Choose Projects**&mdash;Choose which projects to be updated. It is recommended to keep all Telerik projects under the same version.

> **Important**
> * The distribution, downloaded by the Upgrade Wizard, contains only the `hotfix` files. For example, the bare bone files, needed for a project to run correctly. It does not contain the documentation or the demo project.
> * The listed projects use Telerik UI for ASP.NET MVC 4. If the solution contains projects which use Telerik UI for ASP.NET MVC for other MVC version, they are displayed on a separate page. When you complete the wizard, all selected projects from the different pages are updated.

### Update Project Resources

**Figure 4. The Update Project Resources page**

![Update Project Resources](/aspnet-mvc/vs-integration/images/upgrade2.png)

The Update Project Resources page allows you to Update the editor templates in `~/Views/Shared/EditorTemplates` by choosing **Update Editor Templates**.

### Create Backup

**Figure 5. The Create Backup page**

![Create Backup](/aspnet-mvc/vs-integration/images/upgrade3.png)

The **Create Backup** page allows you to:

- **Create a backup before converting**&mdash;Backup your project before upgrading it.
- **Backup location**&mdash;Specify the backup folder.
- **Show upgrade log when the Upgrade Wizard finishes the update**&mdash;Display the upgrade log after the Upgrade Wizard finishes.

## See Also

Other articles on Telerik UI for ASP.NET MVC Visual Studio integration:

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [New Project Wizards]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Project Wizard Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Project Wizard Conversion]({% slug projectwizardcoversion_visualstudio_aspnetmvc %})
* [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %})
* [Latest Version Retrieval]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
