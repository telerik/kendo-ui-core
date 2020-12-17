---
title:  Razor Page
page_title: Configure a Notification in Razor Page.
description: "An example on how to configure the Telerik UI Notification HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_notification_razorpage_aspnetcore
position: 6
---

# Razor Page

This article describes how to configure the Telerik UI Notification HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	
	@(Html.Kendo().Notification()
		.Name("notification")
		.Width("12em")		
		.Templates(t =>
		{
			t.Add().Type("time")
				.ClientTemplate("<div style='padding: .6em 1em'>Time is: <span class='timeWrap'>#: time #</span></div>");
		})
	)	
```
```tab-PageModel(cshtml.cs)      
	
	public void OnGet()
    {

    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})

