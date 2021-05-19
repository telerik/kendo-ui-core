---
title:  Razor Page
page_title: Configure a DataSource for the MultiColumnComboBox for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI MultiColumnComboBox HtmlHelper for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_multicolumncombobox_razorpage_aspnetcore
position: 3
---

# Razor Page

# MultiColumnComboBox Remote Data Binding in Razor Pages

This article describes how to configure a Remote DataSource of a Telerik MultiColumnComboBox in a RazorPage scenario.

In order to set up the MultiColumnComboBox component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`). See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

	<h1>MultiColumnComboBox Index</h1>

	@(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ShipName")
        .DataValueField("ShipCity")
        .Filter(FilterType.Contains)
        .Columns(columns =>
            {
                columns.Add().Field("ShipName").Title("Ship Name").Width("200px");
                columns.Add().Field("ShipCity").Title("Ship City").Width("200px");
                columns.Add().Field("Freight").Title("Freight").Width("200px");
            })
        .DataSource(ds => ds
            .Custom()
            .Transport(transport => transport
                .Read(r => r
                    .Url("/MultiColumnComboBox/MultiColumnComboBoxIndex?handler=Read").Data("dataFunction")
                ))
                .ServerFiltering(true)
            )
        )
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
```tab-PageModel(cshtml.cs)      

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
* [DataBinding Overview]({% slug htmlhelpers_multicolumncombobox_aspnetcore %})

