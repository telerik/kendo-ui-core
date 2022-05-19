---
title: Overview
page_title: VS Integration Overview
description: "Learn how to enhance experience of developing web applications with Telerik UI for ASP.NET MVC."
slug: overview_visualstudio_aspnetmvc
position: 1
previous_url: /getting-started/vs-integration/introduction
---

# Visual Studio Integration Overview

To integrate with Visual Studio, Telerik provides the Progress&reg; Telerik&reg; UI for ASP.NET MVC Visual Studio (VS) Extensions. They enhance the experience in developing MVC web applications with Telerik UI for ASP.NET MVC.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

The extensions provide wizards that allow you to automate the following procedures:

* [Project Creation]({% slug newprojectwizards_visualstudio_aspnetmvc %})&mdash;allows you to use pre-configured project templates and quickly deploy popular components like Grid and Menu or even entire Dashboard applications.
* [Project Conversion]({%slug projectwizardcoversion_visualstudio_aspnetmvc%})&mdash;automatically configures an already existing ASP.NET MVC application to use the Telerik UI components.
* [Project Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})&mdash;allows you to change the visual theme and to configure the right-to-left support, localization, and CDN use in existing projects that are already configured to use the Telerik UI components.
* [Project Upgrade]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})&mdash;upgrades an existing project to a new Telerik UI for ASP.NET MVC version.


## Installing and Using the Extensions

To install the Telerik UI for ASP.NET MVC Visual Studio Extensions, run the [Telerik UI for ASP.NET MVC installer]({% slug msi_install_mvc %}) and verify that the Visual Studio Extensions are selected for installation. They support Visual Studio 2022, 2019, 2017, 2015, 2013 and 2012.

> VS Express editions are not supported.

To access the VS Extensions go to **Telerik** > **Telerik UI for ASP.NET MVC**. The menu items vary depending on the selected project in VS. Additionally, you can access the extensions through the Solution Explorer context menu of any supported ASP.NET MVC Web Application project.

![Visual Studio with no selected projects](../vs-integration-mvc/images/create_menu.png)

![The selected project in VS is a standard ASP.NET MVC 4 or 5 web application](../vs-integration-mvc/images/convert_menu.png)

![The selected project in VS is a Telerik UI for ASP.NET MVC web application](../vs-integration-mvc/images/configure_menu.png)

When installed, the extensions add Telerik UI project templates to the New Project dialog in VS:

* C# Telerik UI for ASP.NET MVC web application
* VB Telerik UI for ASP.NET MVC web application

![The added project templates](../vs-integration-mvc/images/project_template.png)

These templates are available in the language-specific nodes of the dialog as well. The **Add New Project** dialog contains the Telerik UI for ASP.NET MVC web application under both the `CSharp\Web` and `Visual Basic\Web` nodes.

The following additional project templates are also available:

* [C# Telerik ASP.NET Core MVC application](https://docs.telerik.com/aspnet-core/introduction)
* [Kendo UI ASP.NET MVC 5 application]({% slug newprojectwizard_visualstudio_kendoui %})

The ASP.NET MVC 4 project wizard also contains the Telerik UI for ASP.NET MVC web application.

![The MVC wizard](../vs-integration-mvc/images/mvc_wizard.png)

## See Also

* [Creating New Projects with Visual Studio]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Downloading the Latest Telerik UI for ASP.NET Core Versions]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
