---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI Menu component for {{ site.framework }} ."
slug: htmlhelpers_menu_razorpage_aspnetcore
position: 5
---

# Menu in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Menu for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Menu component in a Razor Pages scenario.

For the complete project, refer to the [Menu in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Menu/MenuRemoteData.cshtml).

In order to set up the Menu component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```tab-HtmlHelper(csthml)   
     
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	@(Html.Kendo().Menu()
            .Name("Menu")
            .DataTextField("Name")
            .DataSource(ds => ds
                .Read(r => r
                    .Url("/Menu/MenuRemoteData?handler=Read").Data("dataFunction")
                )
            .Model(model => model.Children("Products")))
    )

	<script>  
		function dataFunction() {     
			return kendo.antiForgeryTokens();
		}
	</script>
```
    {% if site.core %}
    ```tab-TagHelper(cshtml)
        <kendo-menu name="Menu" datatextfield="Name">
            <hierarchical-datasource>
                <schema>
                    <hierarchical-model children="Products"></hierarchical-model>
                </schema>
                <transport>
                    <read url="/Menu/MenuRemoteData?handler=Read" data="dataFunction" />
                </transport>
            </hierarchical-datasource>
        </kendo-menu>
        
        <script>  
            function dataFunction() {     
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
    {% endif %}
```tab-PageModel(cshtml.cs)      

    public JsonResult OnGetRead()
    {
		//categories is the DBContext
        var result = categories.ToList().Select((category) =>
			new
            {
                Name = category.CategoryName,
                Products = category.Products
                    .Where((product) => product.CategoryID == category.CategoryID)
                    .Select((product) => new { Name = product.ProductName })
            }
        );
        return new JsonResult(result);
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_menu_databinding_aspnetcore %})

