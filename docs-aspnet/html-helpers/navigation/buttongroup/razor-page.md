---
title:  Razor Page
page_title: Configure the ButtonGroup in a Razor Page.
description: "An example on how to configure the Telerik UI ButtonGroup HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_buttongroup_razorpage_aspnetcore
position: 6
---

# Razor Page

This article describes how to configure the Telerik UI ButtonGroup HtmlHelper for {{ site.framework }} in a RazorPages scenario.

See the ButtonGroup configuration in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.ButtonGroup.ButtonGroupIndexModel
@{
	ViewData["Title"] = "ButtonGroupIndex";
}

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>ButtonGroupIndex</h1>

@(Html.Kendo().ButtonGroup()
    .Name("buttonGroup")
    .Items(t =>
    {
        t.Add().Text("Month");
        t.Add().Text("Quarter");
        t.Add().Text("Year");
    })
    .Events(ev => ev.Select("onSelect"))
)

<script>
	function onSelect(e) {
		console.log("selected index:" + e.indices);
	}
</script>
```
```tab-PageModel(cshtml.cs)
    public class ButtonGroupIndexModel : PageModel
    {
        public void OnGet()
        {

        }
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [ButtonGroup Overview]({% slug htmlhelpers_buttongroup_aspnetcore %})
