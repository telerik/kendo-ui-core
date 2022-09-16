---
title: When Creating Multiple Widgets Only One of Them Works
page_title: When Creating Multiple Widgets Only One of Them Works
description: "Learn how to handle the issue that when creating multiple widgets, only one of them works in Kendo UI for jQuery."
slug: when_creating_multiple_widgets_one_works
tags: telerik, kendoui, jquery, troubleshooting, when, creating, multiple, widgets, only, one, of, them, works
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

When creating multiple widgets, only one of them works.

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

