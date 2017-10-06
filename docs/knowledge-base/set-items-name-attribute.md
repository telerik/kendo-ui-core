---
title: Set Name Attribute to ComboBox Items
description: An example on how to set the name attribute of Kendo UI ComboBox items.
type: how-to
page_title: Set the name attribute to ComboBox items after they are loaded | Kendo UI ComboBox
slug: set-items-name-attribute
tags: combobox, name, id, attribute, set, render
ticketid: 1129715
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ComboBox</td>
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

How can I set the name attribute of the ComboBox items?

## Solution

In scenarios, which require each individual ComboBox item to have a `name` attribute rendered:

1. In the ComboBox dataBound event handler, using the widget's API, get the array of DOM elements corresponding to the data items from the DataSource and the data items themselves.

1. Use the jQuery `attr` method to set the attribute.

```html
	<input id="combobox" />
	<script>
	  $("#combobox").kendoComboBox({
		  dataSource: [
			  { Name: "Anna", Id: 1 },
			  { Name: "Bob", Id: 2 },
			  { Name: "Daniel", Id: 3 },
			  { Name: "Charlie", Id: 4 }
		  ],
		  dataTextField: "Name",
		  dataValueField: "Id",
		  dataBound: function(e) {
			var items = e.sender.items();
			var dataItems = e.sender.dataItems();
			for(var i=0; i < dataItems.length; i++) {
			  $(items[i]).attr("name", dataItems[i].Id.toString())
			}
		  }
	  });
	</script>
```

For the full implementation of the approach, refer to [this Dojo example](https://dojo.telerik.com/uKEcO).

## See Also

* [jQuery css Method](https://www.w3schools.com/jquery/html_attr.asp)
