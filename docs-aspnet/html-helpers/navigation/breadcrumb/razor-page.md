---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Breadcrumb component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_breadcrumb_razorpage_aspnetcore
components: ["breadcrumb"]
position: 7
---

# Breadcrumb in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Breadcrumb for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Local Data

The following example demonstrates how to bind the Breadcrumb to a collection of items defined in the `PageModel`.

```HtmlHelper
    @page
    @model BreadcrumbIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	@(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .Items(items =>
        {
            foreach(var item in Model.Items)
            {
                items.Add()
                 .Type(item.IsRoot == true ? BreadcrumbItemType.RootItem : BreadcrumbItemType.Item)
                 .Href(item.Href)
                 .Text(item.Text)
                 .Icon(item.Icon)
                 .ShowText(true);
            }                   
        })
        .Editable(true)
    )
```
```C# PageModel
public class BreadcrumbIndexModel : PageModel
{	
	public List<BreadcrumbItem> Items { get; set; }
        
    public void OnGet()
    {
        Items = new List<BreadcrumbItem>()
        {
            new BreadcrumbItem(){ Text = "All components", Href = "https://demos.telerik.com/aspnet-core/", Icon = "home", IsRoot = true},
            new BreadcrumbItem(){ Text = "Breadcrumb", Href = "/breadcrumb", Icon= "globe", IsRoot = false },
            new BreadcrumbItem(){ Text = "Icons", Href = "/icons", Icon="globe", IsRoot = false},
        };
    }

    public class BreadcrumbItem
    {
        public string Href { get; set; }
        public string Text { get; set; }
        public string Icon { get; set; }
        public bool IsRoot { get; set; }
    }
}
```

For the complete project, refer to the [Breadcrumb in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Breadcrumb/BreadcrumbIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Breadcrumb](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/breadcrumb)
* [Server-Side HtmlHelper API of the Breadcrumb](/api/breadcrumb)
* [Server-Side TagHelper API of the Breadcrumb](/api/taghelpers/breadcrumb)
* [Knowledge Base Section](/knowledge-base)

