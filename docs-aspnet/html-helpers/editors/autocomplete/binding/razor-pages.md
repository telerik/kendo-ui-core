---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI AutoComplete component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_autocomplete_razorpage_aspnetcore
components: ["autocomplete"]
position: 5
---

# AutoComplete in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI AutoComplete for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_autocomplete_databinding_aspnetcore %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To bind the AutoComplete to a data set received from a remote endpoint within a Razor Pages application, follow the next steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel
        
        <div>
            @(Html.Kendo().AutoComplete()
                .Name("autocomplete")
                .DataTextField("ShipName")
                .DataSource(source =>
                {
                    source.Read(read => read
                        .Url(Url.Page("Index", "Read")).Data("forgeryToken"));
                })
            )
        </div>
    ```
    {% if site.core %}
    ```TagHelper
        @page
        @model IndexModel
        
        <div>
            <kendo-autocomplete name="autocomplete" 
                datatextfield="ShipName">
                <datasource>
                    <transport>
                        <read url="@Url.Page("Index", "Read")" data="forgeryToken"/>
                    </transport>
                </datasource>
            </kendo-autocomplete>
        </div>
    ```
    {% endif %}

1. Add an `AntiForgeryToken` at the top of the page to secure the requests.

    ```cshtml
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```javascript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied. For example, when the [server filtering]({% slug htmlhelpers_autocomplete_filtering_aspnetcore%}#server-filtering) of the AutoComplete is enabled, send the filter value along with the antiforgery token to the server using the JavaScript handler specified in the `Data()` option.

    ```HtmlHelper
        @page
        @model IndexModel

        <div>
            @(Html.Kendo().AutoComplete()
                .Name("autocomplete")
                .DataTextField("ShipName")
                .Filter("contains")
                .MinLength(3)
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
            <kendo-autocomplete name="autocomplete"
                datatextfield="ShipName"
                min-length="3"
                filter="FilterType.Contains">
                <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                    <transport>
                        <read url="@Url.Page("Index", "Read")" data="dataFunction"/>
                    </transport>
                </datasource>
            </kendo-autocomplete>
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

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        public JsonResult OnGetRead()
        {
            var autoCompleteData = new List<OrderViewModel>();
            // Populate the collection with the AutoComplete data.
            return new JsonResult(autoCompleteData);
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

    When the server filtering is enabled, intercept the filter value sent through the `dataFunction` handler in the Read method and filter the data on the server before returning it to the AutoComplete.

    ```C# PageModel
        public class IndexModel : PageModel
        {
            public JsonResult OnGetRead(string filterValue)
            {
                var autoCompleteData = new List<OrderViewModel>();
                // Populate the collection with the AutoComplete data.

                if (filterValue != null)
                {
                    var filteredData = autoCompleteData.Where(p => p.ShipName.Contains(filterValue));
                    return new JsonResult(filteredData);
                }
                return new JsonResult(autoCompleteData);
            }
        }
    ```

For the complete project, refer to the [AutoComplete in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/AutoComplete).

## Binding to a PageModel Property

To bind the AutoComplete to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the AutoComplete.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public string Country { get; set; }

            public void OnGet()
            {
                Country = "Italy";
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the AutoComplete to the property using the `AutoCompleteFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()

        @(Html.Kendo().AutoCompleteFor(m => m.Country)
            ... // Additional configuration options.
        )
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-autocomplete for="Country">
        <!-- Additional configuration options.-->
        </kendo-datetimepicker>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the AutoComplete](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
* [Server-Side HtmlHelper API of the AutoComplete](/api/autocomplete)
{% if site.core %}
* [Server-Side TagHelper API of the AutoComplete](/api/taghelpers/autocomplete)
{% endif %}
* [Knowledge Base Section](/knowledge-base)

