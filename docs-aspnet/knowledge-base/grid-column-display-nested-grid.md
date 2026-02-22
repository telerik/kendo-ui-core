---
title: Displaying a Nested Grid in a Grid Column Template
description: An example on how to display a nested Grid in the Telerik UI for {{ site.framework }} Grid column.
type: how-to
page_title: Displaying a Nested Grid in a Grid Column Template
slug: grid-column-display-nested-grid
tags: grid, column, template, nested, grid, button, toggle
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2024.2.514 version</td>
 </tr>
</table>

## Description

How can I display a button in a specified Grid column that toggles a nested Grid?

## Solution

Here are the steps for implementation:

1. Integrate a Button and a hidden Grid in the main Grid's column by using the [Template component]({% slug htmlhelpers_overview_template %}):

    ```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(f => f.Id)
                .ClientTemplate(Html.Kendo().Template()
                    .AddComponent(x => x
                        .Button()
                        .Name("detailsBtn_${data.Id}")
                        .Content("Expand")
                        .Events(ev => ev.Click("onDetailsClick"))
                    )
                    .AddHtml("<div class='gridContainer'>")
                    .AddComponent(x => x
                        .Grid<DetailsViewModel>()
                            .Name("detailsGrid_${data.Id}")
                            .AutoBind(false) // Prevent the initial Read request during the Grid's initialization.
                            .Columns(c =>
                            {
                                c.Bound(x => x.Id);
                                c.Bound(x => x.Name);
                            })
                            .Scrollable()
                            .HtmlAttributes(new { style = "height: 200px;"})
                            .DataSource(dataSource => dataSource
                                .Ajax()
                                .PageSize(20)
                                .Read(read => read.Action("DetailsRead", "Grid"))
                            )
                    )
                    .AddHtml("</div>")
                );
        })
        // Other configuration.
    )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <columns>
                <column field="Id">
                    <column-template>
                        <kendo-button name="detailsBtn_${data.Id}" on-click="onDetailsClick">
                            Expand
                        </kendo-button>
                        <div class='gridContainer'>
                            <kendo-grid name="detailsGrid_${data.Id}" auto-bind="false" height="200">
                                <columns>
                                    <column field="Id"></column>
                                    <column field="Name"></column>
                                </columns>
                                <scrollable enabled="true" />
                                <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
                                    <schema data="Data" total="Total" errors="Errors">
                                        <model id="Id"></model>
                                    </schema>
                                    <transport>
                                        <read url="@Url.Action("DetailsRead","Grid")"/>
                                    </transport>
                                </datasource>
                            </kendo-grid>
                        </div>
                    </column-template>
                </column>
            </columns>
            <!-- Other configuration -->
        </kendo-grid>
    ```
    {% endif %}

1. Hide the `div` element that wraps the Grid declaration:

    ```
    <style>
        .gridContainer {
            display: none;
        }
    </style>
    ```

1. Handle the `click` event of the **Expand** button and toggle the Grid's container.
Get a reference to the Grid and call the [`read()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/read) method of its DataSource by passing the **Id** field to the server to filter the data based on the data item of the current row (the main Grid's row).

  ```JS scripts
      function onDetailsClick(e) {
          var id = $(e.target).attr("id").split("_")[1];
          var btnLabel = $(e.target).find(".k-button-text").html(); // Get the current label of the Button.
          if (btnLabel == "Expand") {
              $(e.target).find(".k-button-text").html("Collapse");
          } else $(e.target).find(".k-button-text").html("Expand");

          $(e.target).next().toggle(); // Toggle the visibility of the nested Grid.
          var grid = $(`#detailsGrid_${id}`).data("kendoGrid").dataSource.read({ parentId: id });
      }
  ```
  ```C# GridController.cs
      public ActionResult DetailsRead([DataSourceRequest] DataSourceRequest request, int parentId)
      {
          var filteredData = gridData.Where(x => x.Id == parentId); // Filter the nested Grid based on the "Id" of the parent record.
          return Json(filteredData.ToDataSourceResult(request));
      }
  ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
