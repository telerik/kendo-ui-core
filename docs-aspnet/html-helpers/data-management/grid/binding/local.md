---
title: Local Binding
page_title: Local Binding
description: "Learn how to implement Local Binding with Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/data-management/grid/binding/server-binding
slug: htmlhelpers_grid_aspnetcore_localbinding
position: 3
---

# Local Binding

When configured for local binding, the Grid for {{ site.framework }} will serialize the data as part of its data source and will perform all data operations, such as paging, sorting, filtering, grouping, and aggregating, on the client.

For a runnable example, refer to the [demo on local binding of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/local-data-binding).  

To configure the Grid for {{ site.framework }} to do local binding:

1. Define a model class or use an existing one from your application.

        public class OrderViewModel
        {

            public int OrderID
            {
                get;
                set;
            }

            public string ShipCountry
            {
                get;
                set;
            }
        }

1. Open the `HomeController.cs` and return an `IEnumerable` of the model type with the View. This is the `View()` which holds the Grid definition.

    {% if site.core %}
    ```HomeController.cs      
        public IActionResult Index()
        {
            // Returns a collection of OrderViewModels.
            var model = orderService.Read();

                /* For a quick test, you can mock the data, and copy and paste this snippet.
            var model = Enumerable.Range(1, 20).Select(i => new OrderViewModel
            {
                OrderID = i,
                ShipCountry = i % 2 == 0 ? "ShipCountry 1" : "ShipCountry 2"
            });
            */

            return View(model);
        }
    ```
    {% else %}
    ```HomeController.cs  
        public ActionResult Index()
        {
            // Returns a collection of OrderViewModels.
            var model = orderService.Read();

            /* For a quick test, you can mock the data, and copy and paste this snippet.
            var model = Enumerable.Range(1, 20).Select(i => new OrderViewModel
            {
                OrderID = i,
                ShipCountry = i % 2 == 0 ? "ShipCountry 1" : "ShipCountry 2"
            });
            */

            return View(model);
        }  
    ```
    {% endif %}

1. In the `Index.cshtml` view, configure the Grid to accept the model in its constructor and set `ServerOperations(false)`.

    ```HtmlHelper
        @model IEnumerable<AspNetCoreGrid.Models.OrderViewModel>
        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(2)
                .ServerOperation(false)
             )
            .ToolBar(tools =>
            {
                tools.Pdf().Text("Custom PDF button text");
                tools.Excel().Text("Custom Excel button text");
            })
            .Pageable()
            .Sortable()
            .Groupable()
            .Columns(columns =>
            {
                columns.Bound(f => f.OrderID);
                columns.Bound(f => f.ShipCountry);
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @model IEnumerable<AspNetCoreGrid.Models.OrderViewModel>

        <kendo-grid name="grid">
            <datasource type="DataSourceTagHelperType.Ajax" page-size="2" server-operation="false" data="@Model">
            </datasource>
            <toolbar>
                <toolbar-button name="pdf" text="Custom PDF button text"></toolbar-button>
                <toolbar-button name="excel" text="Custom Excel button text"></toolbar-button>
            </toolbar>
            <pageable enabled="true">
            </pageable>
            <sortable enabled="true" />
            <groupable enabled="true" />
            <columns>
                <column field="OrderID">
                </column>
                <column field="ShipCountry">
                </column>
            </columns>
        </kendo-grid>
    ```
    {% endif %}
    
1. Build and run the application.

## See Also

* [Custom Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customajaxbinding)
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)