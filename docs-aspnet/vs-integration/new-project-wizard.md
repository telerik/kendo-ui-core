---
title: Creating New Projects
page_title: Creating New Projects
description: "Learn how to create a new {{ site.product }} application."
previous_url: /getting-started/vs-integration/new-project-wizard, /installation/vs-integration/new-project-wizard, /vs-integration-mvc/new-project-wizard
slug: newprojectwizards_visualstudio_aspnetcore
position: 5
---

# Creating New {{ site.product }} Projects

This article demonstrates how to create a new {{ site.product }} application by using the templates that come with the Telerik Extensions for Visual Studio. The newly created project will have the required setup that enables you to immediately start using the {{ site.product }} components.

To use the project templates, you start the **Create New Project Wizard** provided by the {{ site.product }} Visual Studio Extensions. With the project templates, you can quickly deploy popular components like Grid and Menu or even entire applications. You don't need to manually [add the client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})&mdash;the **Create New Project Wizard** handles this task for you.

## Getting the Wizard

To use the **Create New Project Wizard**, [install the {{ site.product }} Extension]({% slug overview_visualstudio_aspnetcore %}#installing-the-extensions).

>If you have an older version of the Telerik Extensions for Visual Studio and you want to create a new {{ site.product }} project with version 2023.1.314 (R1 2023 SP1), or a newer version of the components, you must first update the Telerik Extension. To download and install the latest version of the Telerik Extensions, follow the [Installing from Visual Studio Marketplace]({% slug overview_visualstudio_aspnetcore %}#installing-from-visual-studio-marketplace) instructions.

## Using the Wizard

>The exact steps to start the wizard may vary between the different Visual Studio versions. The following instructions describe the steps for Visual Studio 2019.

To create a new {{ site.product }} application, use the **Create New Project Wizard**. The wizard detects all installed versions of {{ site.product }} and lists them in the **Version** dropdown&mdash;this enables you to apply the desired version to your project.

To start the wizard, use either of the following approaches:

* Using the Visual Studio 2019 **Extensions** menu:

    1. Go to **Extensions** > **Telerik** >  **{{ site.product }}**.
    1. Click **Create New Telerik Project**.

{% if site.core %}
    ![{{ site.product_short }} Visual Studio Extensions menu](../vs-integration/images/create-project-core.png)
{% endif %}

* Using the **Project** menu:

    1. Click **File** > **New** > **Project**.
    1. Type **Telerik** in the **Search for templates** textbox. Click on the {% if site.core %}**Telerik ASP.NET Core MVC Telerik Application**{% else %}**Telerik ASP.NET MVC Application**{% endif %}.

{% if site.core %}
    ![{{ site.product_short }} New project Template](../vs-integration/images/new-project-template-core.png)

## Configuring the Project

With the **Create New Project Wizard** you can select the desired:

* Target framework
* .NET Core version
* Tag or HTML Helpers
* Telerik UI Version
* Project Template
* Visual Theme

### Target Framework

The **Create New Project Wizard** allows you to select a target **Framework**. 

>Note
> 
>If the target **Framework** dropdown is disabled check the troubleshooting [section]({% slug troubleshooting_visualstudio_aspnetcore%}#the-target-framework-dropdown-is-disabled).

![{{ site.product_short }} Selecting a target framework](../vs-integration/images/target-dropdown.png)

### .NET Core version

Click on the desired **{{ site.framework }}** version.

![{{ site.product_short }} The ASP.NET version options](../vs-integration/images/core-version.png)

### Helper Selection

You can choose if you want the template project to use [HtmlHelpers or TagHelpers]({% slug knownissues_aspnetmvc6_aspnetmvc %}) in its Views.
In this article, we use the **Tag** option.

![{{ site.product_short }} HTML/Tag helper options](../vs-integration/images/tag-html-dropdown.png)

### {{ site.product_short}} version

The Project wizard allows you to select the desired version of {{ site.product_short }}. If there is a newer version available that is not downloaded on the machine, you can obtain it without exiting the wizard.

![{{ site.product_short }} Product version options](../vs-integration/images/telerik-version.png)

### Available Templates

The following project templates are available:

![{{ site.product_short }} Project template options](../vs-integration/images/new-project-wizard-core.png)

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
                    <li> Everything from the <strong>Blank Project<strong>.</li>
                    <li> Responsive Panel and Menu in <code>_Layout.cshtml</code>.</li>
                    <li> PanelBar in <code>Index.cshtml</code>.</li>
                    <li> TabStrip in <code>Contact.cshtml</code>.</li>
                    <li> HTML styled with [Cards](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/cards) CSS in <code>About.cshtml</code>.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><strong>Grid and Menu</strong></td>
            <td><p>The Grid and Menu template features:</p>
                <ul>
                    <li> Everything from the <strong>Blank Project</strong>.</li>
                    <li> Buttons and Grid in <code>Index.cshtml</code>.</li>
                    <li> Responsive Panel and Menu in <code>_Layout.cshtml</code>.</li>
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
                    <li> A TileLayout with Charts and Grids in <code>Index.cshtml</code> as well as a Shared DataSource and dynamicaly populated templates.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><strong>Admin</strong></td>
            <td><p>The Admin is a Razor Pages template configured with <a href="https://docs.telerik.com/aspnet-core/tag-helpers/overview">TagHelpers</a>. It features:</p>
                <ul>
                    <li>Everything from the <strong>Blank Project</strong>.</li>
                    <li>Authentication functionallity (Registration, Login, and Logout) in <code>Areas/Login/Pages</code>.</li>
                    <li>A navigation that is created by using the <a href="https://docs.telerik.com/aspnet-core/tag-helpers/navigation/drawer/overview">Drawer</a> and <a href="https://docs.telerik.com/aspnet-core/tag-helpers/navigation/appbar/overview">AppBar</a> components.</li>
                    <li>A <a href="https://docs.telerik.com/aspnet-core/tag-helpers/layout/tilelayout/overview">TileLayout</a> with <a href="https://docs.telerik.com/aspnet-core/styles-and-layout/cards">Cards</a>, <a href="https://docs.telerik.com/aspnet-core/tag-helpers/gauges/arcgauge/overview">Arc Gauge</a>, <a href="https://docs.telerik.com/aspnet-core/tag-helpers/charts/overview">Chart</a> and <a href="https://docs.telerik.com/aspnet-core/tag-helpers/data-management/grid/overview">Grid</a> in <code>Index.cshtml</code>.</li>
                    <li>A <a href="https://docs.telerik.com/aspnet-core/tag-helpers/layout/tilelayout/overview">TileLayout</a> with a variety of <a href="https://docs.telerik.com/aspnet-core/tag-helpers/charts/overview">Charts</a> and <a href="https://docs.telerik.com/aspnet-core/tag-helpers/gauges/radialgauge/overview">Gauges</a> in <code>Performance.cshtml</code>.</li>
                    <li>A <a href="https://docs.telerik.com/aspnet-core/tag-helpers/layout/tilelayout/overview">TileLayout</a> with <a href="https://docs.telerik.com/aspnet-core/tag-helpers/charts/overview">Bubble Chart</a> and <a href="https://docs.telerik.com/aspnet-core/html-helpers/data-management/listview/overview">ListView</a> with editable <a href="https://docs.telerik.com/aspnet-core/styles-and-layout/cards">Cards</a> in <code>Products.cshtml</code> as well as <a href="https://docs.telerik.com/aspnet-core/tag-helpers/data-management/pager/overview">Pager</a> and search panel.</li>
                    <li>A <a href="https://docs.telerik.com/aspnet-core/tag-helpers/layout/tilelayout/overview">TileLayout</a> with <a href="https://docs.telerik.com/aspnet-core/tag-helpers/layout/form/overview">Form</a> and <a href="https://docs.telerik.com/aspnet-core/tag-helpers/scheduling/calendar/overview">Calendar</a> in <code>Settings.cshtml</code>.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Themes

The **Select Theme** option allows you to preview all of the available LESS and SASS themes and select the desired one. After the selection is made, the project will include only the files that are required by the selected theme in the `_Layout.cshtml`.

![{{ site.product_short }} Project Wizard Select Theme](../vs-integration/images/select-theme-core.png)

{% endif %}

## Creating the Application

After configuring the settings of the project, click **Finish** to start creating the new {{ site.product }} application.

As a result, the wizard:

* Creates a new {{ site.framework }} application.
* Adds CDN references for the Kendo UI styles and scripts to the `Layout` file of the project.
* Copies all Kendo UI editor templates.
{% if site.core %}
* Adds a package reference to the `Telerik.UI.for.AspNet.Core` NuGet package.
{% else %}
* (Optional) Copies the `Kendo.Mvc` assembly to your solution folder&mdash;it is possible to change this setting in the [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetcore %}).
* Adds a reference to the `Kendo.Mvc` assembly.
{% endif %}

The wizard creates a `Templates` folder in the root of the application. By default, the `Templates` folder is not visible and is not included in the project. To display it, select the **Show All Files** button in the **Solution Explorer** of Visual Studio.  

{% if site.mvc %}
## Custom Modernizr

The Telerik UI ASP.NET MVC application includes a custom stripped-down Modernizr in a file called `kendo.modernizr.custom.js`. It provides HTML5 element support for old browsers, specifically Internet Explorer.

If you need the Modernizr in your application, remove the existing Modernizr and register another version which includes more components and features. In such cases, if HTML5 element support is required, include the `html5shiv` component to make sure that the newly registered Modernizr [provides such support](http://modernizr.com/docs/#html5inie).

## Swatches

When you select a theme, you can select between three main themes: Default, Bootstrap, and Material. In addition to the styles of the main theme, you can select a specific swatch. A swatch is a set of variables which customize the appearance of the selected main visual theme.

* [Using the Build Process of the Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes#using-the-build-process-of-the-themes)
* [How Do I Know Which SASS Theme Corresponds to My Current LESS Theme?](https://docs.telerik.com/aspnet-mvc/styles-and-layout/less-themes-migration#how-do-i-know-which-sass-theme-corresponds-to-my-current-less-theme)
{% endif %}

## See Also

* [Converting Existing Projects with Visual Studio]({% slug convertprojectwizard_visualstudio_aspnetcore %})
* [Integrating Visual Studio in Your .Net Project (Overview)]({% slug overview_visualstudio_aspnetcore %})
* [Downloading the Latest {{ site.product }} Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
