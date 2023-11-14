---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI DropDownList component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_dropdownlist_razorpage_aspnetcore
position: 3
---

# DropDownList in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI DropDownList for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the DropDownList component in a Razor Pages scenario.

For the complete project, refer to the [DropDownList in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DropDownList/DropDownListCrudOps.cshtml).

In order to set up the DropDownList component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```tab-HtmlHelper(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

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
```script
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
* [DataBinding Overview]({% slug htmlhelpers_dropdownlist_databinding_aspnetcore %})

