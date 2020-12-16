---
title: Creating New Projects
page_title: Creating New Projects
description: "Learn how to create a new {{ site.product }} application."
previous_url: /getting-started/vs-integration/new-project-wizard
slug: newprojectwizards_visualstudio_aspnetcore
position: 2
---

# Creating New Projects

This article demonstrates how to create a new {{ site.product_long }} application by using the templates that come with the Telerik Extensions for Visual Studio.

## Getting Started

To create a new {{ site.product }} application, use the **Create New Project Wizard**. The wizard detects all installed versions of {{ site.product }} and lists them in the **Version** dropdown&mdash;this enables you to apply the desired version to your project.

To start the wizard, use either of the following approaches:

* Using the Visual Studio 2019 **Extensions** menu:

    1. Go to **Extentions** > **Telerik** >  **Telerik UI for ASP.NET Core**
    1. Go to the Telerik menu.
    1. Click **Create New Telerik Project**.

    ![Visual Studio Extensions menu](../../installation/vs-integration/images/create-project-core.png)

* Using the **Project** menu:

    1. Click **File** > **New** > **Project**.
    1. Type **Telerik** in the **Search for templates** textbox. Click on the **Telerik ASP.NET Core MVC Telerik Application**.

    ![New project Template](../../installation/vs-integration/images/new-project-template-core.png)

## Configurations

### Target Framework

The **Create New Project Wizard** allows you to select a target **Framework**. 

>Note
> 
>If the target **Framework** dropdown is disabled check the troubleshooting [section]({% slug troubleshooting_visualstudio_aspnetcore%}#the-target-framework-dropdown-is-disabled).

![The Create New Project Wizard](../../installation/vs-integration/images/target-dropdown.png)

### .NET Core version

Click on the desired **{{ site.framework }}** version.

![The ASP.NET version options](../../installation/vs-integration/images/core-version.png)

### Helper Selection

You can choose if you want the template project to use [HTMLHelpers]({% slug knownissues_aspnetmvc6_aspnetmvc %}) or [TagHelpers]({% slug taghelpers_aspnetmvc6_aspnetmvc %}) in its Views.
In this article, we use the **Tag** option.

![The HTML/Tag helper options](../../installation/vs-integration/images/tag-html-dropdown.png)

### {{ site.product_short}} version

The Project wizard allows you to select the desired version of {{ site.product_short }}. If there is a newer version available that is not downloaded on the machine, you can obtain it without exiting the wizard.

![{{site.product_short}} version options](../../installation/vs-integration/images/telerik-version.png)

### Available Templates

The following project templates are available:

![{{site.product_short}} templates options](../../installation/vs-integration/images/new-project-wizard-core.png)

<table>
    <colgroup>
        <col width="25%"></col>
        <col></col>
    </colgroup>
    <tbody>
        <tr>
            <th >Project</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><strong>Blank</strong></td>
            <td>The Blank template has the package references and the client-side resources loaded in the view. It also features the expected JSON serialization configuration in the <code>Startup.cs</code> file. 
The Kendo Editor templates are included in the <code>~Views\Shared\EditorTemplates folder</code>.</td>
        </tr>
        <tr>
            <td><strong>Standard</strong></td>
            <td><p>The Standard template features:</p>
                <ul>
                    <li> Everything from the <strong>Blank Project<strong></li>
                    <li> Responsive Panel and Menu in  <code>_Layout.cshtml</code> </li>
                    <li> PanelBar in <code>Index.cshtml</code></li>
                    <li> TabStrip in <code>Contact.cshtml</code></li>
                    <li> HTML styled with Cards CSS in <code>About.cshtml</code></li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><strong>Grid and Menu</strong></td>
            <td><p>The Grid and Menu template features:</p>
                <ul>
                    <li> Everything from the <strong>Blank Project</strong></li>
                    <li> Buttons and Grid in <code>Index.cshtml</code> </li>
                    <li> Responsive Panel and Menu in <code>_Layout.cshtml</code></li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><strong>Grid Razor Pages</strong></td>
            <td>The Grid Razor Pages template includes everything from the <strong>Blank Project</strong>.
It features an editable grid in <code>Index.cshtml</code> that uses handlers to obtain and manipulate its data. It shows how to send the Anti-forgery Tokens as well.</td>
        </tr>
        <tr>
            <td><strong>Dashboard</strong></td>
            <td><p>The Dashboard template features:</p>
                <ul>
                    <li> Everything from the <strong>Blank Project</strong> except the editor templates.</li>
                    <li> A TileLayout with Charts and Grids in <code>Index.cshtml</code> as well as a Shared DataSource and dynamicaly populated templates</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Themes

The **Select Theme** option allows you to preview all of the available LESS and SASS themes and select the desired one. After the selection is made, the project will include only the files that are required by the selected theme in the `_Layout.cshtml`.

![Project Wizard Select Theme](../../installation/vs-integration/images/select-theme-core.png)

## Creating the Application

After configuring the settings of the project, click **Finish** to start creating the new ASP.NET Core application.

As a result, the wizard:

* Creates a new {{ site.framework }} application.
* Adds CDN references for the Kendo UI styles and scripts to the `Layout` file of the project.
* Copies all Kendo UI editor templates.
* Adds a package reference to the `Telerik.UI.for.AspNet.Core` NuGet package.

The wizard creates a `Templates` folder in the root of the application. By default, the `Templates` folder is not visible and is not included in the project. To display it, select the **Show All Files** button in the **Solution Explorer** of Visual Studio.  

## See Also

* [Converting Existing Projects with Visual Studio]({% slug convertprojectwizard_visualstudio_aspnetcore %})
* [Integrating Visual Studio in Your .Net Project (Overview)]({% slug overview_visualstudio_aspnetcore %})
* [Downloading the Latest {{ site.product }} Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
