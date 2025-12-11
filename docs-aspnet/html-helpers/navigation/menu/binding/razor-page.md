---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI Menu component for {{ site.framework }} ."
slug: htmlhelpers_menu_razorpage_aspnetcore
components: ["menu"]
position: 8
---

# Menu in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Menu for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_menu_databinding_aspnetcore %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

In order to set up the Menu component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL must refer to the method name in the `PageModel`. To pass additional parameters through the `Read` request, such as antiforgery token, specify a JavaScript handler in the `Data()` option.

```HtmlHelper
@page
@model IndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()
	
@(Html.Kendo().Menu()
    .Name("navMenu")
    .DataTextField("Name")
    .DataSource(ds => ds
        .Read(r => r
            .Url(Url.Page("Index", "Read")).Data("dataFunction")
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
```TagHelper
@page
@model IndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<kendo-menu name="navMenu" datatextfield="Name">
    <hierarchical-datasource>
        <schema>
            <hierarchical-model children="Products"></hierarchical-model>
        </schema>
        <transport>
            <read url="@Url.Page("Index", "Read")" data="dataFunction" />
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
```C# PageModel
public class IndexModel : PageModel
{
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
}
```

For the complete project, refer to the [Menu in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Menu/MenuRemoteData.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Menu](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/menu)
* [Server-Side HtmlHelper API of the Menu](/api/menu)
* [Server-Side TagHelper API of the Menu](/api/taghelpers/menu)
* [Knowledge Base Section](/knowledge-base)

