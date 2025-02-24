---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI ButtonGroup component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_buttongroup_razorpage_aspnetcore
position: 8
---

# ButtonGroup in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ButtonGroup for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ButtonGroup component in a Razor Pages scenario.

For the complete project, refer to the [ButtonGroup in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ButtonGroup/ButtonGroupIndex.cshtml).

```tab-HtmlHelper(csthml)
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
```
```tab-TagHelper(cshtml)
        <kendo-buttongroup name="player"
                            on-select="onSelect">
                <buttongroup-items>
                    <item text="Month"></item>
                    <item text="Quarter"></item>
                    <item text="Year"></item>
                </buttongroup-items>
        </kendo-buttongroup>
```
```script
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
