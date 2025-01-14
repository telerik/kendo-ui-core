---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI ComboBox component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_combobox_razorpage_aspnetcore
position: 7
---

# ComboBox in Razor Pages 

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ComboBox for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ComboBox component in a Razor Pages scenario.

For the complete project, refer to the <a href="https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ComboBox/ComboBoxCrud.cshtml" target="_blank">ComboBox in Razor Pages example</a>.

## Getting Started

The [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component offers the most versatile data binding approach. To connect the ComboBox to a data set retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel
        <div>
            @(Html.Kendo().ComboBox()
                .Name("combobox")
                .DataTextField("ShipName")
                .DataValueField("OrderID") 
                .DataSource(source =>
                {
                    source.Read(read => read
                        .Url("/Index?handler=Read").Data("forgeryToken"));
                })
            )
        </div>
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel
        @addTagHelper *, Kendo.Mvc

        <div>
            <kendo-combobox name="combobox"
                datatextfield="ShipName" 
                datavaluefield="OrderID">
                <datasource>
                    <transport>
                        <read url="/Index?handler=Read" data="forgeryToken"/>
                    </transport>
                </datasource>
            </kendo-combobox>
        </div>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```C#
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```JS
        <script>
            function forgeryToken(e) {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied. For example, when the [server filtering]({% slug htmlhelpers_combobox_filtering_aspnetcore%}#server-filtering) of the ComboBox is enabled, send the filter value along with the antiforgery token to the server using the JavaScript handler specified in the `Data()` option.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel
        <div>
            @(Html.Kendo().ComboBox()
                .Name("combobox")
                .DataTextField("ShipName")
                .DataValueField("OrderID")
                .AutoBind(false)
                .Filter(FilterType.Contains)
                .MinLength(3)
                .DataSource(source =>
                {
                    source.Read(read => read
                        .Url("/Index?handler=Read").Data("dataFunction"))
                        .ServerFiltering(true);
                })
            )
        </div>
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel
        @addTagHelper *, Kendo.Mvc

        <div>
            <kendo-combobox name="combobox" auto-bind="false" 
                datatextfield="ShipName" 
                datavaluefield="OrderID" 
                min-length="3"
                filter="FilterType.Contains">
                <datasource server-filtering="true">
                    <transport>
                        <read url="/Index?handler=Read" data="dataFunction"/>
                    </transport>
                </datasource>
            </kendo-combobox>
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

    ```Index.cshtml.cs
        public class IndexModel : PageModel
        {
            public JsonResult OnGetRead()
            {
                var comboBoxData = new List<OrderViewModel>();
                // Populate the collection with the ComboBox data.
                return new JsonResult(comboBoxData);
            }
        }
    ```
    ```Model
        public class OrderViewModel
        {
            public int OrderID { get; set; }

            public string ShipName { get; set; }
        }
    ```

    When the server filtering is enabled, intercept the filter value sent through the `dataFunction` handler in the Read method and filter the data on the server before returning it to the ComboBox.

    ```Index.cshtml.cs
        public class IndexModel : PageModel
        {
            public JsonResult OnGetRead(string filterValue)
            {
                var comboBoxData = new List<OrderViewModel>();
                // Populate the collection with the ComboBox data.

                if (filterValue != null)
                {
                    var filteredData = comboBoxData.Where(p => p.ShipName.Contains(filterValue));
                    return new JsonResult(filteredData);
                }
                return new JsonResult(comboBoxData);
            }
        }
    ```

## Binding the ComboBox to a PageModel Property

To bind the ComboBox to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the ComboBox.

    ```Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public int OrderID { get; set; }

            public void OnGet()
            {
                OrderID = 2; // Assign a value to the "OrderID" property, if needed.
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```C#
        @page
        @model IndexModel
    ```

1. Bind the ComboBox to the property using the `ComboBoxFor()` configuration.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().ComboBoxFor(m => m.OrderID)  
            .DataTextField("ShipName")
            .DataValueField("OrderID")
            .DataSource(source =>
            {
                source.Read(read => read
                    .Url("/Index?handler=Read").Data("forgeryToken"));
            })
        )
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-combobox for="OrderID"
            datatextfield="ShipName" 
            datavaluefield="OrderID">
            <datasource>
                <transport>
                    <read url="/Index?handler=Read" data="forgeryToken"/>
                </transport>
            </datasource>
        </kendo-combobox>
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
* [Client-Side API of the ComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [Server-Side HtmlHelper API of the ComboBox](/api/combobox)
* [Server-Side TagHelper API of the ComboBox](/api/taghelpers/combobox)
* [Knowledge Base Section](/knowledge-base)