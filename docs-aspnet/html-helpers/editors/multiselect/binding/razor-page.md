---
title:  Razor Pages
page_title: Razor Pages
description: "Telerik UI MultiSelect for {{ site.framework }} in a RazorPages application."
slug: htmlhelpers_multiselect_razorpage_aspnetcore
position: 7
---

# MultiSelect in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI MultiSelect for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the MultiSelect component in a Razor Pages scenario.

For the complete project, refer to the [MultiSelect in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MultiSelect/MultiSelectIndex.cshtml).

In order to set up the MultiSelect component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```HtmlHelper
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
                )
            )
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
```TagHelper
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
```C# PageModel
	
		public JsonResult OnGetRead(string filterValue)
		{
			var data = customers;
            return new JsonResult(data);
		}
```

## Binding the MultiSelect to a PageModel Property

To bind the MultiSelect to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the MultiSelect.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            public int[] Orders { get; set; }


            public void OnGet()
            {
                Orders = new int[] { 2, 3 }; // Assign value to the "Orders" property, if needed.
            }

            public JsonResult OnGetRead()
            {
                var multiSelectData = new List<OrderViewModel>();
                // Populate the collection with the MultiSelect data.
                return new JsonResult(multiSelectData);
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the MultiSelect to the property using the `MultiSelectFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().MultiSelectFor(m => m.Orders)  
            .DataTextField("ShipName")
            .DataValueField("OrderID")
            .DataSource(source =>
            {
                source.Read(read => read
                    .Url("/Index?handler=Read").Data("forgeryToken"));
            })
        )

        <script>
            function forgeryToken(e) {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-multiselect for="Orders"
            datatextfield="ShipName" 
            datavaluefield="OrderID">
            <datasource>
                <transport>
                    <read url="/Index?handler=Read" data="forgeryToken"/>
                </transport>
            </datasource>
        </kendo-multiselect>

        <script>
            function forgeryToken(e) {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the MultiSelect](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Server-Side HtmlHelper API of the MultiSelect](/api/multiselect)
* [Server-Side TagHelper API of the MultiSelect](/api/taghelpers/multiselect)
* [Knowledge Base Section](/knowledge-base)


