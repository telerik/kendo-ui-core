---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/html-helpers/grid, /helpers/data-management/grid/overview, /helpers/data-management/grid/configuration
slug: htmlhelpers_grid_aspnetcore_overview
position: 1
---

# Grid Overview

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

## Advance Reading

Because of the numerous functionalities it supports, the Grid is the most complex of the Telerik UI components. To gain greater confidence before you start working with it, make sure you get familiar with the following concepts:

* [DataSource]({% slug htmlhelpers_datasource_aspnetcore %})&mdash;The DataSource is one of the pivotal suite components. It is an abstraction for using local or remote data and a key concept in understanding how the Grid functions.
* [Remote CRUD operations]({% slug inlineediting_grid_aspnetcore %})&mdash;The section elaborates on scenarios in which data is retrieved from and submitted to a remote data service through HTTP requests that are made by the DataSource.
* [Remote data binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %})&mdash;The article provides information on server filtering, paging, and other features of the Grid.

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
    <kendo-grid name="grid"></kendo-grid>
```
{% endif %}
```Controller
    namespace Kendo.Mvc.Examples.Controllers
    {
	    public partial class GridController : BaseController
        {
            [Demo]
            public IActionResult Index()
            {
                return View();
            }

		    public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
		    {
		    	return Json(GetCustomers().ToDataSourceResult(request));
		    }

		    private static IEnumerable<CustomerViewModel> GetCustomers()
		    {
                using (var northwind = new SampleEntitiesDataContext())
                {
                    return northwind.Customers.Select(customer => new CustomerViewModel
                    {
                        CustomerID = customer.CustomerID,
                        CompanyName = customer.CompanyName,
                        ContactName = customer.ContactName,
                        ContactTitle = customer.ContactTitle,
                        Address = customer.Address,
                        City = customer.City,
                        Region = customer.Region,
                        PostalCode = customer.PostalCode,
                        Country = customer.Country,
                        Phone = customer.Phone,
                        Fax = customer.Fax,
                        Bool = customer.Bool
                    }).ToList();
                }
		    }
        }    
    }
```

## Basic Configuration

The Grid configuration options are passed as attributes of the helper. The Grid uses the [DataSource component]({% slug htmlhelpers_datasource_aspnetcore %}) to bind its data.

> To parse the value to a proper data type, set a `type` field in the DataSource schema model of the Grid TagHelper or HtmlHelper.

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

* Data operations
    * [Data binding]({% slug htmlhelpers_grid_aspnetcore_binding_overview %})
    * [Editing]({% slug batchediting_grid_aspnetcore %})
    * [Filtering]({% slug htmlhelpers_grid_aspnetcore_filtering %})
    * [Grouping]({% slug htmlhelpers_grid_aspnetcore_grouping %})
    * [Paging]({% slug htmlhelpers_grid_aspnetcore_paging %})
    * [Sorting]({% slug htmlhelpers_grid_aspnetcore_sorting %})
    * [Search panel]({% slug htmlhelpers_grid_aspnetcore_searchpanel %})
* Export options
    * [Excel]({% slug excelexport_gridhelper_aspnetcore %})
    * [PDF]({% slug pdfexport_gridhelper_aspnetcore %})
    * [Printing]({% slug printing_gridhelper_aspnetcore %})
* Advanced implementations
    * [Column enhancements]({% slug column_widths_grid_aspnetcore %})
    * [State persistence]({% slug persiststate_grid_aspnetcore %})
    * [Hierarchy]({% slug hierarchy_grid_htmlhelper_aspnetcore %})
    * [Templates]({% slug clientdetailtemplate_grid_aspnetcore %})
* More settings{% if site.mvc %}
    * [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %}){% endif %}
    * [Scroll modes]({% slug htmlhelpers_grid_aspnetcore_scrolling %})
    * [Selection]({% slug htmlhelpers_grid_aspnetcore_selection %})
    * [Toolbar]({% slug htmlhelpers_grid_aspnetcore_toolbar %})
    * [Rendering and dimensions]({% slug width_grid_aspnetcore %})
    * [Responsive Grid]({% slug adaptive_rendering_gridhelper_aspnetcore %})
    * [Performance tips]({% slug performance_htmlhelpers_grid_aspnetcore %})
    * [Globalization]({% slug globalization_grid_aspnetcore %})
    * [Accessibility]({% slug accessibility_aspnetcore_grid %})

For more information on implementing specific scenarios, refer to the [**Knowledge Base**](/knowledge-base) section.

## Events

You can subscribe to all Grid events and then use them to further customize the behavior of the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.ContactName).Title("Contact Name").Width(240).Filterable(ftb => ftb.Multi(true));
            columns.Bound(c => c.ContactTitle).Title("Contact Title");
            columns.Bound(c => c.CompanyName).Title("Company Name");
            columns.Bound(c => c.Country).Title("Country").Width(150);
        })
        .Groupable()
        .Events(events => events
            .Change("onChange")
        )
        .Sortable()
        .Pageable(pageable => pageable
            .Refresh(true)
            .PageSizes(true)
            .ButtonCount(5))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Orders_Read", "Grid"))
            .PageSize(20)
        )
    )

    <script>
            function onChange(e) {
                var selectedRow = this.select();
                var dataItem = this.dataItem(selectedRow);
                console.log(dataItem)
            }
   </script>
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550" on-change="onChange" selectable="true">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers" />
            </transport>
        </datasource>
        <groupable enabled="true" />
        <sortable enabled="true" />
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
        </pageable>

        <filterable enabled="true" />
        <columns>
            <column field="ContactName" title="Contact Name" width="240" />
            <column field="ContactTitle" title="Contact Title" />
            <column field="CompanyName" title="Company Name" />
            <column field="Country" title="Country" width="150" />
        </columns>
    </kendo-grid>

    <script>
        function onChange(e) {
            var selectedRow = this.select();
            var dataItem = this.dataItem(selectedRow);
            console.log(dataItem)
        }
    </script>
```
{% endif %}

## Referencing Existing Instances

To refer to an existing Grid instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [Grid client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods) to control its behavior.

        <script>
        $(function() {
            // The Name() of the Grid is used to get its client-side instance.
            var grid = $("#grid").data("kendoGrid");
        });
        </script>

## See Also

* [Basic Usage of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/index)
{% if site.core %}
* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
{% endif %}
* [Using the API of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/api)
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
