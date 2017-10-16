---
title: Sort MultiSelect TagList Programatically
description: An example on how to programmatically sort the TagList of the Kendo UI MultiSelect.
type: how-to
page_title: Sort TagList Programmatically | Kendo UI MultiSelect
slug: sort-multiselect-taglist-programmatically
tags: multiselect, sort, taglist, programmatically, selected, items
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MultiSelect</td>
 </tr>
</table>

## Description

How can I sort the selected values of the MultiSelect alphabetically?

## Solution

Use the `change` and `dataBound` events of the MultiSelect to change the order of the items in the TagList.

```html
<div id="example">
    <div class="demo-section k-content">
        <h4>MultiSelect</h4>
        <select data-role="multiselect"
              data-placeholder="Type a product e.g. 'Chai'"
              data-value-primitive="true"
              data-text-field="ProductName"
              data-value-field="ProductID"
              data-bind="value: selectedProduct,
                         source: products,
                         events: {
                           change: onChange,
                           dataBound: onDataBound
                         }">
        </select>
    </div>
</div>

<script>
    function orderMultiSelect(multi) {
        multi.tagList.find('> li').sort(function (a, b) {
        return $(a).text() > $(b).text();
        }).appendTo(multi.tagList);
    }

    var viewModel = kendo.observable({
        selectedProduct: [
            { ProductID: 1, ProductName: "Chai"},
            { ProductID: 3, ProductName: "Aniseed Syrup"}
        ],
        products: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            sort: { field: "ProductName", dir: "asc" }
        }),
        onDataBound: function(e) {
            var multi = e.sender;

            orderMultiSelect(multi);
        },
        onChange: function(e) {
            var multi = e.sender;

            orderMultiSelect(multi);
        }
    });
    kendo.bind($("#example"), viewModel);
</script>

```
