---
title: Sort ListBox Items on Add
description: An example on how to sort the Kendo UI ListBox items when a new one is added.
type: how-to
page_title: Sort Items on Adding a New One | Kendo UI ListBox for jQuery
slug: listbox-sort-items-on-add
tags: listbox, sort, items, order, drag, add, new, drop
ticketid: 1141126
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
 <tr>
  <td>Created with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

How can I sort the items between connected ListBoxes when I move items from one ListBox to the other?

## Solution

1. To initially order the items, specify the [`sort`](/api/javascript/data/datasource/configuration/sort) option of the DataSource component.
1. To sort the items when the user drops a new item, handle the [`add`](/api/javascript/ui/listbox/events/add) event and prevent the default behavior.
1. Manually add the item to the respective DataSource and call the [`sort()`](/api/javascript/data/datasource/methods/sort) method.

```dojo
<div id="example" role="application">
    <div class="demo-section k-content">
        <img src="https://demos.telerik.com/kendo-ui/content/web/listbox/arrow-left2right.png" alt="drag-indicator" class="arrow" />
        <br />
        <select id="discontinued"></select>
        <select id="available"></select>
        <img src="https://demos.telerik.com/kendo-ui/content/web/listbox/arrow-right2left.png" alt="drag-indicator" class="arrow" />
    </div>
</div>

<script>
    $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
        var dataSource = new kendo.data.DataSource({
            serverFiltering: false,
            transport: {
                read: {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                },
                update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                }
            },
            requestStart: function () {
                kendo.ui.progress($(".demo-section"), true);
            },
            requestEnd: function () {
                kendo.ui.progress($(".demo-section"), false);
            },
            batch: false,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        Discontinued: { type: "boolean" },
                    }
                }
            }
        });

        var availableDS = new kendo.data.DataSource({
            sort: { field: "ProductName", dir: "asc" }
        });
        var discontinuedDS = new kendo.data.DataSource({
            sort: { field: "ProductName", dir: "asc" }
        });

        dataSource.fetch(function () {
            var data = this.data();

            var discontinuedData = [];
            var availableData = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i].Discontinued) {
                    discontinuedData.push(data[i]);
                }
                else {
                    availableData.push(data[i]);
                }
            }

            availableDS.data(availableData)
            discontinuedDS.data(discontinuedData);
        });

        $("#discontinued").kendoListBox({
            draggable: true,
            dataSource: discontinuedDS,
            connectWith: "available",
            dropSources: ["available"],
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            toolbar: {
                tools: [ "transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
            },
            add: function (e) {
                e.preventDefault();

                addItems(this.dataSource, e.dataItems)
                this.dataSource.sort({ field: "ProductName", dir: "asc" });
            }
        });

        $("#available").kendoListBox({
            draggable: true,
            dataSource: availableDS,
            connectWith: "discontinued",
            dropSources: ["discontinued"],
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            add: function (e) {
                e.preventDefault();

                addItems(this.dataSource, e.dataItems)
                this.dataSource.sort({ field: "ProductName", dir: "asc" });
            }
        });

        function addItems(dataSource, items){
          items.forEach(function(item){
            dataSource.data().push(item);
          })
        }


    });
</script>

<style>
    #example .k-listbox .k-item {
        cursor: move;
    }

    #example .arrow {
        padding: 8px 0 5px 238px;
    }

    #save-changes-btn {
        float: right;
        margin-top: 20px;
    }

    #example .demo-section {
        max - width: none;
        width: 555px;
    }

    #example .k-listbox {
        width: 275px;
        height: 310px;
    }
</style>
```
