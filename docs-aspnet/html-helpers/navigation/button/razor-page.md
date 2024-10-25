---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Button component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_button_razorpage_aspnetcore
position: 4
---

# Button in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Button for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Button component in a Razor Pages scenario.

For the complete project, refer to the [Button in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Button/ButtonIndex.cshtml).

```tab-HtmlHelper(csthml) 
       
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	<form method="post">
		<input type="text" name="description">
		<br/>
		@(Html.Kendo().Button()
			.Name("primaryTextButton")
			.ThemeColor(ThemeColor.Primary)
			.HtmlAttributes(new { type = "submit" })
			.Events(e => e.Click("onClick"))
			.Content("Submit")
		)
	</form>
	
```
{% if site.core %}
```TagHelper
<form method="post">
    <input type="text" name="description">
    <br />
    <kendo-button name="primaryTextButton"
                   on-click="onClick"
				   theme-color="ThemeColor.Primary"
                   type="submit">
        Submit
    </kendo-button>

</form>
```
{% endif %}
```script
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

