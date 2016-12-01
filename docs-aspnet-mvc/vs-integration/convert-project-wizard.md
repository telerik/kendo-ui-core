---
title: Convert Projects
page_title: Convert Projects | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to convert an existing ASP.NET MVC application to a Telerik UI for ASP.NET MVC application."
slug: projectwizardcoversion_visualstudio_aspnetmvc
position: 5
---

# Convert Projects

This article demonstrates how to convert an existing ASP.NET MVC application to a Telerik UI for ASP.NET MVC application.

## Getting Started

### The Basics

The **Convert Project Wizard** converts an existing ASP.NET MVC 4 or 5 to a Telerik UI for ASP.NET MVC application.

To start the **Convert Project Wizard**, click **Telerik** > **UI for ASP.NET MVC** > **Convert to Telerik Application**.

The conversion wizard has three steps:  
- [Distribution selection](#distribution-selection)
- [Theme selection](#theme-selection)
- [Project settings](#project-settings)

### Distribution Selection

The distribution selection lets you choose the version of the Telerik UI for ASP.NET MVC you want to use.

**Figure 1. Distribution selection**

![Distribution selection](/vs-integration/images/convert_distribution.png)

### Theme Selection

The theme selection lets you choose the visual theme for your Telerik UI for ASP.NET MVC application.

**Figure 2. Theme selection**

![Theme selection](/vs-integration/images/convert_theme.png)

### Project Settings

The **Project Settings** page enables you to modify the project settings by configuring the following options:

- **Render Right-To-Left**&mdash;Updates the master page with the Right-to-left support class and adds CSS reference for RTL styles.
- **Copy Editor Templates**&mdash;Copies the predefined editor templates to `~/Views/Shared/EditorTemplates`. Existing editor templates will be overwritten.
- **Copy Global Resources**&mdash;Copies the localization files to `~/Scripts/kendo/{version}/cultures`.
- **Use CDN Support**&mdash;Enables or disables the [Kendo UI CDN support](http://docs.telerik.com/kendo-ui/intro/installation/cdn-service).

**Figure 3. Project settings**

![Project settings](/vs-integration/images/convert_settings.png)

### Conversion of Existing Telerik MVC Extensions Projects

It is possible to convert an existing Telerik MVC Extensions project by using the **Convert Project Wizard**. This adds the Kendo UI components to the project without removing the existing Telerik MVC Extensions content. For compatibility reasons, the Kendo UI Convert Wizard will attempt to disable the Telerik MVC Extensions embedded jQuery usage because it might interfere with the Kendo UI jQuery inclusion.

## See Also

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [Create Projects]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Configure Projects]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Upgrade Projects]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})
* [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %})
* [Download New Versions]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
