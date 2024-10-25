---
title: Highlight Matched Text from ComboBox Items
description: Learn how to highlight the text in the Kendo UI ComboBox items, which matches the search criteria.
type: how-to
page_title: Highlight the Item Text Which Matches Search Criteria - Kendo UI ComboBox for jQuery
slug: combobox-highlight-matched-text
tags: kendo, kendo-ui, combobox, search, text, highlight
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td> 
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
    var inputText = $('.k-input-inner').val().toLowerCase();

    for (var i = 0; i < items.length; i += 1) {
      var item = $(items[i]);
      var itemHtml = item.html();
      var startIndex = itemHtml.toLowerCase().indexOf(inputText);
      if(startIndex>=0){  // Only highlighted the items which contain the search text
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
  }

  // Remove highlight after seleting the event. Otherwise dropdown always highlighted the item which has been selected frist time after searching text.
  function removeHighlight(e) {
    var combo = e.sender;
    var items = combo.items();
    var inputText = $('.k-input').val().toLowerCase();
    
    for (var i = 0; i < items.length; i += 1) {
      var item = $(items[i]);
      var itemHtml = item.html();
      var startIndex = itemHtml.toLowerCase().indexOf(inputText);
      if (startIndex > 0) {
        if (item.find('span.highlight').length > 0) { 
          var itemText = item.text();
          item.html(itemText);
        }
      }
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
      },
      select: function (e) {
      	var item = e.dataItem;
	// This checking is required. issue in kendo dropdown : the select event is triggered on blur, although it is not needed
        if (item !== null) {
          removeHighlight(e);
        }
      }
    });
  });
</script>
```

## See Also

* [API Reference of the ComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
