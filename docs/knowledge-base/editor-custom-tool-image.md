---
title: Set Image to Custom Tool in Editor
description: An example on how to set an image to a custom tool that is added to the Kendo UI Editor.
type: how-to
page_title: Set Background Image to Custom Tool | Kendo UI Editor for jQuery
slug: editor-custom-tool-image
tags: editor, custom, tool, button, image, background
ticketid: 1135501
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I set an image to the custom tool that I added to the Editor?

## Solution

When you add a custom tool to the Editor and set its `name` option, a class that is based on the specified name is automatically added to the corresponding HTML element of the custom tool. For example, if you set the tool name to `customButton`, the `k-i-custom-button` class is added to the `span` element of the tool. You can use this class as a selector in a CSS rule, which can set a background-image to the custom tool.

```dojo
	<textarea id="editor"></textarea>
	<script>
		$("#editor").kendoEditor({
		  tools: [
			{
			  name: "customButton",
			  exec: function(e) {
				// handle the event...
			  }
			}
		  ]
		});
	</script>
	<style>  
		.k-i-custom-button {
			background-image: url("https://www.w3schools.com/images/compatible_chrome.gif");
			background-repeat: no-repeat;
		}
	</style>
```
