---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI AutoComplete component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_autocomplete_razorpage_aspnetcore
position: 3
---

# AutoComplete in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI AutoComplete for {{ site.framework }} in Razor Pages applications.

This article showcases how to configure the AutoComplete component in a Razor Pages scenario.

For the complete project, refer to the [AutoComplete in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/AutoComplete).

## Getting Started

In order to set up the AutoComplete component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```tab-HtmlHelper(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

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
                        .Url("/AutoComplete/AutoCompleteCRUDOperations?handler=Read").Data("dataFunction")
                    ))
                    .ServerFiltering(true)
                )
    )
    <script>

        function dataFunction() {
            var value = $("#autocomplete").val();
            return {
                __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                filterValue: value
            };
        }

    </script>
```
{% if site.core %}
```TagHelper
<kendo-autocomplete name="autocomplete"
                    datatextfield="ShipName"
                    filter="FilterType.Contains"
                    min-length="3">
    <datasource type="DataSourceTagHelperType.Custom"
                server-filtering="true">
        <transport>
            <read url="/AutoComplete/AutoCompleteCRUDOperations?handler=Read" data="dataFunction" />
        </transport>
    </datasource>

</kendo-autocomplete>
```
{% endif %}
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

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_autocomplete_databinding_aspnetcore %})

