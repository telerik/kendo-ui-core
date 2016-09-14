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

**Figure 2. Information page**

![Information page](/aspnet-mvc/vs-integration/images/upgrade_warning.png)

### Choose Projects to Update

On the next step the wizard lists all projects from the solution, which use Telerik UI for ASP.NET MVC. You can choose which projects will be updated (it is recommended to upgrade all projects to the chosen version) and the version which they will be upgraded to:

**Figure 3. Choose projects and distribution version**

![Choose projects and distribution version](/aspnet-mvc/vs-integration/images/upgrade_version.png)

> **Note**
>
> The listed projects target all of the supported MVC versions. When you complete the wizard all selected projects will be updated.

### Update Project Resources

**Figure 4. Update Project Resources page**

![Update Project Resources](/aspnet-mvc/vs-integration/images/upgrade_settings.png)

The Update Project Resources page allows you to Update the editor templates in `~/Views/Shared/EditorTemplates` by choosing **Update Editor Templates**.

### Create Backup

**Figure 5. Create Backup page**

![Create Backup](/aspnet-mvc/vs-integration/images/upgrade_backup.png)

The **Create Backup** page allows you to:

- **Create a backup before converting**&mdash;Backup your project before upgrading it.
- **Backup location**&mdash;Specify the backup folder.
- **Show upgrade log when the Upgrade Wizard finishes the update**&mdash;Display the upgrade log after the Upgrade Wizard finishes.

## See Also

Other articles on Telerik UI for ASP.NET MVC Visual Studio integration:

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [New Project Wizard]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Project Wizard Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Project Wizard Conversion]({% slug projectwizardcoversion_visualstudio_aspnetmvc %})
* [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %})
* [Latest Version Retrieval]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
