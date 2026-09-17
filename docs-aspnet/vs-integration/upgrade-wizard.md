---
title: Upgrading Projects
page_title: Upgrading Projects
description: "Learn how to upgrade a {{ site.product }} application."
components: ["installerandvsextensions"]
slug: projectwizardupgrade_visualstudio_aspnetmvc
position: 17
previous_url: /getting-started/vs-integration/upgrade-wizard, /vs-integration-mvc/upgrade-wizard
---

# Upgrading {{ site.product }} Projects

This article demonstrates how to upgrade a Progress&reg; Telerik&reg; {{ site.product_short }} application.

## The Basics

The Upgrade Project Wizard upgrades existing {{ site.product }} applications.

To open the wizard, click **Extensions** > **Telerik** > **{{ site.product }}** > **Upgrade Wizard**.

{% if site.core %}
![{{ site.product_short }} Launching the Upgrade Wizard and choosing projects](../vs-integration/images/images-core/upgrade_menu.png)
{% else %}
![{{ site.product_short }} Launching the Upgrade Wizard and choosing projects](../vs-integration/images/images-mvc/upgrade_menu.png)
{% endif %}

## Files for Upgrade

The **Information Page** of the Upgrade Project Wizard describes the files and assemblies that are going to be upgraded.

{% if site.core %}
![{{ site.product_short }} Upgrade Wizard Information page](../vs-integration/images/images-core/upgrade-step-1.png)
{% else %}
![{{ site.product_short }} Upgrade Wizard Information page](../installation/images/upgrade-step-1.png)
{% endif %}

## Projects for Upgrade

On the next page, the Wizard lists all projects from the solution that use {{ site.product }}. This enables you to choose the projects that will be updated and the version to which they will be upgraded. You can select the new version from the locally installed distributions or the ones available on the NuGet feed. It is recommended to upgrade all projects to the selected version. 

{% if site.mvc %} 
The Compatibility button will invoke the [Upgrade API Analyzer tool](https://docs.telerik.com/aspnet-mvc/vs-integration/upgrade-api-analyzer):

> The listed projects target all MVC versions that are supported. When you complete the Wizard, all selected projects will be updated.
{% endif %}

{% if site.core %}
![{{ site.product_short }} Choosing projects and distribution version](../vs-integration/images/images-core/upgrade-step-2.png)
{% else %}
![{{ site.product_short }} Choosing projects and distribution version](../installation/images/upgrade-step-2.png)
{% endif %}

When you select **Remote NuGet feed**, the Upgrade Project Wizard uses the Telerik NuGet feed configured for your Visual Studio environment. The wizard does not document a separate login page or another location choice for signing in. Before opening the wizard, [configure the Telerik NuGet feed](../installation/installation-options/nuget-install.md) and authenticate with your Telerik NuGet API key. If the version list is unavailable, [verify your NuGet credentials and package access](../troubleshoot/troubleshooting-nuget.md#verify-nuget-credentials-and-package-access).

{% if site.mvc %}

## Project Resources for Upgrade

The **Upgrade Project Resources** page allows you to update the editor templates in `~/Views/Shared/EditorTemplates` by choosing **Update Editor Templates**.

![{{ site.product_short }} Updating project resources](../installation/images/upgrade-step-3.png)

{% endif %}

## Backup Creation

The **Create Backup** page provides the following options:

- **Create a backup before upgarde**&mdash;Backs up your project before upgrading it. If selected, specify the backup folder in the field below the option.
- **Don't create a backup**&mdash;Upgrades without creating a backup of your application.
- **Show upgrade log when the Upgrade wizard finishes the upgrade**&mdash;Displays the upgrade log after the **Upgrade Wizard** finishes the upgrade.


{% if site.core %}
![{{ site.product_short }} Creating backup](../vs-integration/images/images-core/upgrade-step-4.png)
{% else %}
![{{ site.product_short }} Creating backup](../installation/images/upgrade-step-4.png)
{% endif %}



## See Also

* [Integrating Visual Studio in Your .Net Project]({% slug overview_visualstudio_aspnetcore %})
* [Downloading the Latest {{ site.product }} Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
