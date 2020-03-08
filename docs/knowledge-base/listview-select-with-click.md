---
title: Select Items Only with Mouse
description: An example on how to select multiple items in the Kendo UI ListView only with the mouse.
type: how-to
page_title: Select Multiple Items Only with Click | Kendo UI ListView for jQuery
slug: listview-select-with-click
tags: listview, select, item, items, click, mouse, only, deselect, single
res_type: kb
component: listview
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListView</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created version 2018.1.117</td>
 </tr>
</table>

## Description

How can I allow the users to select or deselect ListView items only with the mouse?

## Solution

1. Handle the `mousedown` event for the ListView component.
1. Prevent the `click` event for the items in the ListView.
1. Check the clicked target and if it is a ListView item, keep it in an array. If the item is already selected, remove it from the array.
1. Call the [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/methods/select) method with the populated array of items.


```dojo
<div class="demo-section k-content wide">
    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"> </div>
</div>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product">
        <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#:ProductID#.jpg" alt="#:ProductName# image" />
        <h3>#:ProductName#</h3>
    </div>
</script>

<script>
    $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Products",
                    dataType: "jsonp"
                }
            },
            pageSize: 15
        });

        $("#pager").kendoPager({
            dataSource: dataSource
        });

        $("#listView").kendoListView({
            dataSource: dataSource,
            selectable: "multiple",
            dataBound: onDataBound,
            change: onChange,
            template: kendo.template($("#template").html())
        });

        function onDataBound() {
            console.log("ListView data bound");
        }

        function onChange(e) {
            var data = this.dataSource.view();
            var selected = $.map(this.select(), function (item) {
                return data[$(item).index()].ProductName;
            });

            console.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
        }

        $("#listView").on("mousedown", function (e) {

            // get item if the user clicked on an item template
            var clickedItem = $(e.target).closest("div.product");

            // prevent click event for item elements
            clickedItem.on("click", function (e) {
                e.stopPropagation();
            });

            if (clickedItem.length > 0) {
                var listView = $("#listView").getKendoListView();

                var selectedItems = listView.select();

                if (clickedItem.hasClass("k-state-selected")) {
                    // if item is already selected - remove it from collection
                    selectedItems.splice($.inArray(clickedItem[0], selectedItems), 1);
                } else {
                    selectedItems.push(clickedItem);
                }

                // unbind "change" event to prevent multiple calls
                listView.unbind("change");
                listView.clearSelection();
                listView.bind("change", onChange);

                listView.select(selectedItems);
            }
        });
    });
</script>

<style>
    .product {
        float: left;
        width: 220px;
        height: 110px;
        margin: 0;
        padding: 5px;
        cursor: pointer;
    }

    .product img {
        float: left;
        width: 110px;
        height: 110px;
    }

    .product h3 {
        margin: 0;
        padding: 10px 0 0 10px;
        font-size: .9em;
        overflow: hidden;
        font-weight: normal;
        float: left;
        max-width: 100px;
        text-transform: uppercase;
    }

    .k-pager-wrap {
        border-top: 0;
    }

    .demo-section .k-listview:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>
```
