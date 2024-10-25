---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI ComboBox component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_combobox_razorpage_aspnetcore
position: 3
---

# ComboBox in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ComboBox for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ComboBox component in a Razor Pages scenario.

For the complete project, refer to the [ComboBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ComboBox/ComboBoxCrud.cshtml).

In order to set up the ComboBox component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```HtmlHelper       
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	@(Html.Kendo().ComboBox()
        .Name("combobox")
        .DataTextField("ShipName")
        .DataValueField("ShipCity")                
        .AutoBind(false)
        .Filter(FilterType.Contains)
        .DataSource(ds => ds
            .Custom()
            .Transport(transport => transport
                .Read(r => r
                    .Url("/ComboBox/ComboBoxCrud?handler=Read").Data("dataFunction")
                ))
                .ServerFiltering(true)
            )
        )
```
{% if site.core %}
```TagHelper
<kendo-combobox name="combobox"
                datatextfield="ShipName"
                datavaluefield="ShipCity"
                auto-bind="false"
                filter="FilterType.Contains">
    <datasource server-filtering="true">
        <transport>
            <read url="@Url.Content("/ComboBox/ComboBoxCrud?handler=Read")" data="dataFunction"/>
        </transport>
    </datasource>
</kendo-combobox>
```
{% endif %}

```script
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
```PageModel(cshtml.cs)      

    public JsonResult OnGetRead(string filterValue)
    {
        if (filterValue != null)
        {
            var filteredData = orders.Where(p => p.ShipName.Contains(filterValue));
            return new JsonResult(filteredData);
        }
        return new JsonResult(orders);
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_combobox_databinding_aspnetcore %})

