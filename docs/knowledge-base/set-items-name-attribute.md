---
title: Set the name Attribute to ComboBox Items
description: An example on how to set the name attribute to the items of the Kendo UI ComboBox.
type: how-to
page_title: Set the name Attribute to ComboBox Items after They Load | Kendo UI ComboBox for jQuery
slug: set-items-name-attribute
tags: combobox, name, id, attribute, set, render
ticketid: 1129715
res_type: kb
component: combobox
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

I want to display a name to each individual item of my Kendo UI ComboBox.

How can I set the `name` attribute to each of the ComboBox items?

## Solution

1. In the `dataBound` event handler of the ComboBox and by using the API of the widget, get the array of the DOM elements which correspond to the data items from the DataSource and the data items themselves.

1. Use the jQuery `attr` method to set the attribute.

```dojo
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
