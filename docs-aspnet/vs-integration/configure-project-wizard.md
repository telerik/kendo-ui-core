---
title: Configuring Existing Projects
page_title: Configuring Existing Projects
description: "Learn how to configure a Telerik UI for ASP.NET CORE application with Visual Studio."
previous_url: /installation/vs-integration/configure-project-wizard
slug: projectwizardconfig_visualstudio_aspnetcore
position: 4
---

# Configuring Existing Projects

This article demonstrates how to configure an existing {{ site.product }} application by using the **Project Configuration Wizard**. The wizard comes with the {{ site.product }} VS extension and helps you to modify settings like visual theme, use of CDN, localization, and right-to-left configuration in an already existing project.

To open the **Project Configuration Wizard**, click **Extensions** > **Telerik** > **Telerik UI for ASP.NET Core** > **Configure Project**.

![Visual Studio 2019 Extensions menu](../vs-integration/images/configure-project-core.png)

The configuration wizard handles the following tasks:  
- [Theme selection](#theme-selection)
- [Project settings configuration](#project-settings)

## Theme Selection

The **Theme Selection** page enables you to change the [visual theme](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#getting-started) of your {{ site.product }} application.

![Visual theme configuration page of the Project Configuration Wizard](../vs-integration/images/configure_theme.png)

After selecting the desired theme, click **Next** to navigate to the [Project settings](#project-settings) page.

## Project Settings

The **Project Settings** page allows you to modify the project settings by configuring the following options:

- **Render Right-To-Left**&mdash;Updates the master page with the right-to-left (RTL) support class and adds a CSS reference for RTL styles.
- **Copy Global Resources**&mdash;Copies the localization files to `~/Scripts/kendo/{version}/cultures`.
- **Use CDN Support**&mdash;Enables or disables the [Kendo UI CDN support](https://docs.telerik.com/kendo-ui/intro/installation/cdn-service).

![Project settings configuration page of the Project Configuration Wizard](../vs-integration/images/configure_settings.png)

## See Also

* [Integrating Visual Studio in Your .Net Project]({% slug overview_visualstudio_aspnetcore %})
* [Downloading the Latest {{ site.product }} Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
