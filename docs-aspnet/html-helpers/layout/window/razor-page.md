---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Window component for {{ site.framework }} in a Razor Pages."
slug: htmlhelpers_window_razorpage_aspnetcore
position: 8
---

# Window in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Window for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Window component in a Razor Pages scenario.

For the complete project, refer to the [Window in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Window/WindowIndex.cshtml).

```tab-HtmlHelper(cshtml)  	
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
{% if site.core %}
```tab-TagHelper(cshtml)
 	@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

	@{
    	string[] actions = new string[] { "Minimize", "Maximize", "Close" };
	}

	<kendo-window name="window" title="Window title" actions="@actions">
	    <content><p>@Model.Text</p></content>
	</kendo-window>
```
{% endif %}
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

