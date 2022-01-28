---
title: Remove Spinners from NumericTextBox Editors in the Grid
description: An example on how to remove the side arrows of the NumericTextBox editor in the Telerik UI Grid for ASP.NET Core.
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
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

How can I remove the spinners from the editor of a `"[DataType("Integer")]"` field in the Telerik UI Grid for ASP.NET Core?

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

## See Also

* [Remove Up and Down Arrows from the Grid NumericTextBox Editors in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/knowledge-base/grid-remove-spinners-from-the-grid-numerictextbox-editor)
