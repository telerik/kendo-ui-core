---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI Pager component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_pager_razorpage_aspnetcore
position: 6
---

# Pager in Razor Pages 

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Pager for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Pager component in a Razor Pages scenario.

## Getting Started

The Pager component provides a convenient integration with the Grid and DataSource. This example will demonstrate how to configure them in a Razor Pages scenario so that the Pager appear at the top of the Grid.

1. Create the Grid, DataSource and Pager definitions.

    ```HtmlHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        @(Html.Kendo().DataSource<OrderViewModel>()
               .Name("dataSource1")
               .Ajax(t => t.Read(r => r.Url("/Index?handler=Read").Data("forgeryToken")).PageSize(20))
           )
        @(Html.Kendo().Pager()
                .Name("pager")
                .DataSource("dataSource1")
                .ButtonCount(5)
                .PageSizes(true)
            )
        @(Html.Kendo().Grid<OrderViewModel>()
                .Name("grid")
                .Columns(columns =>
                {
                    columns.Bound(p => p.OrderID).Filterable(false).Width(100);
                    columns.Bound(p => p.Freight).Width(100);
                    columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}").Width(140);
                    columns.Bound(p => p.ShipName);
                    columns.Bound(p => p.ShipCity).Width(150);
                })
                .Sortable()
                .Scrollable()
                .Filterable()
                .DataSource("dataSource1")
            )
    ```
    ```TagHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" page-size="20">
            <transport>
                <read url="/Index?handler=Read" data="forgeryToken" />
            </transport>
            <schema>
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number"></field>
                        <field name="Freight" type="number"></field>
                        <field name="OrderDate" type="date"></field>
                        <field name="ShipName" type="string"></field>
                        <field name="ShipCity" type="string"></field>
                    </fields>
                </model>
            </schema>
        </kendo-datasource>
        
        <kendo-pager name="pager" datasource-id="dataSource1" button-count="5" page-sizes="true">
        </kendo-pager>
        
        <kendo-grid name="grid" datasource-id="dataSource1" height="440">
            <columns>
                <column field="OrderID" width="100">
                    <filterable enabled="false" />
                </column>
                <column field="Freight" width="100" />
                <column field="OrderDate" width="140" format="{0:MM/dd/yyyy}" />
                <column field="ShipName" />
                <column field="ShipCity" width="150" />
            </columns>
            <sortable enabled="true" />
            <scrollable enabled="true" />
            <filterable enabled="true" />
        </kendo-grid>
    ```
    
1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

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
    
1. Within the `cshtml.cs` file, add a handler method for the Read data operation.

    ```C# Index.cshtml.cs
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

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Pager](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager)
* [Server-Side HtmlHelper API of the Pager](/api/pager)
* [Server-Side TagHelper API of the Pager](/api/taghelpers/pager)
* [Knowledge Base Section](/knowledge-base)