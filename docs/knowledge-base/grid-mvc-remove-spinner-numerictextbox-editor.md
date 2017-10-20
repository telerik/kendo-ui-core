---
title: Remove Spinners from Numeric Editors in MVC Grid
description: An example on how to remove the side arrows of the NumericTextBox editor in the ASP.NET MVC Grid.
type: how-to
page_title: Remove Spinner Arrows of NumericTextBox Editor | Kendo UI Grid for ASP.NET MVC
slug: grid-mvc-remove-spinner-numerictextbox-editor
tags: grid treelist, NumericTextBox, spinners, editor, remove 
ticketid: 1132419, 1134869
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.913 version</td>
 </tr>
</table>

## Description

How do I remove the spinners from the editor of a "[DataType("Integer")]" field?

## Solution

To remove the spinners:

1. Under `Views/Shared/EditorTemplates` add a CSHTML file with a definition like this:
	
	`NoSpinners.cshtml`

		@model int?
		  
		@(Html.Kendo().NumericTextBoxFor(m => m)
		      .HtmlAttributes(new { style = "width:100%" })
		      .Spinners(false)
		)
1. Open the model that you are editing in the Grid and add a [UIHint("NoSpinners")] annotation to the integer field that should not show spinners:

		[DisplayName("Units in stock")]
		[UIHint("NoSpinners")]
		[Range(0, int.MaxValue)]
		public int UnitsInStock
		{
		    get;
		    set;
		}

1. Make sure that the `NoSpinners` string must match the name of the editor template file. [Screenshot reference](https://www.screencast.com/t/NpPf3qWtsD).