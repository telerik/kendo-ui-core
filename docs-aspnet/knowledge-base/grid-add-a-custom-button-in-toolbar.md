---
title: Adding a Custom Button in the Grid's ToolBar
description: Learn how to configure the {{ site.product }} Grid toolbar to have a custom button along with the original buttons without creating a template.
type: how-to
page_title: Include a Separate Button in the Grid's Toolbar
slug: grid-add-a-custom-button-in-toolbar
position: 
tags: grid, button, toolbar
ticketid: 1461293
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.406</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>


## Description

Is there a way to create one button in the toolbar right aligned from the other buttons that opens a {{ site.product }} Window in the Grid for {{ site.framework }}?

## Solution

To add a custom button:

1. Include a [custom command button](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory#custom) in the toolbar.

    ```razor
        // Toolbar in the Grid
        .ToolBar(e => {
            e.Pdf();
            e.Excel();
            e.Custom().Text("Instructions").HtmlAttributes(new { id = "customButton", @class="floatRight" });
        })
    ```

1. On the click event of the button, add the logic to [open the {{ site.product }} Window](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/open).

    ```javascript
        $("#grid").on("click", "#customButton", function (e) {
            e.preventDefault();  //prevents postback

            var window = $("#window").data("kendoWindow");
            window.open();
        });
    ```

1. Finally, add some style to right align the {{ site.product }} Button.

    ```css
        .floatRight {
            float: right;
        }
    ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
