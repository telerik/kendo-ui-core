---
title: Configuring Existing Projects
page_title: Configuring Existing Projects
description: "Learn how to configure a Telerik UI for ASP.NET MVC application with Visual Studio."
slug: projectwizardconfig_visualstudio_aspnetmvc
position: 6
previous_url: /getting-started/vs-integration/configure-project-wizard
---

# Configuring Existing Projects

This article demonstrates how to use the **Project Configuration Wizard** provided by the Visual Studio Extensions for Progress&reg; Telerik&reg; UI for ASP.NET MVC. This workflow allows you to change settings like visual theme, use of CDN, localization, and right-to-left configuration in an already existing project.

To use the wizard, your project must be already [configured as a Telerik UI for ASP.NET MVC application]({%slug projectwizardcoversion_visualstudio_aspnetmvc%}) and be able to use the Telerik UI components.

## The Basics

The **Project Configuration Wizard** configures the visual theme and project settings of existing Telerik UI for ASP.NET MVC applications. To open the **Project Configuration Wizard** in Visual Studio 2019, select **Extensions** > **Telerik** > **Telerik UI for ASP.NET MVC** > **Configure Project**.

![Visual Studio 2019 Extensions menu](../vs-integration-mvc/images/configure_menu.png)

## Visual Themes

The first page of the **Project Configuration Wizard** enables you to change the visual theme of your Telerik UI for ASP.NET MVC application.

![Visual theme configuration page of the Project Configuration Wizard](../vs-integration-mvc/images/configure_theme.png)

Click **Next** to navigate to the next page.

## Project Settings

The second page of the **Project Configuration Wizard** enables you to modify the project settings by configuring the following options:

- **Render Right-To-Left**&mdash;updates the master page with the Right-to-left support class and adds CSS reference for RTL styles.
- **Copy Global Resources**&mdash;copies the localization files to `~/Scripts/kendo/{version}/cultures`.
- **Use CDN Support**&mdash;enables or disables the [Kendo UI CDN support](https://docs.telerik.com/kendo-ui/intro/installation/cdn-service).

![Project settings configuration page of the Project Configuration Wizard](../vs-integration-mvc/images/configure_settings.png)

## See Also

* [Integrating Visual Studio in Your .Net Project]({% slug overview_visualstudio_aspnetmvc %})
* [Downloading the Latest Telerik UI for ASP.NET Core Versions]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
