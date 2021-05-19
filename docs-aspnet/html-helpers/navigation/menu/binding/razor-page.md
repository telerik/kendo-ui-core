---
title:  Razor Page
page_title: Configure a DataSource for the Menu for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI Menu HtmlHelper for {{ site.framework }} ."
slug: htmlhelpers_menu_razorpage_aspnetcore
position: 5
---

# Razor Page

This article describes how to configure a Remote DataSource of a Telerik Menu in a RazorPage scenario.

In order to set up the Menu component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`). See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)   
     
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

