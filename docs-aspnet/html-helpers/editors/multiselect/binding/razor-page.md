---
title:  Razor Page
page_title: Configure a DataSource for the MultiSelect for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI MultiSelect component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_multiselect_razorpage_aspnetcore
position: 3
---

# MultiSelect Remote Data Binding in Razor Pages

This article describes how to configure a Remote DataSource of a Telerik MultiSelect in a RazorPage scenario.

In order to set up the MultiSelect component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`). See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-HtmlHelper(cshtml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	<h1>MultiSelect Index</h1>
	
	@(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("Name")
        .DataValueField("CustomerId")
        .Filter(FilterType.Contains)
        .ItemTemplate("<span>  #: data.CustomerId # </span> <h4> #: data.Name # <h4>")
        .DataSource(ds => ds
            .Custom()
            .Transport(transport => transport
                .Read(r => r
                    .Url("/MultiSelect/MultiSelectIndex?handler=Read").Data("forgeryToken")
                ))
                .ServerFiltering(false)
            )
        )

	<script>
		function forgeryToken() {
			return kendo.antiForgeryTokens();
		}
	</script>
```
{% if site.core %}
```tab-TagHelper(cshtml)    
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>MultiSelect Index</h1>   
    
    <kendo-multiselect name="customers"
                       datatextfield="Name"
                       datavaluefield="CustomerId"
                       filter="FilterType.Contains"
                       item-template="<span>  #: data.CustomerId # </span> <h4> #: data.Name # <h4>">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="false">
            <transport>
                 <read url="/MultiSelect/MultiSelectIndex?handler=Read" data="forgeryToken" />
            </transport>
        </datasource>
    </kendo-multiselect>   
    
    <script>
        function forgeryToken() {
        	return kendo.antiForgeryTokens();
        }
    </script>
```
{% endif %}
```tab-PageModel(cshtml.cs)      
	
		public JsonResult OnGetRead(string filterValue)
		{
			var data = customers;
            return new JsonResult(data);
		}
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_multicolumncombobox_aspnetcore %})

