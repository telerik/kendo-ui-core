---
title:  Razor Pages
page_title: ASP.NET Core DropDownList Razor Pages | Telerik UI for ASP.NET Core
description: "Find out how to configure the ASP.NET Core DropDownList component in a Razor Pages scenario."
slug: htmlhelpers_dropdownlist_razorpage_aspnetcore
position: 6
---

# DropDownList in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI DropDownList for {{ site.framework }} in Razor Pages applications.

This article describeshow to configure the DropDownList component in a Razor Pages scenario.

For the complete project, refer to the [DropDownList in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DropDownList/DropDownListCrudOps.cshtml).

## Getting Started

The [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component offers the most versatile data binding approach. To connect the DropDownList to a dataset retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```Razor HtmlHelper_Index.cshtml
    @(Html.Kendo().DropDownList()
        .Name("ordersDDL")
        .DataTextField("ShipName")
        .DataValueField("OrderID")
        .DataSource(source =>
        {
            source.Read(read => read
                .Url("/Index?handler=Read").Data("forgeryToken"));
        })
    )
    ```
    {% if site.core %}
    ```Razor TagHelper_Index.cshtml
    <kendo-dropdownlist name="ordersDDL"
        datatextfield="ShipName"
        datavaluefield="OrderID">
        <datasource>
            <transport>
                <read url="/Index?handler=Read" data="forgeryToken"/>
            </transport>
        </datasource>
    </kendo-dropdownlist>
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

    Additional parameters can also be supplied. For example, when the [server filtering]({% slug htmlhelpers_dropdownlist_serverfiltering_aspnetcore%}#server-filtering) of the DropDownList is enabled, send the filter value along with the antiforgery token to the server using the JavaScript handler specified in the `Data()` option.

    ```HtmlHelper
        @page
        @model IndexModel
        <div>
            @(Html.Kendo().DropDownList()
                .Name("ordersDDL")
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
    ```TagHelper
        @page
        @model IndexModel
        @addTagHelper *, Kendo.Mvc

        <div>
            <kendo-dropdownlist name="ordersDDL" auto-bind="false"
                datatextfield="ShipName"
                datavaluefield="OrderID"
                min-length="3"
                filter="FilterType.Contains">
                <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                    <transport>
                        <read url="/Index?handler=Read" data="dataFunction"/>
                    </transport>
                </datasource>
            </kendo-dropdownlist>
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
            public JsonResult OnGetRead(string filterValue)
            {
                var dropdownListData = new List<OrderViewModel>();
                // Populate the collection with the DropDownList data.
                return new JsonResult(dropdownListData);
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

    When the server filtering is enabled, intercept the filter value sent through the `dataFunction` handler in the Read method and filter the data on the server before returning it to the DropDownList.

    ```C# PageModel
        public class IndexModel : PageModel
        {
            public JsonResult OnGetRead(string filterValue)
            {
                var dropdownListData = new List<OrderViewModel>();
                // Populate the collection with the DropDownList data.

                if (filterValue != null)
                {
                    var filteredData = dropdownListData.Where(p => p.ShipName.Contains(filterValue));
                    return new JsonResult(filteredData);
                }
                return new JsonResult(dropdownListData);
            }
        }
    ```

## Binding the DropDownList to a PageModel Property

To bind the DropDownList to a property from the PageModel, follow the next steps:

1. Add a property to the PageModel that must bind to the DropDownList.

    ```C# PageModel
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

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the DropDownList to the property using the `DropDownListFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().DropDownListFor(m => m.OrderID)  
            .DataTextField("ShipName")
            .DataValueField("OrderID")
            .DataSource(source =>
            {
                source.Read(read => read
                    .Url("/Index?handler=Read").Data("forgeryToken"));
            })
        )
    ```
    ```TagHelper
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
* [Client-Side API of the DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side HtmlHelper API of the DropDownList](/api/dropdownlist)
* [Server-Side TagHelper API of the DropDownList](/api/taghelpers/dropdownlist)
* [Knowledge Base Section](/knowledge-base)


