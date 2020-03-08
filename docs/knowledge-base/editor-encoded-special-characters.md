---
title: Set Encoded Special Characters as Editor Values
description: An example on how to display decoded special characters in the Kendo UI Editor.
type: how-to
page_title: Programmatically set encoded special characters as value | Kendo UI Editor for jQuery
slug: editor-encoded-special-characters
tags: editor, encoded, special, characters, value, decoded
ticketid: 1141113
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

How can I set the encoded special characters as Editor values and display them decoded?

## Solution

Prior to passing them as a parameter to the `value` method of the Editor, decode the encoded special characters.

```dojo
<textarea id="editor"></textarea>
<script>
	$("#editor").kendoEditor();

	var editor = $("#editor").data("kendoEditor");
	var encodedString = "&lt;p&gt;Paragraph with a &gt; special character inside.&lt;/p&gt";
	var parser = new DOMParser;
	var dom = parser.parseFromString(
		'<!doctype html><body>' + encodedString,
		'text/html');
	var decodedString = dom.body.textContent;

	editor.value(decodedString);
</script>
```
