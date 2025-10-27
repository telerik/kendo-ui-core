---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI AutoComplete component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_autocomplete_razorpage_aspnetcore
position: 5
---

# AutoComplete in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI AutoComplete for {{ site.framework }} in Razor Pages applications.

This article demonstrates how to configure the AutoComplete component in a Razor Pages scenario.

For the complete project, refer to the [AutoComplete in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/AutoComplete).

## Getting Started

To configure the `Read` operation of the AutoComplete DataSource within a Razor Pages application, follow the next steps:

1. Specify the Read operation in the DataSource configuration. The URL must refer to the method name in the PageModel.

```HtmlHelper
    @page
    @model IndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    
    <div>
        @(Html.Kendo().AutoComplete()
              .Name("autocomplete")
              .DataTextField("ShipName")
              .Filter("contains")
              .MinLength(3)
              .HtmlAttributes(new { style = "width:100%" })
              .DataSource(ds => ds
                  .Custom()
                  .Transport(transport => transport
                      .Read(r => r
                          .Url("/Index?handler=Read").Data("dataFunction")
                      ))
                      .ServerFiltering(true)
              )
        )
</div>

```
{% if site.core %}
```TagHelper
    @page
    @model IndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    
    <div>
        <kendo-autocomplete name="autocomplete"
                            datatextfield="ShipName"
                            filter="FilterType.Contains"
                            min-length="3">
            <datasource type="DataSourceTagHelperType.Custom"
                        server-filtering="true">
                <transport>
                    <read url="/Index?handler=Read" data="dataFunction" />
                </transport>
            </datasource>
        </kendo-autocomplete>
    </div>

```
{% endif %}

2. Add an `AntiForgeryToken` at the top of the page to secure the requests.

```cshtml
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
```

3. Send the `AntiForgeryToken` with the Read request.

```javascript
    <script>
        function dataFunction() {
            return {
                __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                filterValue: $("#autocomplete").val()
            };
        }
    </script>
```

You can also include additional parameters if needed:
```javascript
    <script>
        function dataFunction() {
            return {
                __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                filterValue: $("#autocomplete").val()
            };
        }
    </script>

```

4. Add a handler method for the Read operation in the cshtml.cs file.

```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        public static List<OrderViewModel> orders;

        public void OnGet()
        {
            if (orders == null)
            {
                orders = new List<OrderViewModel>();

                Enumerable.Range(1, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                {
                    ShipName = "ship name " + i
                }));

            }
        }

        public JsonResult OnGetRead(string filterValue)
        {
            if (filterValue != null)
            {
                var filteredData = orders.Where(p => p.ShipName.Contains(filterValue));
                return new JsonResult(filteredData);
            }
            return new JsonResult(orders);
        }
    }
```

## Binding the AutoComplete to a PageModel Property

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

        @(Html.Kendo().AutoCompleteFor(m => m.Country))
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-autocomplete for="Country">
        </kendo-datetimepicker>
    ```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the AutoComplete](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
* [Server-Side HtmlHelper API of the AutoComplete](/api/autocomplete)
{% if site.core %}
* [Server-Side TagHelper API of the AutoComplete](/api/taghelpers/autocomplete)
{% endif %}
* [Knowledge Base Section](/knowledge-base)

