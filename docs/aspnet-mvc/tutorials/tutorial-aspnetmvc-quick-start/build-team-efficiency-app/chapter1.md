---
title: Getting Up and Running
page_title: Getting Up and Running | Team Efficiency Dashboard Tutorial
description: "Start a new project, add Telerik UI for MVC to it, and install the quick start boilerplate while building the Team Efficiency Dashboard application by using Telerik UI for ASP.NET MVC."
slug: gettingupandrunning_timeefficiencyapp_aspnetmvc6
position: 2
---

# Getting Up and Running

In this chapter you are going to start with the basics, including starting a new project, adding Telerik UI for MVC to your project, and installing the quick start boilerplate.

## Create a New MVC Project

### Overview

UI for ASP.NET MVC can easily be added to an existing ASP.NET MVC project using VisualStudio in just a few clicks. Start by creating a new ASP.NET MVC project. You will use this project throughout the rest of this tutorial to build your application.

### Exercise: Create a New MVC Project

**Step 1** Click **File** > **New Project**.

**Step 2** In the **New Project** dialog, choose the **ASP.NET Web Application** template by expanding the **Templates** tree to **Templates** > **Visual C#** > **Web**.

![](../images/chapter1/file-new-mvc-project.jpg)

**Step 3** Give the application a name, for example, **MyQuickStartApp**. Click **OK** to continue.

**Step 4** In the **New ASP.NET Project** dialog, choose **MVC** from the 4.6 template selection.

![](../images/chapter1/file-new-mvc-project2.jpg)

**Step 5** Click **OK** to finish.

## Install the Quick Start Boilerplate

### Overview

With the new project created, it is time to start building your app. For this guide, we have scaffolded out a boilerplate project to act as a starting point for the Team Efficiency Dashboard application.

The boilerplate has an HTML page, a layout, the Northwind database, and some server-side code you may find in a typical MVC project.

### Exercise: Install the Quick Start Boilerplate

**Step 1** Using the package manager console, run the command below.

###### Example

    PM> Install-Package KendoQsBoilerplate

Alternatively, you can use the GUI package manager.

**Step 2** From the Solution Explorer, right-click **References**, then choose **Manage NuGet Packages**.

![](../images/chapter1/nuget-gui.jpg)

**Step 3** Search for **KendoQsBoilerplate**.

![](../images/chapter1/nuget-gui2.jpg)

**Step 4** Click **Install** to continue.

**Step 5** When the package installs, you may be prompted to accept a license agreement for the NorthwindDB. Click **I Accept** to continue.

**Step 6** It is normal for the quick start boilerplate to overwrite existing files. When prompted with a file conflict, choose **Yes to All**.

![](../images/chapter1/file-conflict.jpg)

**Step 7** With the boilerplate installed, take a moment to run the application. If all went well, you should see something similar to what is shown below.

![](../images/chapter1/wire-frame.jpg)

## Convert to Telerik Applications

### Overview

At this point, you have the wire frame for a basic MVC application. Next, you will be adding the UI for ASP.NET MVC to the application by using the **Convert to Telerik Application** tooling. When an application is converted to a Telerik application, all required HTML, CSS, JavaScript and `.DLL` libraries are added. This is the first step you would take to upgrade a new or existing MVC project to use Telerik UI for ASP.NET MVC.

### Exercise: Convert to a Telerik Application

**Step 1** Stop the application if it is already running.

**Step 2** In the Solution Explorer, right-click the project name and select **Telerik UI for ASP.NET MVC** > **Convert to Telerik Application**. This will launch the **Project Configuration** wizard. From here you can choose settings for your Telerik project.

![](../images/chapter1/convert-to-telerik1.jpg)

**Step 3** For this tutorial your project will use CDN support. This means that all Kendo UI resources are served from Telerik content delivery network (CDN) versus relying on your server for the assets. Mark the box **Use CDN support** and click **Next** to continue.

![](../images/chapter1/convert-to-telerik2.jpg)

**Step 4** Since the boilerplate is designed with [Bootstrap](http://getbootstrap.com), choose **Bootstrap** from themes select box so the theme matches the current look of the boilerplate. You'll change the theme later when you're ready to customize the look of the application.

![](../images/chapter1/convert-to-telerik3.jpg)

**Step 5** Open `\Views\Shared\_Layout.cshtml`. Find and remove the `@Scripts.Render("~/bundles/modernizr")` script bundle. This script is included with the Kendo UI assets.

**Step 6** Next, find the CSS `@Styles.Render("~/Content/css")` bundle and move it just above the closing head tag `</head>`. This will ensure that the custom styles are applied when you customize the application.

**Step 7** The final code of the head section should look like the one shown in the example below.

###### Example

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>@ViewBag.Title - UI for MVC / Kendo Quick Start Guide</title>

        <link href="http://cdn.kendostatic.com/2015.3.1111/styles/kendo.common-bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="http://cdn.kendostatic.com/2015.3.1111/styles/kendo.mobile.all.min.css" rel="stylesheet" type="text/css" />
        <link href="http://cdn.kendostatic.com/2015.3.1111/styles/kendo.dataviz.min.css" rel="stylesheet" type="text/css" />
        <link href="http://cdn.kendostatic.com/2015.3.1111/styles/kendo.bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="http://cdn.kendostatic.com/2015.3.1111/styles/kendo.dataviz.bootstrap.min.css" rel="stylesheet" type="text/css" />
        <script src="http://cdn.kendostatic.com/2015.3.1111/js/jquery.min.js"></script>
        <script src="http://cdn.kendostatic.com/2015.3.1111/js/jszip.min.js"></script>
        <script src="http://cdn.kendostatic.com/2015.3.1111/js/kendo.all.min.js"></script>
        <script src="http://cdn.kendostatic.com/2015.3.1111/js/kendo.aspnetmvc.min.js"></script>
        <script src="@Url.Content("~/Scripts/kendo.modernizr.custom.js")"></script>
        @Styles.Render("~/Content/css")

> **Tip**
>
> Because the **Convert to Telerik application**, **Upgrade Project**, or **Configure Project** wizards modify the `_Layout.cshtml` file, make sure you check the position of the custom CSS declarations afterward.        

Now that your app is ready for development. Let's add some simple input components to create a nice user experience.

## See Also

Other UI for ASP.NET MVC Quick Start Guide chapters on how to build the Team Efficiency Dashboard application:

* [Input Controls]({% slug inputcontrols_timeefficiencyapp_aspnetmvc6 %})
* [Scaffolding]({% slug scaffolding_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Grid]({% slug kendouigrid_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI ListView]({% slug kendouilistview_timeefficiencyapp_aspnetmvc6 %})
* [Manage the Client Side]({% slug clientside_timeefficiencyapp_aspnetmvc6 %})
* [Handle the Kendo UI Datasource]({% slug kendouidatasource_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Charts]({% slug kendouicharts_timeefficiencyapp_aspnetmvc6 %})
* [Make the Application Responsive]({% slug goresponsive_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Themes]({% slug kendouithemes_timeefficiencyapp_aspnetmvc6 %})
