---
title: Create Projects
page_title: Create Projects | UI for ASP.NET Core Visual Studio Integration
description: "Learn how to create a new Telerik UI for ASP.NET Core application."
slug: newprojectwizards_visualstudio_aspnetcore
position: 2
---

# Create Projects

This article demonstrates how to create a new Telerik UI for ASP.NET Core application.

## Getting Started

### The Basics

New Telerik UI for ASP.NET Core applications are created by using the **Create New Project Wizard**.

To start the **Create New Project Wizard**, follow either of the approaches below.

**Approach 1**   

1. Go to the Telerik menu.   
2. Click **Telerik** > **UI for ASP.NET Core** > **Create New Telerik Project**.

**Approach 2**

1. Click **File** > **New** > **Project**.     
2. Navigate to the Telerik ASP.NET Core MVC project templates under **Telerik** > **Web**.

For convenience, the same project templates are located under the **Visual C#** > **Web** and **Visual C#** > **.NET Core** nodes.

The wizard detects all the installed versions of UI for ASP.NET Core and lists them in the **Version** combobox. This enables you to select a version you want to apply to your project.

**Figure 1. New Project Wizard**

![New Project Wizard](images/new-project-wizard-core.png)

### Project Settings

The **Create New Project** page enables you to modify the project settings by configuring the following options:

* **Project type**&mdash;Choose the desired project type: **Empty**, **Standard**, **Grid**, and **Menu**.
* **Version**&mdash;Choose the version of Telerik UI for ASP.NET Core you want to use.

### New ASP.NET Core Application Creation

After configuring the project settings, click **Finish** to start the creation of the new ASP.NET Core application.

As a result, the wizard:  
* Creates a new ASP.NET Core application.
* Copies all Kendo UI scripts.
* Copies all Kendo UI content files.
* Copies all Kendo UI editor templates.
* Adds a package reference to the `Telerik.UI.for.AspNet.Core` NuGet package.

## See Also

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetcore %})
* [Download New Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
