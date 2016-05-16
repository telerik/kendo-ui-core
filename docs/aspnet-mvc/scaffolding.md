---
title: Scaffolding
page_title: Scaffolding | Telerik UI for ASP.NET MVC
description: "Learn how to use the Kendo UI Scaffolder extension."
slug: scaffolding_aspnetmvc
position: 4
---

# Scaffolding

As of the Kendo UI Q1 2015 release, Telerik UI for ASP.NET MVC contains the Kendo UI Scaffolder extension. It allows you to generate MVC-wrapper widget declarations together with the related Controller action methods. Currently, the Kendo UI Grid, Scheduler, and Chart widgets can be scaffolded. More widgets will be added in future releases.

## Getting Started

### Requirements

* Visual Studio 2013 (with Update 2 or higher) or Visual Studio 2015
* ASP.NET MVC 4 or ASP.NET MVC 5
* C#
* Entity Framework Data Model

### Installation

The extension will be automatically installed by the **Telerik UI for ASP.NET MVC** installer.

You could also manually install it by navigating to the **wrappers\aspnetmvc\Scaffolding** folder of the distribution package and opening the included **vsix** file. It will automatically detect compatible Visual Studio versions.

### Initial Setup

To use the Kendo UI Scaffolder Visual Studio extension, follow the steps below.

**Step 1** The Kendo UI Scaffolder extension could be accessed through the **New Scaffolded Item...** menu which has different items depending on the currently installed Scaffolders.

**Figure 1. New scaffolded items**

![New Scaffolded Item](/aspnet-mvc/images/scaffolding/new_scaffolded_item.png)

**Step 2** Select the **Kendo UI Scaffolder** from the next menu.

**Figure 2. Kendo UI Scaffolder**

![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)

**Step 3** This brings up the Kendo UI scaffolding configuration panel to choose between the Kendo UI Grid, Chart, or Scheduler controls.

**Figure 3. Kendo UI Scaffolder widget selection**

![Kendo UI Scaffolder Widget Selection](/aspnet-mvc/images/scaffolding/widget_select.png)

For detailed information on possible configuration options, refer to the following articles:

* [Scaffolding of the Grid HtmlHelper]({% slug scaffoldinggrid_aspnetmvc %})
* [Scaffolding of the Chart HtmlHelper]({% slug scaffoldingchart_aspnetmvc %})
* [Scaffolding of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})

The Controller will be generated in the currently selected location along with the corresponding view.

## Troubleshooting

For a list of issues and solutions to common problems you may encounter while working with the Kendo UI Scaffolder Visual Studio extension, refer to the [troubleshooting article on scaffolding]({% slug troubleshooting_scaffolding_aspnetmvc %}).

## See Also

Other articles on getting started with Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 3 Applications]({% slug aspnetmvc3_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 4 Applications]({% slug aspnetmvc4_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug aspnetmvc5_aspnetmvc %})
* [Use Telerik UI for ASP.NET Core MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

Articles on Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Visual Basic Syntax]({% slug visualbasic_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Wrappers vs Kendo UI Widgets]({% slug wrappersvswidgets_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Visual Studio Integration]({% slug overview_visualstudio_aspnetmvc %})
* [Migration from Telerik Extensions]({% slug overview_migrationextensions_aspnetmvc %})
* [Telerik UI for ASP.NET MVC HtmlHelpers]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
