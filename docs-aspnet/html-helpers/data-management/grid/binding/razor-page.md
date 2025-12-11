---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Grid for {{ site.framework }} in a Razor Pages application."
slug: razorpages_gridhelper_aspnetcore
components: ["grid"]
position: 11
---

# Grid in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Grid for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_grid_aspnetcore_binding_overview %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To configure the CRUD operations of the Grid DataSource within a Razor Pages application, follow the next steps:

1. Specify the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` configuration. The URL in each of these options must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Editable()
            .Scrollable()
            .Pageable()
            .ToolBar(t => t.Create())
            .Columns(columns =>
            {
                columns.Bound(column => column.Freight);
                columns.Bound(column => column.ShipName);
                columns.Bound(column => column.ShipCity);
                columns.Command(column =>
                {
                    column.Edit();
                    column.Destroy();
                }).Width(230);
            })
            .HtmlAttributes(new { style = "height:430px;" })
            .DataSource(ds => ds
                .Ajax()
                .Read(r => r.Url(Url.Page("Index", "Read")).Data("forgeryToken"))
                .Update(u => u.Url(Url.Page("Index", "Update")).Data("forgeryToken"))
                .Create(c => c.Url(Url.Page("Index", "Create")).Data("forgeryToken"))
                .Destroy(d => d.Url(Url.Page("Index", "Destroy")).Data("forgeryToken"))
                .Model(m => m.Id(id => id.OrderID))
                .PageSize(10)
            )
        )
    ```
    ```TagHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        <kendo-grid name="grid" height="430">
            <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
                <schema data="Data" errors="Errors" total="Total">
                    <model id="OrderID">
                        <fields>
                            <field name="OrderID" type="number" editable="false"></field>
                            <field name="Freight" type="number"></field>
                            <field name="ShipName" type="string"></field>
                            <field name="ShipCity" type="string"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url="@Url.Page("Index", "Read")" data="forgeryToken"/>
                    <update url="@Url.Page("Index", "Update")" data="forgeryToken"/>
                    <create url="@Url.Page("Index", "Create")" data="forgeryToken"/>
                    <destroy url="@Url.Page("Index", "Destroy")" data="forgeryToken"/>
                </transport>
            </datasource>
            <columns>
                <column field="Freight"/>
                <column field="ShipName"/>
                <column field="ShipCity"/>
                <column width="230">
                    <commands>
                        <column-command text="Edit" name="edit"></column-command>
                        <column-command text="Delete" name="destroy"></column-command>
                    </commands>
                </column>
            </columns>
            <toolbar>
                <toolbar-button name="create"></toolbar-button> 
            </toolbar>
            <editable mode="inline"/>
            <pageable enabled="true"/>
            <scrollable enabled="true"/>
        </kendo-grid>
    ```
    
1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the CRUD requests.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```
    
1. Within the `cshtml.cs` file, add a handler method for each data operation.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        public static IList<OrderViewModel> orders;

        public void OnGet()
        {
            if (orders == null)
            {
                // Populate the "orders" collection with data.
                orders = new List<OrderViewModel>();
                Enumerable.Range(1, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                {
                    OrderID = i,
                    Freight = i * 10,
                    ShipName = "ShipName " + i,
                    ShipCity = "ShipCity " + i
                }));
            }
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(orders.ToDataSourceResult(request));
        }

        public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            order.OrderID = orders.Count + 1;
            orders.Add(order);

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            orders.Where(x => x.OrderID == order.OrderID).Select(x => order);

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            orders.Remove(orders.FirstOrDefault(x => x.OrderID == order.OrderID));

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }
    }
    ```
    ```Model
        public class OrderViewModel
        {
            public int OrderID { get; set; }

            public decimal? Freight { get; set; }

            public string ShipCity { get; set; }

            public string ShipName { get; set; }
        }
    ```
For the complete project, refer to the [Grid in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Grid/GridCrudOperations.cshtml).

## Binding to a PageModel Property

To bind the Grid to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that holds the data collection that must be loaded in the Grid.

    ```C#
        public class IndexModel : PageModel
        {
            [BindProperty]
            public IList<OrderViewModel> orders { get; set; }

            public void OnGet()
            {
                orders = new List<OrderViewModel>();
                // Populate the collection with data.
                Enumerable.Range(1, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                {
                    OrderID = i + 1,
                    Freight = i * 10,
                    ShipName = "ShipName " + i,
                    ShipCity = "ShipCity " + i
                }));
            }
        }
    ```

1. Declare the `PageModel` at the top of the page.

    ```
        @model IndexModel
    ```

1. Bind the Grid to the collection property and disable the server data operations (`ServerOperations(false)`).

    ```HtmlHelper
    @page
    @model IndexModel
    @using Kendo.Mvc.UI

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Grid<OrderViewModel>(Model.orders)
        .Name("grid")
        .Scrollable()
        .Pageable()
        .Columns(columns =>
        {
            columns.Bound(column => column.Freight);
            columns.Bound(column => column.ShipName);
            columns.Bound(column => column.ShipCity);
        })
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(ds => ds
            .Ajax()
            .PageSize(20)
            .ServerOperation(false)
        )
    )
    ```
    ```TagHelper
    @page
    @model IndexModel
    @using Kendo.Mvc.UI

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <kendo-grid name="grid" height="430">
        <datasource type="DataSourceTagHelperType.Ajax" 
            page-size="20" 
            server-operation="false" 
            data="@Model.orders">
        </datasource>
        <columns>
            <column field="Freight"/>
            <column field="ShipName"/>
            <column field="ShipCity"/>
        </columns>
        <pageable enabled="true"/>
        <scrollable enabled="true"/>
    </kendo-grid>
    ```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side HtmlHelper API of the Grid](/api/grid)
* [Server-Side TagHelper API of the Grid](/api/taghelpers/grid)
* [Knowledge Base Section](/knowledge-base)
