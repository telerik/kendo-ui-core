---
title: Add a Custom Button in Grid ToolBar
description: Configure the Kendo UI Grid's toolbar to have a custom button along with the original buttons without creating a template.
type: how-to
page_title: Include a separate button in Grid Toolbar
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
			<td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description
Is there a way to create one button in the toolbar right aligned from the other buttons that opens a Kendo UI Window in the Kendo UI Grid?

## Solution
One way you can add a custom button is to include a [custom command button](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridToolBarCommandFactory#custom) in the toolbar.

```razor
    //toolbar in Kendo UI Grid
    .ToolBar(e => {
        e.Pdf();
        e.Excel();
        e.Custom().Text("Instructions").HtmlAttributes(new { id = "customButton", @class="floatRight" });
    })
```

Next, on the click event of the button, add the logic to [open the Kendo UI Window](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/open):

```javascript
    $("#grid").on("click", "#customButton", function (e) {
        e.preventDefault();  //prevents postback

        var window = $("#window").data("kendoWindow");
        window.open();
    });
```

Finally, add some style to right align the Kendo UI Button.

```css
    .floatRight {
        float: right;
    }
```

## See Also
* [custom method - GridToolBarCommandFactory's API Reference](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridToolBarCommandFactory#custom)
* [open method - Window API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/open)
