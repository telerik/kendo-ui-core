---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Breadcrumb component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_breadcrumb_razorpage_aspnetcore
position: 7
---

# Breadcrumb in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Breadcrumb for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Breadcrumb component in a Razor Pages scenario.

For the complete project, refer to the [Breadcrumb in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Breadcrumb/BreadcrumbIndex.cshtml).

```tab-HtmlHelper(csthml)        
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
```tab-PageModel(cshtml.cs)      
	
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
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Breadcrumb Overview]({% slug htmlhelpers_breadcrumb_aspnetcore_overview %})

