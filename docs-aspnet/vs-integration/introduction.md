---
title: Overview
page_title: VS Integration Overview
description: "Learn how to enhance your experience in developing web applications with {{ site.product_long }}."
previous_url: /getting-started/vs-integration/introduction, /installation/vs-integration/introduction, /vs-integration-mvc/introduction
slug: overview_visualstudio_aspnetcore
position: 1
---

# Telerik UI for {{ site.framework }} Visual Studio Integration Overview

To integrate with Visual Studio, Telerik provides the Progress&reg; Telerik&reg; UI for {{ site.framework }} Visual Studio (VS) Extensions. They enhance the experience in developing web applications with {{ site.product }}.

The VS Extensions come with handy templates that ease the creation of new projects. They also help you add {{ site.product }} to an existing project or upgrade the {{ site.product_short }} version.
The {{ site.product }} VS extensions support VS 2022, 2019 and 2017, and are distributed through the {{ site.product }} installer and the Visual Studio Marketplace.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

The VS extensions provide wizards that allow you to automate the following procedures:

* [Project Creation wizard]({% slug newprojectwizards_visualstudio_aspnetcore %})&mdash;allows you to use pre-configured project templates that include the required package references and client-side resources. These templates enable the quick deployment of popular components like Grid and Menu or even entire Dashboard applications. With the Project Creation wizard you can:
{% if site.core %}
   * Select between project templates for both helper flavors&mdash;HTML Helpers and Tag Helpers.
{% endif %}
   * Select the {{ site.framework }} version and target framework.
   * Select the {{ site.product }} version that you want to use.
* [Project Conversion]({%slug convertprojectwizard_visualstudio_aspnetcore%})&mdash;automatically configures any already existing {{ site.framework }} application to use the Telerik UI components, and turns it into a complete Telerik application. The wizard lets you select between using CDN or local files for the client-side resources.
* [Project Configuration]({% slug projectwizardconfig_visualstudio_aspnetcore %})&mdash;allows you to change the visual theme and to configure the right-to-left support, localization, and CDN use in existing projects that are already configured to use the Telerik UI components.
* [Update notifications]({% slug latestversionretrieval_visualstudio_aspnetcore %})&mdash;the VS Extensions notify you when a new  version of {{ site.product }} is available and allow you to upgrade your applications.
* The Project Creation and Conversion wizards let you select a visual theme so that only the necessary CSS files are included.

## Installing the Extensions

There are three ways to install the VS Extensions: 

* By using the [automated MSI installer](#installing-with-the-msi)
* By installing from the [Visual Studio Marketplace](#installing-from-visual-studio-marketplace)
* By installing [directly from Visual Studio](#installing-in-visual-studio)

### Installing with the MSI

To install the {{ site.product }} Visual Studio Extensions, run the [{{ site.product }} installer]({% slug msi_install_aspnetmvc6_aspnetmvc %}) and verify that the Visual Studio Extensions are selected for installation.

### Installing from Visual Studio Marketplace

Go to the Visual Studio Marketplace and select the desired version:

* For [Visual Studio 2017 and 2019]{% if site.core %}(https://marketplace.visualstudio.com/items?itemName=TelerikInc.TelerikASPNETCoreVSExtensions){% else %}(https://marketplace.visualstudio.com/items?itemName=TelerikInc.TelerikASPNETMVCVSExtensions){% endif %}
* For [Visual Studio 2022]{% if site.core %}(https://marketplace.visualstudio.com/items?itemName=TelerikInc.ProgressTelerikASPNETCoreVSExtensions){% else %}(https://marketplace.visualstudio.com/items?itemName=TelerikInc.ProgressTelerikASPNETMVCVSExtensions){% endif %}

When the download is complete, navigate to the download folder and click on the downloaded {% if site.core %}`TelerikUI.ASP.NET.Core.VSPackage.vsix`{% else %}`TelerikUI.Mvc.VSPackage.X64.vsix` or `TelerikUI.Mvc.VSPackage.vsix`{% endif %} file to install the extensions.

### Installing in Visual Studio

1. Launch Visual Studio.
1. Select **Extensions** from the top menu. (In Visual Studio 2017, this menu is called **Tools**.)
1. Click **Manage Extensions** from the drop-down menu. (In Visual Studio 2017, this menu is called **Extensions and Updates**.)
1. Click **Online** to the left and select **Visual Studio Marketplace**.
1. In the **Search** text box, enter `Telerik {{ site.framework }} VSExtensions` 
1. Select the extension and click **Download**.
1. Visual Studio will apply the changes automatically once you close all Microsoft Visual Studio windows.

## Using the Telerik VS Extensions in VS 2019

- To access the VS extensions from the VS Toolbar, go to **Extensions > Telerik > {{ site.product }}**. Choose one of the two options -  **Create New Project** or **Convert to Telerik Application**.

{% if site.core %}
    ![{{ site.product_short }} Visual Studio 2019 Extensions menu](../vs-integration/images/create-project-core.png)
{% endif %}

- To access the template projects, go to **File** > **New** > **Project** and search for `Telerik`.

{% if site.core %}
    ![{{ site.product_short }} New project Template](../vs-integration/images/new-project-template-core.png)
{% endif %}

## Using the Telerik VS Extensions in VS 2017

- To access the VS extensions from the VS, go to **Telerik > {{ site.product }}**. Choose from one of the two options -  **Create New Project** or **Convert to Telerik Application**.

{% if site.core %}
    ![{{ site.product_short }} Visual Studio 2017 Extensions menu](../vs-integration/images/create-project-core-vs2017.png)
{% else %}
    ![{{ site.product_short }} Visual Studio with no selected projects](../vs-integration/images/images-mvc/create_menu.png)
    ![{{ site.product_short }} The selected project in VS is a standard ASP.NET MVC 5 web application](../vs-integration/images/images-mvc/convert_menu.png)
{% endif %}

- To access the template projects, go to **File** > **New** > **Project** and click on **Installed** > **Telerik** or search for `Telerik` in the search textbox on the right.

{% if site.core %}
    ![{{ site.product_short }} New project Template](../vs-integration/images/new-project-template-core-vs2017.png)
{% else %}
    ![{{ site.product_short }} The added project templates](../vs-integration/images/images-mvc/project_template.png)

These templates are available in the C# and VB language-specific nodes of the dialog as well. The **Add New Project** dialog contains the Telerik UI for ASP.NET MVC web application under both the `CSharp\Web` and `Visual Basic\Web` nodes.

The following additional project templates are also available:

* [C# Telerik ASP.NET Core MVC application](https://docs.telerik.com/aspnet-core/introduction)
* [Kendo UI ASP.NET MVC 5 application]({% slug newprojectwizard_visualstudio_kendoui %})

The ASP.NET project wizard also contains the Telerik UI for ASP.NET MVC web application.

![{{ site.product_short }} The MVC wizard](../vs-integration/images/images-mvc/mvc_wizard.png)
{% endif %}

## {{ site.product }} Settings

You can find the {{ site.product }} VS Extensions settings in the standard Visual Studio options dialog under the Telerik node.

{% if site.core %}
![{{ site.product_short }} The Options dialog](../vs-integration/images/asp_core_settings.png)
{% endif %}

## See Also

* [Creating New Projects with Visual Studio]({% slug newprojectwizards_visualstudio_aspnetcore %})
* [Converting Existing Projects with Visual Studio]({% slug convertprojectwizard_visualstudio_aspnetcore %})
* [Downloading the Latest {{ site.product }} Version]({% slug latestversionretrieval_visualstudio_aspnetcore %})
