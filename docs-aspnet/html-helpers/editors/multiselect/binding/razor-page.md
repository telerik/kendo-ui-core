---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI MultiSelect component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_multiselect_razorpage_aspnetcore
position: 3
---

# MultiSelect in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI MultiSelect for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the MultiSelect component in a Razor Pages scenario.

For the complete project, refer to the [MultiSelect in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MultiSelect/MultiSelectIndex.cshtml).

In order to set up the MultiSelect component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

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

