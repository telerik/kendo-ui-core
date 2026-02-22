---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Button component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_button_razorpage_aspnetcore
components: ["button"]
position: 6
---

# Button in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Button for {{ site.framework }} in Razor Pages applications.

This article demonstrates how to configure the Button component to handle form submissions in a Razor Pages application.

For the complete project, refer to the [Button in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Button/ButtonIndex.cshtml).

```HtmlHelper
    @page
	@model ButtonIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	<form method="post">
		<input type="text" name="description">
		<br/>
		@(Html.Kendo().Button()
			.Name("submitBtn")
			.ThemeColor(ThemeColor.Primary)
			.HtmlAttributes(new { type = "submit" })
			.Events(e => e.Click("onClick"))
			.Content("Submit")
		)
	</form>
```
{% if site.core %}
```TagHelper
@page
@model ButtonIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<form method="post">
    <input type="text" name="description">
    <br />
    <kendo-button name="submitBtn"
		on-click="onClick"
		theme-color="ThemeColor.Primary"
		type="submit">
        Submit
    </kendo-button>
</form>
```
{% endif %}
```JS script
<script>
	function onClick() {
		return kendo.antiForgeryTokens();
	}
</script>
```
```C# PageModel
public class ButtonIndexModel : PageModel
{ 
	public void OnPost(string description)
	{
		...
	}
}
```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Button](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/button)
* [Server-Side HtmlHelper API of the Button](/api/button)
* [Server-Side TagHelper API of the Button](/api/taghelpers/button)
* [Knowledge Base Section](/knowledge-base)

