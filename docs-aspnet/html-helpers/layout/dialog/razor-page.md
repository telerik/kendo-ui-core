---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Dialog component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_dialog_razorpage_aspnetcore
components: ["dialog"]
position: 6
---

# Dialog in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Dialog for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Handling Dialog Actions

The following example demonstrates how to configure Dialog action buttons and handle their click events with AJAX requests to the `PageModel` in a Razor Pages application. 

```HtmlHelper
@page
@model DialogIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

@(Html.Kendo().Dialog()
	.Name("dialog")
	.Title("Data Update")
	.Content("<p>Would you like to confirm updating the data?<p>")
	.Width(400)
	.Modal(false)
	.Actions(actions =>
	{
		actions.Add().Text("Cancel");
		actions.Add().Text("Send data").Primary(true).Action("onSendData");
	})
)
```
{% if site.core %}
```TagHelper
@page
@model DialogIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<kendo-dialog name="dialog" title="Data Update" width="400" modal="false" >
	<actions>            
		<action text="Cancel">
		</action>
		<action text="Send data" primary="true" action="onSendData">
		</action>
	</actions>
	<content>
		<p>Would you like to confirm updating the data?</p>
	</content>
</kendo-dialog>
```
```JS Scripts
<script>
	function onSendData() {
		$.ajax({
			url: "/Dialog/DialogIndex",
			type: "POST",
			data: { custom : "some text" },
			headers: {
				RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken
			},
			dataType: "json"
		});
	}
</script>
```
{% endif %}
```C# PageModel
public class DialogIndexModel : PageModel
{
	public void OnGet()
	{

	}

	public void OnPost(string custom)
	{

	}
}
```

For the complete project, refer to the [Dialog in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Dialog/DialogIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Dialog](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dialog)
* [Server-Side HtmlHelper API of the Dialog](/api/dialog)
* [Server-Side TagHelper API of the Dialog](/api/taghelpers/dialog)
* [Knowledge Base Section](/knowledge-base)

