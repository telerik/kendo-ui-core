---
title: Scaffolding
page_title: Scaffolding
description: "Get started with {{ site.product }} and learn how to use the Telerik UI Scaffolder extensions."
previous_url: /getting-started/scaffolding, /getting-started/installation/scaffolding, /installation/scaffolding, /scaffolding, /vs-integration-mvc/scaffolding, /html-helpers/data-management/grid/scaffolding, /html-helpers/charts/scaffolding, /html-helpers/scheduling/scheduler/scaffolding, /html-helpers/navigation/treeview/scaffolding
slug: scaffolding_aspnetcore
position: 15
---

# Scaffolding for {{ site.product }}

{% if site.core %}
Since the 2022 R2 SP2 release, {{ site.product }} provides new way of generating Scaffolding templates as a convenient productivity feature. 
{% else %}
Since the R2 2023 release, {{ site.product }} provides new way of generating Scaffolding templates as a convenient productivity feature. 
{% endif %}


{% if site.core %}
![{{ site.product_short }} Adding a new scaffolded item with the Telerik UI Scaffolder for Core](../images/scaffolding/core-scaffolder-add-new-item.png)
{% else %}
![{{ site.product_short }} Adding a new scaffolded item with the Telerik UI Scaffolder for MVC](../images/scaffolding/mvc-scaffolder-add-new-item.png)
{% endif %}

The new Scaffolder items in Visual Studio allow quick code generation and mocking of data for some of the most used data-bound components, such as the {{ site.framework }} [Data Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}), [TreeList]({% slug htmlhelpers_treelist_aspnetcore%}), [Scheduler]({% slug htmlhelpers_scheduler_aspnetcore%}), [ListView]({% slug htmlhelpers_listview_aspnetcore%}), [Gantt]({% slug htmlhelpers_gantt_aspnetcore%}), [Chart]({% slug htmlhelpers_charts_aspnetcore%}), [Form]({% slug htmlhelpers_form_aspnetcore_overview%}) and [Editor]({% slug htmlhelpers_editor_aspnetcore%}).

## Installation

The Telerik UI Scaffolder comes with the installer of the Telerik UI for {{ site.framework }} components version {% if site.core %} 2022 R2 SP2 {% else %} 2023 R2 {% endif %} and later. No additional installation files are required.

To get the Scaffolding templates, download and install the latest version of the {{ site.product }} `.msi` installer and the Telerik Extensions for Visual Studio will be installed automatically together with the Scaffolding items.

{% if site.core %}
Alternatively, you can install the Extensions individually from the [VS MarketPlace](https://marketplace.visualstudio.com/items?itemName=TelerikInc.ProgressTelerikASPNETCoreVSExtensions).
{% else %}
Alternatively, you can install the Extensions individually from the [VS MarketPlace](https://marketplace.visualstudio.com/items?itemName=TelerikInc.ProgressTelerikASPNETMVCVSExtensions).
{% endif %}

## Scaffolding Templates

The {{ site.framework }} and VS already provide their own default Scaffolding items, but they shouldn't be confused with the new Telerik UI Scaffolding items.

To access the Telerik UI Scaffolding templates:

1. Right-click the project in the VS **Solution Explorer**.
1. Select the **Telerik UI for {{ site.framework }}** submenu.
1. Select the **Add New Scaffolded Item** option.

{% if site.core %}
![{{ site.product_short }} Using the Telerik UI Scaffolder for Core](../images/scaffolding/core-scaffolder.gif)
{% else %}
![{{ site.product_short }} Using the Telerik UI Scaffolder for MVC](../images/scaffolding/mvc-scaffolder.gif)
{% endif %}


Then, you are presented with several popular components you can choose from. You can also set the name of the new View and Controller files, as well as, a selection of other properties for different tools like the Grid and TreeList.

The final result conveniently generates everything required to run the page from the first go - a View page, a Controller file and a Model definition. This way, you can quickly begin with a working app and modify it to match your own business and development needs.

## See Also

* [Official .Net Documentation on Scaffolding](https://github.com/aspnet/Scaffolding)
* [Default ASP.NET Scaffolding Templates](https://github.com/aspnet/Scaffolding/tree/main/src/Scaffolding/VS.Web.CG.Mvc/Templates)
{% if site.core %}
* [Telerik UI for ASP.NET Core Scaffolding Templates](https://github.com/telerik/scaffold-templates-core)
* [How to add a model to an ASP.NET Core MVC app (Microsoft Tutorial)](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-2.1)
* [How to add a model to a Razor Pages app in ASP.NET Core (Microsoft Tutorial)](https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/model?view=aspnetcore-2.1)
{% else %}
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Using Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug gettingstarted_aspnetmvc %})
{% endif %}
