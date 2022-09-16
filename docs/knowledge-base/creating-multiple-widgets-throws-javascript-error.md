---
title: Creating Multiple Widgets Throws JavaScript Errors
page_title: Creating Multiple Widgets Throws JavaScript Errors
description: "Learn how to handle the JavaScript errors that are thrown when creating multiple widgets with Kendo UI for jQuery."
slug: creating_multiple_widgets_javascript_error
tags: telerik, kendoui, jquery, troubleshooting, creating, multiple, widgets, throws, javascript, error
type: troubleshooting
res_type: kb
component: kendoui
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

JavaScript errors are thrown when I create multiple widgets.

## Cause

The issue will arise if two or more widgets are initialized from elements that have the same IDs. jQuery will find only the first one every time it searches for it and thus try to initialize the first element in the DOM multiple times.

## Solution

Specify a unique ID for each element on the page.

	<textarea id="editor"></textarea>
	<textarea id="editor"></textarea>
	<script>
		$('#editor').kendoEditor();
		$('#editor').kendoEditor(); // problem
	</script>
