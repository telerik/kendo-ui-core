---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Window component for {{ site.framework }} in a Razor Pages."
slug: htmlhelpers_window_razorpage_aspnetcore
components: ["window"]
position: 12
---

# Window in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Window for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding Content to PageModel Property

The following example demonstrates how to configure the Window content based on properties from the `PageModel`.

```HtmlHelper
	@page
	@model WindowIndexModel

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
```TagHelper
	@page
	@model WindowIndexModel

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
```C# PageModel
public class WindowIndexModel : PageModel
{
    public string Text = String.Empty;
    public void OnGet()
    {
        Text = "Lorem ipsum dolor sit amet...";
    }
}
```

For the complete project, refer to the [Window in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Window/WindowIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Window](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/window)
* [Server-Side HtmlHelper API of the Window](/api/window)
* [Server-Side TagHelper API of the Window](/api/taghelpers/window)
* [Knowledge Base Section](/knowledge-base)

