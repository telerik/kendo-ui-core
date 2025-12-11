---
title:  Razor Pages
page_title: Razor Pages
description: "Telerik UI MultiSelect for {{ site.framework }} in a RazorPages application."
slug: htmlhelpers_multiselect_razorpage_aspnetcore
components: ["multiselect"]
position: 7
---

# MultiSelect in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI MultiSelect for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_multiselect_databinding_aspnetcore %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

The [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component offers the most versatile data binding approach. To connect the MultiSelect to a dataset retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```Razor HtmlHelper_Index.cshtml
    @(Html.Kendo().MultiSelect()
        .Name("ordersMS")
        .DataTextField("ShipName")
        .DataValueField("OrderID")
        .DataSource(source =>
        {
            source.Read(read => read
                .Url(Url.Page("Index", "Read")).Data("forgeryToken"));
        })
    )
    ```
    {% if site.core %}
    ```Razor TagHelper_Index.cshtml
    <kendo-multiselect name="ordersMS"
        datatextfield="ShipName"
        datavaluefield="OrderID">
        <datasource>
            <transport>
                <read url="@Url.Page("Index", "Read")" data="forgeryToken"/>
            </transport>
        </datasource>
    </kendo-multiselect>
    ```
    {% endif %}

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

    Additional parameters can also be supplied. For example, when the [server filtering]({% slug htmlhelpers_multiselect_filtering_aspnetcore%}#server-filtering) of the MultiSelect is enabled, send the filter value along with the antiforgery token to the server using the JavaScript handler specified in the `Data()` option.

    ```HtmlHelper
    @page
    @model IndexModel
    <div>
        @(Html.Kendo().MultiSelect()
            .Name("ordersMS")
            .DataTextField("ShipName")
            .DataValueField("OrderID")
            .AutoBind(false)
            .DataSource(source =>
            {
                source.Read(read => read
                    .Url(Url.Page("Index", "Read")).Data("dataFunction"))
                    .ServerFiltering(true);
            })
        )
    </div>
    ```
    ```TagHelper
    @page
    @model IndexModel
    @addTagHelper *, Kendo.Mvc

    <div>
        <kendo-multiselect name="ordersMS" auto-bind="false"
            datatextfield="ShipName"
            datavaluefield="OrderID">
            <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                <transport>
                    <read url="/Index?handler=Read" data="dataFunction"/>
                </transport>
            </datasource>
        </kendo-multiselect>
    </div>
    ```
    ```JS
    <script>
        function dataFunction(e) {
            var filterValue = '';
            if (e.filter.filters[0]) {
                filterValue = e.filter.filters[0].value;
            }

            return {
                __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                filterValue: filterValue
            };
        }
    </script>
    ```

1. Within the `cshtml.cs` file, add a handler method for the Read operation that returns the dataset.

    ```C# PageModel
        public class IndexModel : PageModel
        {
            public JsonResult OnGetRead()
            {
                var multiSelectData = new List<OrderViewModel>();
                // Populate the collection with the MultiSelect data.
                return new JsonResult(multiSelectData);
            }
        }
    ```
    ```C# Model
    public class OrderViewModel
    {
        public int OrderID { get; set; }

        public string ShipName { get; set; }
    }
    ```

    When the server filtering is enabled, intercept the filter value sent through the `dataFunction` handler in the Read method and filter the data on the server before returning it to the MultiSelect.

    ```C# PageModel
        public class IndexModel : PageModel
        {
            public JsonResult OnGetRead(string filterValue)
            {
                var multiSelectData = new List<OrderViewModel>();
                // Populate the collection with the MultiSelect data.

                if (filterValue != null)
                {
                    var filteredData = multiSelectData.Where(p => p.ShipName.Contains(filterValue));
                    return new JsonResult(filteredData);
                }
                return new JsonResult(multiSelectData);
            }
        }
    ```

For the complete project, refer to the [MultiSelect in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MultiSelect/MultiSelectIndex.cshtml).

## Binding to a PageModel Property

To bind the MultiSelect to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the MultiSelect.

    ```C# PageModel
    public class IndexModel : PageModel
    {
        [BindProperty]
        public int[] Orders { get; set; }

        public void OnGet()
        {
            Orders = new int[] { 2, 3 }; // Assign a value to the "Orders" property, if needed.
        }

        public JsonResult OnGetRead()
        {
            var multiSelectData = new List<OrderViewModel>();
            // Populate the collection with the MultiSelect data.
            return new JsonResult(multiSelectData);
        }
    }
    ```

1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the MultiSelect to the property using the `MultiSelectFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().MultiSelectFor(m => m.Orders)  
            .DataTextField("ShipName")
            .DataValueField("OrderID")
            .DataSource(source =>
            {
                source.Read(read => read
                    .Url(Url.Page("Index", "Read")).Data("forgeryToken"));
            })
        )
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-multiselect for="Orders"
            datatextfield="ShipName" 
            datavaluefield="OrderID">
            <datasource>
                <transport>
                    <read url="@Url.Page("Index", "Read")" data="forgeryToken"/>
                </transport>
            </datasource>
        </kendo-multiselect>
    ```
    ```JS
        <script>
            function forgeryToken(e) {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the MultiSelect](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Server-Side HtmlHelper API of the MultiSelect](/api/multiselect)
* [Server-Side TagHelper API of the MultiSelect](/api/taghelpers/multiselect)
* [Knowledge Base Section](/knowledge-base)


