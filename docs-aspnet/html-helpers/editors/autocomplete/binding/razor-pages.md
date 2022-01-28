---
title:  Razor Page
page_title: Configure a DataSource for the AutoComplete for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI AutoComplete HtmlHelper for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_autocomplete_razorpage_aspnetcore
position: 3
---

# Razor Page

This article describes how to configure a Remote DataSource of a Telerik AutoComplete in a RazorPage scenario.

In order to set up the AutoComplete component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`). See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
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

