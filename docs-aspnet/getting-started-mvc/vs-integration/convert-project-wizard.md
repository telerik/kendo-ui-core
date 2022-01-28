---
title: Converting Projects
page_title: Converting Projects
description: "Learn how to convert an existing ASP.NET MVC application to a Telerik UI for ASP.NET MVC application."
slug: projectwizardcoversion_visualstudio_aspnetmvc
position: 5
permalink: /getting-started/vs-integration/convert-project-wizard
---

# Converting Projects

This article demonstrates how to convert an existing ASP.NET MVC application to a Progress&reg; Telerik&reg; UI for ASP.NET MVC application.

## The Basics

The **Convert Project Wizard** converts an existing ASP.NET MVC 4 or 5 to a Telerik UI for ASP.NET MVC application.

To start the **Convert Project Wizard**, click **Telerik** > **Telerik UI for ASP.NET MVC** > **Convert to Telerik Application**.

The conversion wizard provides the following steps:  
- [Distribution selection](#distribution-selection)
- [Theme selection](#theme-selection)
- [Project settings](#project-settings)

## Distribution Selection

The distribution selection allows you to choose the version of the Telerik UI for ASP.NET MVC you want to use.

![Distribution selection](../../getting-started-mvc/vs-integration/images/convert_distribution.png)

## Theme Selection

The theme selection allows you to choose the visual theme for your Telerik UI for ASP.NET MVC application.

![Theme selection](../../getting-started-mvc/vs-integration/images/convert_theme.png)

## Project Settings

The **Project Settings** page enables you to modify the project settings by configuring the following options:

- **Render Right-To-Left**&mdash;Updates the master page with the Right-to-left support class and adds CSS reference for RTL styles.
- **Copy Editor Templates**&mdash;Copies the predefined editor templates to `~/Views/Shared/EditorTemplates`. Existing editor templates will be overwritten.
- **Copy Global Resources**&mdash;Copies the localization files to `~/Scripts/kendo/{version}/cultures`.
- **Use CDN Support**&mdash;Enables or disables the [Kendo UI CDN support](https://docs.telerik.com/kendo-ui/intro/installation/cdn-service).

![Project settings](../../getting-started-mvc/vs-integration/images/convert_settings.png)

## Conversion of Existing Telerik MVC Extensions Projects

You can convert an existing Telerik MVC Extensions project by using the **Convert Project Wizard**. This adds the Kendo UI components to the project without removing the existing Telerik MVC Extensions content. For compatibility reasons, the Kendo UI Convert Wizard will attempt to disable the Telerik MVC Extensions embedded jQuery usage because it might interfere with the Kendo UI jQuery inclusion.

## See Also

* [Integrating Visual Studio in Your .Net Project]({% slug overview_visualstudio_aspnetmvc %})
* [Downloading the Latest Telerik UI for ASP.NET Core Versions]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
