---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Button component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_contextmenu_razorpage_aspnetcore
position: 3
---

# ContextMenu in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ContextMenu for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ContextMenu component in a Razor Pages scenario.

For the complete project, refer to the [ContextMenu in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ContextMenu/ContextMenuIndex.cshtml).

```tab-HtmlHelper(csthml)   
     
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	<div id="target">Right click here</div>

	@(Html.Kendo().ContextMenu()
        .Name("RequestMenu")
        .Target("#target")
        .Orientation(ContextMenuOrientation.Vertical)
        .Items(items =>
        {
            items.Add()
                .Text("Edit");

            items.Add()
                 .Text("Cancel");
        })
        .Events(e =>
        {
            e.Select("onSelect");

        })
	)

	<script>
		function onSelect(e) {
			if ($(e.item).text() == "Edit") {
				$.ajax({
					url: "/ContextMenu/ContextMenuIndex?handler=Custom",
					type: "POST",
					contentType: "application/json",
					headers: {
						RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
					}
				});
			}        
		}
	</script>
```
{% if site.core %}
```tab-TagHelper(cshtml)
	<div id="target">Right click here</div>

    <kendo-contextmenu name="menu" target="#target" orientation="ContextMenuOrientation.Vertical"
		on-select="onSelect">
        <items>
            <menu-item text="Edit">
            </menu-item>
            <menu-item text="Cancel">
            </menu-item>
        </items>
    </kendo-contextmenu>

	<script>
        function onSelect(e) {
            if ($(e.item).text() == "Edit") {
                $.ajax({
                    url: "/ContextMenu/ContextMenuIndex?handler=Custom",
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                    }
                });
            }        
        }
    </script>
```
{% endif %}

```tab-PageModel(cshtml.cs)      

    public void OnPostCustom()
        {
			....
        }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [ContextMenu Overview]({% slug htmlhelpers_contextmenu_aspnetcore %})

