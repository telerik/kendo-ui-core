---
title: Adding Command Buttons as Icons with No Text
description: An example on configuring a command button to contain only icons with no text in the {{ site.product }} Grid HtmlHelper.
type: how-to
page_title: Implement Command Buttons with Icons Only
slug: grid-icon-command-button-no-text
tags: grid, icon, command, button, no, text, edit, column
ticketid: 1422170
res_type: kb
components: ["general"]
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
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>


## Description

How can I set a command button in the Telerik UI Grid that contains only an icon and no text?

## Solution

Use either of the following approaches:

* Use CSS to style the **Edit** button by setting the `.k-grid-edit-command` CSS of the button as desired. Include the following configuration in the `k-button-icon` class.

	```CSS
	.k-grid tbody .k-grid-edit-command {
		min-width: 0;
		width: calc(2px + .75rem + 1.5em);
		height: calc(2px + .75rem + 1.5em);
		padding: .375rem;
	}

	.k-grid tbody .k-grid-edit-command .k-icon{
		margin: 0;
	}
	```
	```Razor
	.Columns(columns =>
	{
		columns.Bound(c => c.ProductName).Width(150);
		columns.Bound(c => c.Discontinued).Width(75);
		columns.Command(command => { command.Edit().Text(" "); command.Destroy(); }).Width(300);
	})
	```

* Create a custom template for the **Edit** button with an additional class. By using the [`onclick` event](https://api.jquery.com/on/) handler, set the [`editRow` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editrow) for the specific Grid row.

	```Razor
	.Columns(columns =>
	{
		columns.Bound(c => c.ProductName).Width(150);
		columns.Bound(c => c.Discontinued).Width(75);
		columns.Command(command => { command.Edit().Template("<button type=\"button\" class=\"k-button k-button-icon edit\"><span class=\"k-icon k-i-edit\"></span></button>"); command.Destroy(); }).Width(300);
	})
	```
	```JavaScript
	$(document).ready(function () {
		$("#grid").on("click", ".edit", function () {
				var row = $(this).closest("tr");
				$("#grid").data("kendoGrid").editRow(row);
		});
	});
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
