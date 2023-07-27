---
title: Enabling ForeignKey Column Sorting by Text
page_title: Enabling ForeignKey Column Sorting by Text
description: "An example on how to enable ForeignKey column sorting by text in the Telerik UI Grid for {{ site.framework }}."
slug: howto_enable_foreignkey_sotringby_text_grid
tags: grid, enable, foreignkey, column, sort, text
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.314 version</td>
 </tr>
</table>

## Description

How can I enable `ForeignKey` column sorting by text in the {{ site.product }} Grid?

## Solution

The following example demonstrates how to enable the sort-by-text functionality in a ForeignKey column by adding the text field in the Grid.

To achieve the desired scenario:

1. Add the complex model field that is corresponding for the ForeignKey column.
1. Subscribe to the [`document.ready()`](http://learn.jquery.com/using-jquery-core/document-ready/) event, get a reference of the header for the ForeignKey column, and change the data-field attribute to point to the text field.

```Model.cs
     public class ProductViewModel
     {
         public int ProductID
         {
             get;
             set;
         }

         public string ProductName
         {
             get;
             set;
         }

         public decimal UnitPrice
         {
             get;
             set;
         }

         public CategoryViewModel Category
         {
            get;
            set;
         } 

         public int? CategoryID { get; set; }
     }
```
```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.CategoryName).ClientTemplate("#=calculateField(CategoryID)#").EditorTemplateName("CategoryNameEditor").Width(200);
                columns.Bound(p => p.UnitPrice).Format("{0:c}").Width(200);
                columns.Command(command => command.Destroy()).Width(150);
            })
            .ToolBar(toolBar =>
            {
                toolBar.Create();
                toolBar.Save();
            })
            .Editable(editable => editable.Mode(GridEditMode.InCell))
            .Pageable()
            .Sortable()
            .Scrollable()
            .HtmlAttributes(new { style = "height:540px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .Batch(true)
                .PageSize(20)
                .ServerOperation(false)
                .Model(model =>
                {
                    model.Id(p => p.ProductID);
                    model.Field(p => p.ProductID).Editable(false);
                })
                .Read(read => read.Action("Products_Read", "Grid"))
                .Update(update => update.Action("Products_Update", "Grid"))
                .Create(create => create.Action("Products_Create", "Grid"))
                .Destroy(destroy => destroy.Action("Products_Destroy", "Grid"))
            )
    )
```
```Script.js
   <script type="text/javascript">
        $(function () {
            var grid = $("#grid").data("kendoGrid"); // Get the Grid's reference.
            grid.thead.find("th[data-field='CategoryID']").attr("data-field", "Category.CategoryName"); // Change the data-field attribute.
        });
   </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on enabling foreign key column sorting by text in the Grid](https://netcorerepl.telerik.com/GxEIcTlf138axUqV28).

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

* [Client-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Enable ForeignKey Column Sorting by Text](https://netcorerepl.telerik.com/GxEIcTlf138axUqV28)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
