---
title: Project Wizard Conversion
page_title: Project Wizard Conversion | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to convert an existing ASP.NET MVC application to a Telerik UI for ASP.NET MVC application."
slug: projectwizardcoversion_visualstudio_aspnetmvc
position: 5
---

# Project Wizard Conversion

This article demonstrates how to convert an existing ASP.NET MVC application to a Telerik UI for ASP.NET MVC application.

## Getting Started

### The Basics

The **Convert Project Wizard** converts an existing ASP.NET MVC 4 or 5 to a Telerik UI for ASP.NET MVC application. To start the wizard, click **Telerik** > **UI for ASP.NET MVC** > **Convert to Telerik Application**.

The conversion wizard has three steps:
- Distribution selection
- Theme selection
- Project settings

### Distribution selection

Choose which version of Telerik UI for ASP.NET MVC to use.

**Figure 1. Distribution selection**

![Distribution selection](/aspnet-mvc/vs-integration/images/convert_distribution.png)

### Theme selection

Select visual theme for your Telerik UI for ASP.NET MVC application. 

**Figure 2. Theme selection**

![Theme selection](/aspnet-mvc/vs-integration/images/convert_theme.png)

### Project settings

The project settings page allows you to modify the project-wise settings, such as:

- **Render Right-To-Left** &mdash; Update Master page with Right-to-left support class and add css reference for rtl styles.
- **Copy Editor Templates** &mdash; Copy the predefined editor templates to `~/Views/Shared/EditorTemplates`. Existing editor templates will be overwritten.
- **Copy Global Resources** &mdash; Copy the localization files to `~/Scripts/kendo/{version}/cultures`.
- **Use CDN Support** &mdash; Enable or disable Kendo UI [CDN]({% slug kendoui_cdn_services_installation %}) support.

**Figure 3. Project settings**

![Project settings](/aspnet-mvc/vs-integration/images/convert_settings.png)

### Existing Telerik MVC Extensions Project Conversion

If you have an existing Telerik MVC Extensions project, you can convert it to Kendo UI project with the aid of the Convert Wizard. This will add the Kendo UI components to the project without removing the existing Telerik MVC Extensions content. For compatibility reasons, the Kendo UI Convert Wizard will attempt to disable the Telerik MVC Extensions embedded jQuery usage because it might interfere with the Kendo UI jQuery inclusion.

## See Also

Other articles on Telerik UI for ASP.NET MVC Visual Studio integration:

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [New Project Wizard]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Project Wizard Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Project Wizard Upgrade]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})
* [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %})
* [Latest Version Retrieval]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
