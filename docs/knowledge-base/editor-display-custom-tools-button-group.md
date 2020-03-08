---
title: Display Editor Custom Tools as a Button Group
description: An example on how to display several custom tools as a button group in the Kendo UI Editor.
type: how-to
page_title: Display Editor Custom Tools as a Button Group | Kendo UI Editor for jQuery
slug: editor-display-custom-tools-button-group
tags: editor, display, appearance, CSS, custom, tools, button, group
ticketid: 920475
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

How can I display several custom tools as a button group in the Editor?

## Solution

1. Set a template to the custom tool.
1. Apply the following HTML structure and classes to the content of the template.

```dojo
	<textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
	</textarea>

	<script type="text/x-kendo-template" id="template1">
		<a tabindex="0" onclick="button1Click()" role="button" class="k-tool k-group-start" unselectable="on" title="Button1" aria-pressed="false"><span unselectable="on" class="k-tool-icon k-icon k-i-cog"></span><span class="k-tool-text">Button1</span></a><a tabindex="0" onclick="button2Click()" role="button" class="k-tool" unselectable="on" title="Button2" aria-pressed="false"><span unselectable="on" class="k-tool-icon k-icon k-i-wrench"></span><span class="k-tool-text">Button2</span></a><a tabindex="0" onclick="button3Click()" role="button" class="k-tool k-group-end" unselectable="on" title="Button3" aria-pressed="false"><span unselectable="on" class="k-tool-icon k-icon k-i-lock"></span><span class="k-tool-text">Button3</span></a>
	</script>

	<script>
		$("#editor").kendoEditor({
			tools: [
			"bold",
			"italic",
			"underline",
			"strikethrough",
			"justifyLeft",
			"justifyCenter",
			"justifyRight",
			"justifyFull",
			{
				name: "customTemplate",
				template: $("#template1").html()
			},
			]
		});

		function button1Click() {
			console.log("button1 clicked");
		}

		function button2Click() {
			console.log("button2 clicked");
		}

		function button3Click() {
			console.log("button3 clicked");
		}
	</script>
```
