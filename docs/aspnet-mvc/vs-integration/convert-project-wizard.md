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

The **Convert Project Wizard** converts an existing ASP.NET MVC 3, 4, or 5 to a Telerik UI for ASP.NET MVC application. To start the wizard, click **Telerik** > **UI for ASP.NET MVC** > **Convert to Telerik Application**.

The conversion wizard has two steps:
- Project settings
- Master pages settings

### Project Settings

**Figure 1. The project settings**

![Project Settings](/aspnet-mvc/vs-integration/images/convert.png)

The project settings page allows you to modify the project-wise settings, such as:

- **Version**&mdash;Choose which version of Telerik UI for ASP.NET MVC to use.
- **Add referenced assemblies to solution**&mdash;Choose whether to copy referenced assemblies to your solution folder. The assemblies will automatically be added to the source control when using the Microsoft Team Foundation Server.
- **Copy Editor Templates**&mdash;Copy the predefined editor templates to `~/Views/Shared/EditorTemplates`. Existing editor templates will be overwritten.
- **Use CDN Support**&mdash;Enable or disable Kendo UI [CDN]({% slug kendoui_cdn_services_installation %}) support.
- **Copy Global Resources**&mdash;Copy the localization files to `~/Scripts/kendo/{version}/cultures`.

### Master Settings

The Master Settings page enables you to choose whether you want to apply the selected settings to both your layout and master page, or to just one of them. Choose the visual theme for your Telerik UI for ASP.NET MVC application from **Theme**.

**Figure 2. The master page settings**

![update Project Resources](/aspnet-mvc/vs-integration/images/convert2.png)

If you have neither a master nor a layout page, you can add one, as shown in **Figure 3**.

**Figure 3. Master page settings without a master page**

![No Master Page](/aspnet-mvc/vs-integration/images/no_master_page.png)

The wizard enables you to create a new master or layout page so that users can set the Master Page settings. Depending on the selected view engine, the wizard creates a master page for WebForms or layout page for Razor.

### Existing Telerik MVC Extensions Project Conversion

If you have an existing Telerik MVC Extensions project, you can convert it to Kendo UI project with the aid of the Convert Wizard. This will add the Kendo UI components to the project without removing the existing Telerik MVC Extensions content. For compatibility reasons, the Kendo UI Convert Wizard will attempt to disable the Telerik MVC Extensions embedded jQuery usage because it might interfere with the Kendo UI jQuery inclusion.

## See Also

Other articles on Telerik UI for ASP.NET MVC Visual Studio integration:

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [New Project Wizards]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Project Wizard Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Project Wizard Upgrade]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})
* [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %})
* [Latest Version Retrieval]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
