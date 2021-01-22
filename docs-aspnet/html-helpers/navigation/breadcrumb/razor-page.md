---
title:  Razor Page
page_title: Configure a Breadcrumb in Razor Page.
description: "An example on how to configure the Telerik UI Breadcrumb HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_breadcrumb_razorpage_aspnetcore
position: 6
---

# Razor Page

This article describes how to configure the Telerik UI Breadcrumb HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
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

