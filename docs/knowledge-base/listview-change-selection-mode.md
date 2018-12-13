---
title: Change Selection Mode in ListView
description: An example on how to change the selection mode of the Kendo UI ListView.
type: how-to
page_title: Switch between Single and Multiple Selection | Kendo UI ListView
slug: listview-change-selection-mode
tags: listview, select, mode, single, multiple, selection, change, switch, dynamic,
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

How can I allow the user to change the selection mode in the ListView based on a selection from a DropDownList or another component?

## Solution

1. Handle the `change` event for the DropDownList or the other component that is used for changing the selection mode.
1. Get the selected selection mode value.
1. Call the `setOptions()` method with settings that configure the new selection mode.
1. Call the [`refresh()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview#methods-refresh) method for the ListView.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div class="demo-section k-content wide">
    <select id="mode">
    </select>

    <ul id="listView2"></ul>
</div>

<script type="text/x-kendo-template" id="template">
        <li>#:ProductName#</li>
      </script>

<script>
    $(function () {
        var dataSource = new kendo.data.DataSource({
            data: products
        });

        $("#mode").kendoDropDownList({
            dataSource: {
                data: [
                    { name: "Single" },
                    { name: "Multiple" }
                ]
            },
            optionLabel: "-- Select option --",
            dataTextField: "name",
            dataValueField: "name",
            change: function (e) {
                var selectedValue = this.value();

                var listView2 = $("#listView2").getKendoListView();

                //call set options only if the selection mode is different
                if (selectedValue == "Single" && listView2.options.selectable != "single") {
                    listView2.setOptions({ selectable: "single" });
                    listView2.refresh();
                } else if (selectedValue == "Multiple" && listView2.options.selectable != "multiple") {
                    listView2.setOptions({ selectable: "multiple" });
                    listView2.refresh();
                }
            }
        });


        $("#listView").kendoListView({
            dataSource: {
                data: [
                    { name: "Single" },
                    { name: "Multiple" }
                ]
            },
            template: "<div>#:name#</div>",
            selectable: true,
            change: function (e) {
                var data = this.dataSource.view();
                var selectedItem = $.map(this.select(), function (item) {
                    return data[$(item).index()].name;
                });

                var listView2 = $("#listView2").getKendoListView();

                //call set options only if the selection mode is different
                if (selectedItem[0] == "Single" && listView2.options.selectable != "single") {
                    listView2.setOptions({ selectable: "single" });
                    listView2.refresh();
                } else if (selectedItem[0] == "Multiple" && listView2.options.selectable != "multiple") {
                    listView2.setOptions({ selectable: "multiple" });
                    listView2.refresh();
                }
            }
        });
    });


    $(function () {
        var dataSource = new kendo.data.DataSource({
            data: products
        });

        $("#listView2").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html()),
            selectable: false
        });


    });
</script>

<style>
    ul {
        height: 200px;
        overflow: auto;
        list-style: none;
        padding: 0;
    }

    li {
        padding: 2px;
        cursor: pointer;
    }

    .k-listview>.k-state-selected {
        background-color: #78c8a0;
    }
</style>
```
