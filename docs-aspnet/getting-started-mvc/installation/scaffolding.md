---
title: Scaffolding
page_title: Scaffolding
description: "Get started with Telerik UI for ASP.NET MVC and learn how to use the Kendo UI Scaffolder extensions."
slug: scaffolding_aspnetmvc
previous_url: /scaffolding, /getting-started/scaffolding
position: 4
permalink: /getting-started/installation/scaffolding
---

# Scaffolding

As of the Q1 2015 release, Telerik UI for ASP.NET MVC provides Scaffolding templates.

These templates allow you to apply standard scaffolding to generate MVC-helper declarations together with the related Controller action methods. Currently, the Grid, Scheduler, Chart and TreeView support scaffolding.

For more information on the available configuration options, refer to the following articles:

* [Scaffolding of the Grid HtmlHelper]({% slug scaffoldinggrid_aspnetmvc %})
* [Scaffolding of the Chart HtmlHelper]({% slug scaffoldingchart_aspnetmvc %})
* [Scaffolding of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})
* [Scaffolding of the TreeView HtmlHelper]({% slug scaffoldingtreeview_aspnetmvc %})

## Prerequisites

* Visual Studio 2013 (with Update 2 or later), 2015, 2017 or 2019
* ASP.NET MVC 4 or ASP.NET MVC 5
* C#
* Entity Framework Data Model

## Installation

The Telerik UI for ASP.NET MVC installer will automatically install the extension.

You can also manually install it by navigating to the `wrappers\aspnetmvc\Scaffolding` folder of the distribution package and open the included `vsix` file. It will automatically detect compatible Visual Studio versions.

## Setting Up the Project

To initially set up Scaffolder Visual Studio extension:

1. From the **New Scaffolded Item...** menu which contains different items depending on the currently installed Scaffolders, access the Scaffolder extension.

    ![The new scaffolded item](../../images/scaffolding/new_scaffolded_item.png)

1. From the next menu, select **Kendo UI Scaffolder**. As a result, the Scaffolding configuration panel opens.

    ![The Kendo UI Scaffolder](../../images/scaffolding/kendo_ui_scaffolder.png)

1. Select the Grid, Chart, or Scheduler control. The Controller and the corresponding view will be generated in the currently selected location.

    ![Selecting widgets in the Kendo UI Scaffolder](../../images/scaffolding/widget_select.png)

## See Also

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Using Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug gettingstarted_aspnetmvc %})
* [Using Telerik UI for ASP.NET MVC in MVC 4 Applications]({% slug aspnetmvc4_aspnetmvc %})
* [Using Telerik UI for ASP.NET MVC in MVC 3 Applications]({% slug aspnetmvc3_aspnetmvc %})
