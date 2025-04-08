---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Chart Wizard for {{ site.framework }} in a Razor Pages application."
slug: razorpages_chartwizard
position: 4
---

# Chart Wizard in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Chart Wizard for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Chart Wizard component in a Razor Pages scenario.

## Getting Started

To connect the Chart Wizard to a data set retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel

        @(Html.Kendo().ChartWizard<Product>()
            .Name("chartwizard")
            .DataSource(dataSource => dataSource
                .Read(r => r.Url("/Index?handler=Read").Data("forgeryToken"))
            )
            .DataColumns(columns =>
            {
                columns.Add().Field(f => f.ProductName).Title("Product Name");
                columns.Add().Field(f => f.Quantity);
            })
        )
    ```
    ```TagHelper
        @page
        @model IndexModel

        <kendo-chartwizard name="chartwizard">
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema data="Data" total="Total" errors="Errors">
                    <model>
                        <fields>
                            <field name="ProductName" type="string"></field>
                            <field name="Quantity" type="number"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url="/Index?handler=Read" data="forgeryToken"/>
                </transport>
            </datasource>
            <data-columns>
                <data-column field="ProductName" title="Product Name"/>
                <data-column field="Quantity" />
            </data-columns>
        </kendo-chartwizard>
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
        public static List<Product> products;

        public void OnGet(string culture)
        {
            if (!String.IsNullOrEmpty(culture))
            {
                CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo(culture);
            }

            if (products == null)
            {
                products = GetData();
            }
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request, int? id)
        {
            return new JsonResult(products.ToDataSourceResult(request));
        }

        private static List<Product> GetData()
        {
            return new List<Product>()
            {
                new Product { ProductID = 216321, ProductName = "Calzone", Quantity = 1 },
                new Product { ProductID = 546897, ProductName = "Margarita", Quantity = 2 },
                new Product { ProductID = 456231, ProductName = "Pollo Formaggio", Quantity = 1 }
            };
        }
    ```
    ```Model
        public class Product
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public int Quantity { get; set; }
            public decimal Price { get; set; }
            public decimal Tax { get; set; }
            public decimal Total { get; set; }
            public decimal TotalTax { get; set; }
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Chart Wizard](https://docs.telerik.com/kendo-ui/api/javascript/ui/chartwizard)
* [Server-Side HtmlHelper API of the Chart Wizard](/api/chartwizard)
* [Server-Side TagHelper API of the Chart Wizard](/api/taghelpers/chartwizard)
* [Knowledge Base Section](/knowledge-base)
