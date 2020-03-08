---
title: Add Command Buttons as Icons with No Text
description: An example on configuring a command button to contain only icons with no text in the Telerik UI Grid HtmlHelper for ASP.NET Core.
type: how-to
page_title: Implement Command Buttons with Icons Only
slug: grid-icon-command-button-no-text
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
			<td>Grid for Progress® Telerik UI® for ASP.NET MVC, Grid for Progress® Telerik UI® for ASP.NET Core</td>
		</tr>
	</tbody>
</table>


## Description

How can I set a command button in the Telerik UI Grid that contains only an icon and no text?

## Solution

Use either of the following approaches:

* Use CSS to style the **Edit** button by setting the `.k-grid-edit` CSS of the button as desired. Include the following configuration in the `k-button-icon` class.

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

* Create a custom template for the **Edit** button with an additional class. By using the [`onclick` event](https://api.jquery.com/on/) handler, set the [`editRow` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editrow) for the specific Grid row.

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

* [API Reference of the jQuery on Event](https://api.jquery.com/on/)
* [API Reference of the editRow Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editrow)
