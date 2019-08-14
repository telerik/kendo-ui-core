---
title: Creating New Projects
page_title: Creating New Projects | Visual Studio Integration | Telerik UI for ASP.NET Core
description: "Learn how to create a new Progress&reg; Telerik&reg; UI for ASP.NET Core application."
slug: newprojectwizards_visualstudio_aspnetcore
position: 2
---

# Creating New Projects

This article demonstrates how to create a new Progress&reg; Telerik&reg; UI for ASP.NET Core application.

## Getting Started

To create a new Telerik UI for ASP.NET Core application, use the **Create New Project Wizard**. The wizard detects all installed versions of Telerik UI for ASP.NET Core and lists them in the **Version** combobox&mdash;this enables you to apply the desired version to your project.

To start the wizard, use either of the following approaches:

* Using the Telerik menu:

    1. Go to the Telerik menu.
    1. Click **Telerik** > **Telerik UI for ASP.NET Core** > **Create New Telerik Project**.

* Using the **Project** menu:

    1. Click **File** > **New** > **Project**.
    1. Under **Telerik** > **Web**, navigate to the Telerik ASP.NET MVC Core project templates. For convenience, the same project templates are located under the **Visual C#** > **Web** and **Visual C#** > **.NET Core** nodes.

As of the 2018 R2 release, the **Create New Project Wizard** in Visual Studio 2017 allows you to select a **Target Framework**. To enable the **Target Framework** dropdown:

1. Install .Net Framework version 4.6.2.
1. Check the .Net version in the list of Individual components. To open Visual Studio Installer, go to **Tools** > **Get Tools and Features**. In Visual Studio Installer, select the **Individual components** tab and check the .NET Framework 4.6.2 targeting pack and .NET Framework 4.6.2 SDK.

    ![The Create New Project Wizard](images/new-project-wizard-core.png)

## Setting Up the Project

You can modify the settings of the project by configuring the options on the **Create New Project** page.

* The **Project type** options allows you to select the desired project type (**Blank**, **Standard**, or **Grid and Menu**).
* The **Version** option allows you to select the desired version of Telerik UI for ASP.NET Core.

## Creating the Application

After configuring the settings of the project, click **Finish** to start creating the new ASP.NET Core application.

As a result, the wizard:

* Creates a new ASP.NET Core application.
* Adds CDN references for the Kendo UI styles and scripts to the `Layout` file of the project.
* Copies all Kendo UI editor templates.
* Adds a package reference to the `Telerik.UI.for.AspNet.Core` NuGet package.

As of the 2019 R1 release, the wizard creates a `Templates` folder in the root of the application. By default, the `Templates` folder is not visible and is not included in the project. To display it, select the **Show All Files** button in the **Solution Explorer** of Visual Studio.  

## See Also

* [Integrating Visual Studio in Your .Net Project (Overview)]({% slug overview_visualstudio_aspnetcore %})
* [Downloading the Latest Telerik UI for ASP.NET Core Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
