---
title: Displaying Audio Files within the Grid
description: "An example on how to display audio files within the {{ site.product }} Grid."
type: how-to
page_title: Displaying Audio Files within the Grid
slug: grid-display-audio-files
tags: mvc, core, grid, display, audio, files
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I display audio files within the {{ site.product }} Grid?

## Solution

1. Utilize a [Column Template](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template)
1. Within the template, add the conventional [audio element](https://www.w3schools.com/html/html5_audio.asp) that is primarily utilized for displaying an audio file on a the web page.
1.  Specify the file name and extension using the [Template Syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview#template-syntax).

```Model.cs

    public class EmployeeViewModel
    {
        public string Sound { get; set; } //stores both the file name and extension
    }

```
```Column
    .Columns(columns =>
    {
        columns.Bound(p => p.Sound).Width(350).ClientTemplate("<audio controls><source src='./#=Sound#'/></audio>");
    })
```

For a complete implementation of the suggested approach, refer to the following [GitHub Project](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/AudioColumn.cshtml).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
