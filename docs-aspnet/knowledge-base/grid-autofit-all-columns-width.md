---
title: Automatically Fit Width of Grid Columns to Show All Data
description: Learn how to automatically fit the width of all {{ site.framework }} columns to show all data.
type: how-to
page_title: Automatically Fit Column Width to Show All Data - {{ site.framework }} Data Grid
slug: grid-autofit-all-columns-width
tags: grid, autofit, auto, fit, automatically, columns, width, show, all, data
ticketid: 1148885
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® {{ site.framework }} Grid</td>
  <td>Version</td>
  <td>2023.3.1114 </td>
 </tr>
</table>

## Description

How can I have the columns of a {{ site.framework }} Grid automatically fit their width to accommodate their content?

## Solution

1. Subscribe to the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event of the Grid.
1. Loop through the Grid columns and pass the column index to the client-side [`autoFitColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/autofitcolumn) method.

```HtmlHelper
  @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
      .Name("Grid")
      .Columns(columns =>
      {
              columns.Bound(p => p.ProductName).Title("Product Name").Width(320);
              columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(150);
              columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(150).MinScreenWidth(800);
              columns.Bound(p => p.UnitsOnOrder).Title("Units On Order").Width(150).MinScreenWidth(800);
              columns.Bound(p => p.Discontinued).Width(130);
              columns.Command(command => command.Destroy()).Width(160);
      })
      .Pageable()
      .Events(events => events.DataBound("onDataBound"))
      .DataSource(dataSource => dataSource
          .Ajax()
          .PageSize(20)
          .Model(model =>
          {
              model.Id(p => p.ProductID);
              model.Field(p => p.ProductID).Editable(false);
          })
          .Create("Products_Create", "Grid")
          .Read("Products_Read", "Grid")
          .Update("Products_Update", "Grid")
          .Destroy("Products_Destroy", "Grid")
      )
  )
```
```TagHelper
  @addTagHelper *, Kendo.Mvc

  <kendo-grid name="Grid" navigatable="true" on-data-bound="onDataBound">
      <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
          <schema data="Data" total="Total">
              <model id="ProductID">
                  <fields>
                      <field name="ProductID" type="number" editable="false"></field>
                      <field name="ProductName" type="string"></field>
                      <field name="UnitPrice" type="number"></field>
                      <field name="UnitsInStock" type="number"></field>
                      <field name="Discontinued" type="boolean"></field>
                  </fields>
              </model>
          </schema>
          <transport>
              <read url="@Url.Action("Products_Read", "Grid")"/>
              <update url="@Url.Action("Products_Update", "Grid")"/>
              <create url="@Url.Action("Products_Create", "Grid")"/>
              <destroy url="@Url.Action("Products_Destroy", "Grid")"/>
          </transport>
      </datasource>
      <columns>
          <column field="ProductName" width="320" title="Product Name"/>
          <column field="UnitPrice" title="Unit Price" width="150"/>
          <column field="UnitsInStock" title="Units In Stock" width="150" min-screen-width="800"/>
          <column field="UnitsOnOrder" title="Units On Order" width="150" min-screen-width="800"/>
          <column field="Discontinued" width="130"/>
          <column width="160">
              <commands>
                  <column-command text="Delete" name="destroy"></column-command>
              </commands>
          </column>
      </columns>
      <pageable enabled="true"/>
  </kendo-grid>
```
```JavaScript
    function onDataBound(e){
        for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
        }
    }
```

{% if site.core %}
## Explore the solution in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the Autofit Grid Columns HtmlHelper](https://netcorerepl.telerik.com/QokFxbby203ttLSO02)
* [Sample code with the Autofit Grid Columns TagHelper](https://netcorerepl.telerik.com/QouvHPbI17sJDzOo56)

{% endif %}

## Notes

Applying auto-sizing to all columns of the Grid is a resource intensive operation. Depending on the number of configured columns, it may cause performance issues on the client-side.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/overview)

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Appearance of the Grid](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/appearance/width)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
