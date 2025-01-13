---
title:  Razor Pages
page_title: ASP.NET Core DropDownList Razor Pages | Telerik UI for ASP.NET Core
description: "Find out how to configure the ASP.NET Core DropDownList component in a Razor Pages scenario."
slug: htmlhelpers_dropdownlist_razorpage_aspnetcore
position: 3
---

# ASP.NET Core DropDownList in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 
You can seamlessly integrate the Telerik UI DropDownList for {{ site.framework }} in Razor Pages applications.
This article describeshow to configure the DropDownList component in a Razor Pages scenario.
For the complete project, refer to the [DropDownList in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DropDownList).

## Getting Started
In order to set up the Razor DropDownList component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

    ```tab-HtmlHelper(csthml)    
    
        @(Html.Kendo().DropDownList()
                .Name("products")
                .DataTextField("ShipName")
                .DataValueField("ShipCity")
                .HtmlAttributes(new { style = "width:300px;" })
                .AutoBind(false)
                .Filter(FilterType.Contains)      
                .DataSource(ds => ds
                    .Custom()
                    .Transport(transport => transport
                        .Read(read => read
                            .Url("/DropDownList/DropDownListCrudOps?handler=Read").Data("dataFunction")
                        ))
                        .ServerFiltering(true)
                )
        )
    ```
{% if site.core %}
    ```TagHelper
    
        <kendo-dropdownlist name="products"
                            datatextfield="ShipName"
                            datavaluefield="ShipCity"
                            auto-bind="false"
                            filter="FilterType.Contains">
            <datasource server-filtering="true">
                <transport>
                    <read url="@Url("/DropDownList/DropDownListCrudOps?handler=Read")" data="dataFunction" />
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

1. Send the `AntiForgeryToken` with the [Read, Create, Update, Destroy] request.

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```
        <script>
            function dataFunction() {
                var value = $("#products").getKendoDropDownList().filterInput.val();
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    filterValue: value
                };
            }   
        </script>
    ```

1. Within the `cshtml.cs` file, add a handler method for the Read operation that returns the dataset.

    ```tab-PageModel(cshtml.cs)
        public JsonResult OnGetRead(string filterValue)
        {
            if (filterValue != null)
            {
                //orders is the DBContext
                var filteredData = orders.Where(p => p.ShipName.Contains(filterValue)); 
                return new JsonResult(filteredData);
            }
            return new JsonResult(orders);
        }
    ```

## See Also
* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side HtmlHelper API of the DropDownList](/api/dropdownlist)
* [Server-Side TagHelper API of the DropDownList](/api/taghelpers/dropdownlist)
* [Knowledge Base Section](/knowledge-base)


