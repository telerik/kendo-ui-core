---
title: Removing Spinners from NumericTextBox Editors in the Grid
description: An example on how to remove the side arrows of the NumericTextBox editor in the {{ site.product }} Grid.
type: how-to
page_title: Remove Spinner Arrows of the NumericTextBox Editor
slug: grid-remove-spinner-numerictextbox-editor
tags: numerictextbox, spinners, editor, remove
ticketid: 1132419, 1134869
res_type: kb
component: numerictextbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

How can I remove the spinners (up and down arrows) from the editor of a `"[DataType("Integer")]"` field in the {{ site.product }} Grid?

## Solution

1. Under `Views/Shared/EditorTemplates`, add a `.cshtml` file with the following definition.

	`NoSpinners.cshtml`

		@model int?

		@(Html.Kendo().NumericTextBoxFor(m => m)
		      .HtmlAttributes(new { style = "width:100%" })
		      .Spinners(false)
		)

1. Open the model that you are editing in the Grid.
1. Add a `[UIHint("NoSpinners")]` annotation to the integer field which does not show spinners.

		[DisplayName("Units in stock")]
		[UIHint("NoSpinners")]
		[Range(0, int.MaxValue)]
		public int UnitsInStock
		{
		    get;
		    set;
		}

1. Make sure that the `NoSpinners` string matches the name of the editor template file.

To see the end result, refer to [this screenshot](https://www.screencast.com/t/NpPf3qWtsD).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
