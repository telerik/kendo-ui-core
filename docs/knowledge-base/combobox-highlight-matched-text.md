---
title: Highlight Matched Text from ComboBox Items
description: An example on how to highlight the text in the Kendo UI ComboBox items, which matches the search criteria.
type: how-to
page_title: Highlight the Item Text Which Matches Search Criteria | Kendo UI ComboBox
slug: combobox-highlight-matched-text
tags: kendo, kendo-ui, combobox, search, text, highlight
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ComboBox</td>
 </tr>
</table>


## Description

How the matched text in the ComboBox items could be highlighted?

## Solution

Implement the `dataBound` event handler for the widget.

```dojo
<style>
  .highlight {
    background-color: yellow;
  }
</style>

<h4>Find a product</h4>
<input id="products" style="width: 100%;" />

<script>
  function onDataBound(e) {
    var combo = e.sender;
    var items = combo.items();
    var inputText = $('.k-input').val().toLowerCase();

	for (var i = 0; i < items.length; i += 1) {
      var item = $(items[i]);
      var itemHtml = item.html();
      var startIndex = itemHtml.toLowerCase().indexOf(inputText);
      var endIndex = startIndex + inputText.length;

	  var outputHtml = [
		itemHtml.slice(0, startIndex),
		'<span class="highlight">',
		itemHtml.slice(startIndex, endIndex),
		'</span>',
		itemHtml.slice(endIndex)
	  ].join('');

	  item.html(outputHtml);
    }
  }

  $(document).ready(function() {
    $("#products").kendoComboBox({
      placeholder: "Select product",
      dataTextField: "ProductName",
      dataValueField: "ProductID",
      filter: "contains",
      autoBind: false,
      dataBound: onDataBound,
      dataSource: {
        type: "odata",
        serverFiltering: true,
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
          }
        }
      }
    });
  });
</script>
```

## See Also

* [API Reference of the ComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
