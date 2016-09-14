---
title: New Project Wizard
page_title: New Project Wizard | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to create a new Telerik UI for ASP.NET MVC application."
slug: newprojectwizards_visualstudio_aspnetmvc
position: 2
---

# New Project Wizard

This article demonstrates how to create a new Telerik UI for ASP.NET MVC application.

## Getting Started

### The Basics

The New Project wizard is used for the creation of a new Telerik UI for ASP.NET MVC application. You could start the New Project Wizard through the Telerik menu &mdash; **Telerik** > **UI for ASP.NET MVC** > **Create New Telerik Project** or by selecting **File** > **New** > **Project** and navigating to the Telerik ASP.NET MVC project templates under **Telerik** > **Web** node. For convenience the same project templates could be found under the **Visual C#** > **Web** and **Visual Basic** > **Web** nodes.

The wizard detects all the installed versions of UI for ASP.NET MVC and lists them in the Version combobox. You can select a version which you want to be applied to your project. The following options could be set into the Create new project wizard:

**Figure 1. New Project Wizard**

![New Project Wizard](/aspnet-mvc/vs-integration/images/new_project.png)

### Project Settings

The options on the **Project Settings** page enable you to modify the project-wise settings, such as:

* **Choose project type** &mdash; Choose what project type you want to create: **Empty**, **Standard**, **Grid** and **Menu**, **Mobile with Ajax Navigation**, or **Mobile with Server Navigation**.
* **Version** &mdash; Choose which version of Telerik UI for ASP.NET MVC to use.
* **Target ASP.NET MVC Version**&mdash;Choose the targeted ASP.NET MVC version.

### New Web Application Creation

When you click **Finish**, the creation of a new Kendo UI web application begins.

Then, the wizard:

* Creates a new ASP.NET MVC application.
* Copies all Kendo UI scripts, including the `vsdoc` script that enables the Visual Studio IntelliSense feature.
* Copies all Kendo UI content files.
* Copies all Kendo UI editor templates.
* (Optional) Copy the Kendo UI assembly to your solution folder - this option could be changed in the [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %}).
* Add reference to the `Kendo.Mvc` assembly.

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
