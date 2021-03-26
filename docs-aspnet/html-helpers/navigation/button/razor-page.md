---
title:  Razor Page
page_title: Configure a submit Button in Razor Page.
description: "An example on how to configure the Telerik UI Button HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_button_razorpage_aspnetcore
position: 4
---

# Razor Page

This article describes how to configure the Telerik UI Button HtmlHelper for {{ site.framework }} in a RazorPage scenario.

The example below demonstrates how to pass antiforgery token when a Button is clicked. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml) 
       
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	<form method="post">
		<input type="text" name="description">
		<br/>
		@(Html.Kendo().Button()
			.Name("primaryTextButton")
			.HtmlAttributes(new { type = "submit", @class = "k-primary" })
			.Events(e => e.Click("onClick"))
			.Content("Submit")
		)
	</form>
	
	<script>
		function onClick() {
			return kendo.antiForgeryTokens();
		}
	</script>
```
```tab-PageModel(cshtml.cs)      

    public class ButtonIndexModel : PageModel
    { 
        public void OnPost(string description)
        {
			.....
        }
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Button Overview]({% slug htmlhelpers_button_aspnetcore %})

