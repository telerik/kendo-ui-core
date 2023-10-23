---
title: Overview
page_title: Overview
description: "Discover the Telerik UI Grid component for {{ site.framework }} providing everything from paging, sorting, filtering, editing, and grouping to exporting to PDF and Excel."
previous_url: /helpers/html-helpers/grid, /helpers/data-management/grid/overview, /helpers/data-management/grid/configuration
slug: htmlhelpers_grid_aspnetcore_overview
position: 0
---

# {{ site.framework }} Grid Overview

{% if site.core %}
The Telerik UI Grid TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Grid widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI Grid HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Grid widget.
{% endif %}

The Grid is a powerful control for displaying data in a tabular format. It provides options for executing data operations, such as paging, sorting, filtering, grouping, and editing, which determine the way the data is presented and manipulated. The Grid supports data binding to local and remote sets of data by using the Kendo UI for jQuery DataSource component.

* [Demo page for the Grid HtmlHelper](https://demos.telerik.com/{{ site.platform }}/grid/index)
{% if site.core %}
* [Demo page for the Grid TagHelper](https://demos.telerik.com/aspnet-core/grid/tag-helper)
{% endif %}

## Initializing the Grid

The following example demonstrates how to define the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
		.Name("grid")
		.Columns(columns =>
		{
			columns.Bound(c => c.ContactName).Width(140);
			columns.Bound(c => c.ContactTitle).Width(190);
			columns.Bound(c => c.CompanyName);
			columns.Bound(c => c.Country).Width(110);
		})
		.DataSource(dataSource => dataSource
			.Ajax()
			.Read(read => read.Action("Customers_Read", "Grid"))
		)
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <columns>
            <column field="ContactName" width="140"></column>
            <column field="ContactTitle" width="190"></column>
            <column field="CompanyName"></column>
            <column field="Country" width="110"></column>
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Customers_Read","Grid")"/>
            </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}
```Controller
    public class GridController : Controller
    {
        public ActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
        {
            var result = Enumerable.Range(0, 50).Select(i => new Customer
            {
                CompanyName = "Company Name " + i,
                ContactName = "Contact Name " + i,
                ContactTitle = "Contact Title " + i,
                Country = "Coutry " + i
            });

            var dsResult = result.ToDataSourceResult(request);
            return Json(dsResult);
        }
    }
```
```Customer.cs
    public class Customer
    {
        public string ContactName { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string ContactTitle { get; set; }
    }
```

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Basic Configuration

The Grid configuration options are passed as attributes of the helper. The Grid uses the [DataSource component]({% slug htmlhelpers_datasource_aspnetcore %}) to bind its data.

> To parse the value to a proper data type, set a `type` field in the DataSource schema model of the Grid HtmlHelper{% if site.core %} or TagHelper{% endif %}.

```HtmlHelper
    @(Html.Kendo().Grid<TelerikAspNetCoreApp4.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.OrderID).Width(120);
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
            columns.Bound(p => p.ShipName).Width(300);
            columns.Bound(p => p.ShipCity).Width(250);
        })
        .Groupable()
        .Sortable()
        .Filterable()
        .Pageable(pageable => pageable
        .ButtonCount(5)
        .Refresh(true)
        .PageSizes(new[] { 5, 10, 20 }))
        .DataSource(dataSource => dataSource
            .Custom()
            .Transport(transport => transport
            .Read(read => read.Action("Orders_Read", "Grid")))
            .Schema(schema => schema
                .Data("Data")
                .Model(model => {
                    model.Field("OrderDate", typeof(DateTime));
                })
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="OrderDate" type="Date"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
        <groupable enabled="true" />
        <sortable enabled="true" />
        <filterable enabled="true" />
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
        </pageable>
        <columns>
            <column field="OrderID" width="120" />
            <column field="OrderDate" title="Order Date" format="{0:MM/dd/yyyy}" />
            <column field="ShipName" title="Ship Name" width="300" />
            <column field="ShipCity" title="Ship City" width="250" />
        </columns>
    </kendo-grid>
```
{% endif %}

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Data binding]({% slug htmlhelpers_grid_aspnetcore_binding_overview %}) | You can bind the Grid to remote data or to local arrays of data. Additionally, you can use [SignalR]({% slug htmlhelpers_grid_aspnetcore_signalrbinding %}) or configure your [custom binding]({% slug custombinding_grid_aspnetmvc %}). |
| [Editing]({% slug batchediting_grid_aspnetcore %}) | The Grid supports various editing modes that allow you to control the way the data is represented.  |
| [Filtering]({% slug htmlhelpers_grid_aspnetcore_filtering %}) | To filter the displayed data, you can use row, checkbox, and menu filtering. |
| [Grouping]({% slug htmlhelpers_grid_aspnetcore_grouping %}) | The Grid provides built-in aggregates for a grand total row and column values. Additionally, you can use group paging to load groups on demand and page through the groups at the same time. |
| [Paging]({% slug htmlhelpers_grid_aspnetcore_paging %}) | Use the built-in paging functionality to paginate the data. For optimal performance, perform the paging operations on the server. |
| [Sorting]({% slug htmlhelpers_grid_aspnetcore_sorting %}) | The single-, multi-, and mixed-sort modes allow you to address various sorting requirements. |
| [Search panel]({% slug htmlhelpers_grid_aspnetcore_searchpanel %}) | The Grid comes with a search panel out-of-the-box and allows the users to quickly find the needed data. |
| [Export to Excel]({% slug excelexport_gridhelper_aspnetcore %}) | The Grid enables you to export its content to Excel. |
| [Export to PDF]({% slug pdfexport_gridhelper_aspnetcore %}) | You can use the built-in PDF export functionality. |
| [Printing]({% slug printing_gridhelper_aspnetcore %}) | If desired, you can print only the content of the Grid and ignore the rest of the page. |
| Column enhancements | The built-in Grid features like [locked]({% slug locked_columns_aspnetcore_grid %}) and [sticky]({% slug htmlhelper_grid_sticky_columns %}) columns, [column templates]({% slug htmlhelper_grid_template_columns %}), [multi-column headers]({% slug multicolumn_headers_aspnetcore_grid %}), [column resizing]({% slug column_resizing_aspnetcore_grid %}) and [reordering]({% slug reordercols_aspnetcore_grid %}) allow you to take complete control over the behavior of the columns.|
| [State persistence]({% slug persiststate_grid_aspnetcore %}) | The Grid allows you to save the custom settings of the users and restore them after they log in again. |
| [Hierarchy]({% slug hierarchy_grid_htmlhelper_aspnetcore %}) | The Grid provides options for visualizing the relations between parent and child records by displaying its table data in a hierarchical manner. |
| [Templates]({% slug clientdetailtemplate_grid_aspnetcore %}) | The abundance of templates allows you to customize the way the data is visualized in the table. |
| [Scroll modes]({% slug htmlhelpers_grid_aspnetcore_scrolling %}) | The virtual scrolling and endless scrolling modes allow you to further enhance the user experience. |
| [Selection]({% slug htmlhelpers_grid_aspnetcore_selection %}) | The selection functionality and its various options allow the users to quickly manipulate the desired data. |
| [Toolbar]({% slug htmlhelpers_grid_aspnetcore_toolbar %}) | You can add command buttons to the toolbar and even define custom commands. |
| Rendering and styling | You can customize the appearance of the Grid by [configuring its rows]({% slug rows_aspnetcore_grid_widget %}), initializing the Grid from a [hidden container]({% slug hidden_containers_aspnetcore_grid %}), using [adaptive rendering]({% slug adaptive_rendering_gridhelper_aspnetcore %}), and setting its [height]({% slug height_aspnetcore_grid %}) and [width]({% slug width_grid_aspnetcore %}). |
| [Globalization]({% slug globalization_grid_aspnetcore %}) | The Grid provides globalization through the combination of [localization]({% slug localization_aspnetcore_grid %}) with [internationalization]({% slug intl_aspnetcore_grid %}) and [right-to-left support]({% slug rtl_aspnetcore_grid %}).|
| [Accessibility]({% slug accessibility_aspnetcore_grid %}) | The Grid is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_grid %}) for faster navigation. |

## Next Steps

* [Getting Started with the Grid]({% slug grid_aspnetcore_get_started %})
* [Basic Usage of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/index)
{% if site.core %}
* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
{% endif %}
* [Using the API of the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/api)

## See Also

* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
{% if site.core %}
* [Forum Discussions](https://www.telerik.com/forums/aspnet-core-ui?tagId=753) 
* [Demos](https://demos.telerik.com/aspnet-core/grid)
{% else %}
* [Forum Discussions](https://www.telerik.com/forums/aspnet-mvc?tagId=754) 
* [Demos](https://demos.telerik.com/aspnet-mvc/grid)
{% endif %}
* [How-To Examples](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid)
