---
title: Upgrading Projects
page_title: Upgrading Projects
description: "Learn how to upgrade a Telerik UI for ASP.NET MVC application."
slug: projectwizardupgrade_visualstudio_aspnetmvc
position: 17
previous_url: /getting-started/vs-integration/upgrade-wizard, /vs-integration-mvc/upgrade-wizard
---

# Upgrading Projects

This article demonstrates how to upgrade a Progress&reg; Telerik&reg; UI for ASP.NET MVC application.

## The Basics

The Upgrade Project Wizard upgrades existing Telerik UI for ASP.NET MVC applications.

To open the wizard, click **Telerik** > **Telerik UI for ASP.NET MVC** > **Upgrade Wizard**.

![Launching the Upgrade Wizard and choosing projects](../vs-integration/images/images-mvc/upgrade_menu.png)

## Files for Upgrade

The **Information Page** of the Upgrade Project Wizard describes the files and assemblies that are going to be upgraded.

![Information page](../vs-integration/images/images-mvc/upgrade_warning.png)

## Projects for Upgrade

On the next page, the Wizard lists all projects from the solution that use Telerik UI for ASP.NET MVC. This enables you to choose the projects that will be updated and the version to which they will be upgraded.

It is recommended to upgrade all projects to the selected version. The Compatibility button will invoke the [Upgrade API Analyzer tool](https://docs.telerik.com/aspnet-mvc/vs-integration/upgrade-api-analyzer):

> The listed projects target all MVC versions that are supported. When you complete the Wizard, all selected projects will be updated.

![Choosing projects and distribution version](../vs-integration/images/images-mvc/upgrade_version.png)

## Project Resources for Upgrade

The **Upgrade Project Resources** page allows you to update the editor templates in `~/Views/Shared/EditorTemplates` by choosing **Update Editor Templates**.

![Updating project resources](../vs-integration/images/images-mvc/upgrade_settings.png)

## Backup Creation

The **Create Backup** page provides the following options:

- **Create a backup before upgarde**&mdash;Backs up your project before upgrading it. If selected, specify the backup folder in the field below the option.
- **Don't create a backup**&mdash;Upgrades without creating a backup of your application.
- **Show upgrade log when the Upgrade wizard finishes the upgrade**&mdash;Displays the upgrade log after the **Upgrade Wizard** finishes the upgrade.

![Creating backup](../vs-integration/images/images-mvc/upgrade_backup.png)

## See Also

* [Integrating Visual Studio in Your .Net Project]({% slug overview_visualstudio_aspnetcore %})
* [Downloading the Latest Telerik UI for ASP.NET MVC Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
