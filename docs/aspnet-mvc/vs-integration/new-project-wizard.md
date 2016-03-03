---
title: New Project Wizards
page_title: New Project Wizards | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to create a new Telerik UI for ASP.NET MVC application."
slug: newprojectwizards_visualstudio_aspnetmvc
position: 2
---

# New Project Wizard

This article demonstrates how to create a new Telerik UI for ASP.NET MVC application.

## Getting Started

### The Basics

The New Project wizard is used for the creation of a new Telerik UI for ASP.NET MVC application&mdash;**Telerik** > **UI for ASP.NET MVC** > **Create New Telerik Project**.

The wizard consists of two steps:

* Users specify project-wide settings.
* Users configure the data-access layer.

**Figure 1. A new project wizard**

![New Project Wizard](/aspnet-mvc/vs-integration/images/new1.png)

### Project Settings

The options on the **Project Settings** page enable you to modify the project-wise settings, such as:

* **Choose project type**&mdash;Choose what project type you want to create: **Empty**, **Standard**, **Grid** and **Menu**, **Mobile with Ajax Navigation**, or **Mobile with Server Navigation**.
* **Version**&mdash;Choose which version of Telerik UI for ASP.NET MVC to use.
* **Add referenced assemblies to solution**&mdash;Choose whether to copy referenced assemblies to your solution folder. The assemblies will automatically be added to the source control when using the Microsoft Team Foundation Server.
* **Target ASP.NET MVC Version**&mdash;Choose the targeted ASP.NET MVC version.
* **View Engine**&mdash;Choose between Razor and WebForms.
* **Theme**&mdash;Choose the visual theme for your Telerik UI for ASP.NET MVC application.
* **Copy Editor Templates**&mdash;Copy the predefined editor templates to `~/Views/Shared/EditorTemplates`.
* **Use CDN Support**&mdash;Enable or disable Kendo UI [CDN]({% slug kendoui_cdn_services_installation %}) support.
* **Copy Global Resources**&mdash;Copy the localization files to `~/Scripts/kendo/{version}/cultures`.
* **Add Test Project**&mdash;Choose whether to add a test project to the solution.

### New Web Application Creation

When you click **Finish**, the creation of a new Kendo UI web application begins.

Then, the wizard:

* Creates a new ASP.NET MVC application.
* Copies all Kendo UI scripts, including the `vsdoc` script that enables the Visual Studio IntelliSense feature, if the CDN support is disabled.
* Copies all Kendo UI content files, if the CDN support is disabled
* (Optional) Copies all Kendo UI global resources.
* (Optional) Copies all Kendo UI editor templates.
* (Optional) Copy the Kendo UI assembly to your solution folder.
* Add reference to the `Kendo.Mvc` assembly.
* Apply the pre-selected theme.
* (Optional) Creates a test project.

### Modernize Inclusion

The Kendo UI ASP.NET MVC application includes a custom stripped-down Modernizr in a file called `kendo.modernizr.custom.js`. Its goal is to provide an HTML5 element support for old browsers, specifically Internet Explorer. If you need the Modernizr in your application, you may want to remove the existing Modernizr and register another version which includes more components and features. In this case, if an HTML5 element support is required, make sure that the newly registered Modernizr [provides such a support](http://modernizr.com/docs/#html5inie) by including the `html5shiv` component.

## See Also

Other articles on Telerik UI for ASP.NET MVC Visual Studio integration:

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [Project Wizard Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Project Wizard Upgrade]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})
* [Project Wizard Conversion]({% slug projectwizardcoversion_visualstudio_aspnetmvc %})
* [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %})
* [Latest Version Retrieval]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
