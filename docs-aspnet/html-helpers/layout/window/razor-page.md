---
title:  Razor Page
page_title: Configure a Window in Razor Page.
description: "An example on how to configure the Telerik UI Window HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_window_razorpage_aspnetcore
position: 8
---

# Razor Page

This article describes how to configure the Telerik UI Window HtmlHelper for {{ site.framework }} in a RazorPage scenario.

The example below demonstrates how to load content in Window from the server. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)  	
	@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

	@(Html.Kendo().Window()
		.Name("window")
		.Title("Window title")
		.Content(@<text>
			<p>
             @Model.Text
			</p>        
		</text>)
		.Actions(actions => actions
			.Minimize()
			.Maximize()
			.Close()
		)   
		.Width(600)    
	)
```
```tab-PageModel(cshtml.cs)      

    public string Text = String.Empty;
    public void OnGet()
    {
        Text = "Lorem ipsum dolor sit amet...";
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Window Overview]({% slug htmlhelpers_window_aspnetcore %})

