---
title: Column command without text
description: How to configure a command button to contain only an icon without text.
type: how-to
page_title: Command Button with Icon Only | Kendo UI Grid
slug: grid-icon-command-button-no-text
position: 
tags: grid, icon, command, button, no, text, edit, column
ticketid: 1422170
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.2.619</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for ASP.NET MVC, Progress® Kendo UI® Grid for ASP.NET Core</td>
		</tr>
	</tbody>
</table>


## Description
How can I set a Kendo UI Grid's command button to only contain an icon with no text?

## Solution
There are a couple of ways in which you can set the edit command button to be icon-only:

### 1.  Use CSS to style the Edit Button

Using the same configuration for the edit command, set the .k-grid-edit button's CSS to your preference.  Part of the following configuration is included in the k-button-icon class:

```css
      .k-grid tbody .k-grid-edit {
          min-width: 0;
          width: calc(2px + .75rem + 1.5em);
          height: calc(2px + .75rem + 1.5em);
          padding: .375rem;
      }
 
      .k-grid tbody .k-grid-edit .k-icon{
           margin: 0;
      }
```

```razor
.Columns(columns =>
{
    columns.Bound(c => c.ProductName).Width(150);
    columns.Bound(c => c.Discontinued).Width(75);
    columns.Command(command => { command.Edit().Text(" "); command.Destroy(); }).Width(300);
})
```

### 2.  Button Template

Create a custom template for the Edit button with an additional class.  Then, using an [onclick event](https://api.jquery.com/on/) handler, use the [editRow method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editrow) for the specific Grid row:

```razor
.Columns(columns =>
{
    columns.Bound(c => c.ProductName).Width(150);
    columns.Bound(c => c.Discontinued).Width(75);
    columns.Command(command => { command.Edit().Template("<button type=\"button\" class=\"k-button k-button-icon edit\"><span class=\"k-icon k-i-edit\"></span></button>"); command.Destroy(); }).Width(300);
})
```

```javascript
$(document).ready(function () {
    $("#grid").on("click", ".edit", function () {
         var row = $(this).closest("tr");
         $("#grid").data("kendoGrid").editRow(row);
    });
});
```


## See Also
* [on - jQuery API Documentation](https://api.jquery.com/on/)
* [editRow - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editrow)
