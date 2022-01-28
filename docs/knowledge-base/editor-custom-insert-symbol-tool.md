---
title: Implement Custom InsertSymbol Tool for Editor
description: An example on how to add a custom insert-symbol tool to the Kendo UI Editor.
type: how-to
page_title: Add a Custom InsertSymbol Tool | Kendo UI Editor for jQuery
slug: editor-custom-insert-symbol-tool
tags: editor, custom, tool, insert, symbol
ticketid: 1141847
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

How can I add a custom `InsertSymbol` tool to the Editor?

## Solution

1. Set a template to the custom tool and initialize a DropDownList in it.
1. In the `change` event handler of the DropDownList, call the `exec` API method of the Editor and execute the `insertHtml` command.
1. Pass the selected symbol to the method in the DropDownList.

```dojo
	<textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
	</textarea>

	<script type="text/x-kendo-template" id="insertSymbol-template">
		<label for='templateTool' style='vertical-align:middle;'>Insert Symbol:</label>
		<select id='templateTool' style='width:90px'>
		<option value='1'>&copy;</option>
		<option value='2'>&sum;</option>
		<option value='3'>&euro;</option>
		<option value='4'>&trade;</option>
		<option value='5'>&larr;</option>
		<option value='6'>&uarr;</option>
		<option value='7'>&rarr;</option>
		<option value='8'>&darr;</option>
	  </select>
	</script>

	<script>
		$("#editor").kendoEditor({
		  encoded: false,
			tools: [
				{
					name: "customTemplate",
					template: $("#insertSymbol-template").html()
				}
			]
		});

		$("#templateTool").kendoDropDownList({
			change: function(e) {
				var inputValue = e.sender._inputValue();

				$('#editor').data('kendoEditor').exec("insertHtml", { html: inputValue });
			}
		});
	</script>
```
