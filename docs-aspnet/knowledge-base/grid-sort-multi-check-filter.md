---
title: Sorting the Grid Multi-Check Filter Items
description: An example on how to sort the MultiCheck filter items in the {{ site.product }} Grid.
type: how-to
page_title: Sort Multi-Check Filter DataSource in the Grid.
slug: grid-sort-multi-check-filter
tags: grid, filter, multi, multi-filter, multi-checkbox, checkbox, not sorted
ticketid: 1579381
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product Version</td>
  <td>2022.3.913</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I sort the multi-check items in the column filter menu of the {{ site.product }} Grid?

## Solution

1. Specify a [DataSource](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnfilterablebuilder#datasourcesystemaction) in the `Filterable` configuration of the Grid column.
1. Configure the sort option of the DataSource and set the desired order.

```HtmlHelper
  columns.Bound(p => p.Details).Filterable(ftb =>
  {
    ftb.Multi(true);
    ftb.Search(true);
    ftb.CheckAll(true);
    ftb.DataSource(dataSource => dataSource
      .Custom()
      .Transport(t => t.Read("ReadFilterMenuItems", "Grid"))
      .Sort(sort => {
          sort.Add("Details").Descending();
      })
    );
  });
```
```GridController
  public ActionResult ReadFilterMenuItems()
  {
    var result = gridDataCollection.GroupBy(p => p.Details).Select(grp => grp.FirstOrDefault());
    return Json(result);
  }

```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

* [{{ site.framework }} Grid Multi Checkbox Filter (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-multi-checkboxes)


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
