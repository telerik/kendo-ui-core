---
title: Set the Color of the ColorPicker with a DropDownList
description: An example on how to set the color of the Kendo UI ColorPicker with a DropDownList.
type: how-to
page_title: Change Colors in ColorPickers from DropDownLists | Kendo UI ColorPicker
slug: colorpicker-change-dropdownlist
tags: colorpicker, dropdownlist, color
ticketid: 1143760
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ColorPicker</td>
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

How can I add or change the color in the ColorPicker from a DropDownList?

## Solution

1. Retrieve the selected color in the `select` event handler of the DropDownList.

1. Set the color to the reference of the ColorPicker widget.

```dojo
    <label for="colorpicker">ColorPicker:</label>
	<input id="colorpicker" value="#1212d3" />
	<div id="dropdown"></div>

	<script>
		var ddlData = [
			{ Name: "Blue", Color: '#1212d3' },
			{ Name: "Green", Color: '#22d312' },       
			{ Name: "Red", Color: '#ff0000' }
		];

		$('#dropdown').kendoDropDownList({
				dataSource:ddlData,
			dataTextField: "Name",
			dataValueField: "Color",
			template: '<div style="background-color: #: Color # !important">#: Name # </div>',
			select:onSelect
		});

		function onSelect(e){
				var item = e.item;
			var dataItem = this.dataItem(e.item);
			var colorCode = dataItem.Color                
			setColor(colorCode);     	      
		}
		var colorpicker = $("#colorpicker").kendoColorPicker().data("kendoColorPicker");
		function setColor(color){
			try {
				var color = kendo.parseColor(color);
				colorpicker.value(color);
			} catch(ex) {
				alert('Cannot parse color: "' + color + '"');
			}
		}  
	</script>
```
