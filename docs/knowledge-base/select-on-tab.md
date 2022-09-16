---
title: Select the First MultiSelect Item on TAB
page_title: Select the First MultiSelect Item on TAB
description: "Learn how to select the first item from the popup on a TAB keypress in the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/how-to/select-on-tab, /controls/editors/multiselect/how-to/selection/select-on-tab
slug: howto_select_thefirst_itemon_tab_multiselect
tags: telerik, kendo, jquery, multiselect, select, first, item, on, tab
component: multiselect
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I select the first item from the popup on a `Tab` key-press in a Kendo UI MultiSelect widget?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<div id="example">
    <div class="demo-section k-header">
        <h4>Select Continents</h4>
        <select id="select"></select>
    </div>
    <script>
        $(document).ready(function() {
            function onDataBound() {
                  $(".console").append("<p>event: dataBound</p>");
                }

            function onOpen() {
                  $(".console").append("<p>event: open</p>");
                }

            function onClose() {
                  $(".console").append("<p>event: close</p>");
                }

            function onChange() {
                  $(".console").append("<p>event: change</p>");
                }

            function onSelect(e) {
                  var dataItem = this.dataSource.view()[e.item.index()];
                  $(".console").append("<p>event :: select (" + dataItem.text + " : " + dataItem.value + ")</p>");
                };

            function onFiltering(e) {
                  $(".console").append("<p>event :: filtering</p>");
                }

            var data = [
                { text: "A", value:"1" },
                { text: "Europe", value:"2" },
                { text: "Asia", value:"3" },
                { text: "North America", value:"4" },
                { text: "South America", value:"5" },
                { text: "Antarctica", value:"6" },
                { text: "Australia", value:"7" }
            ];

            var ms = $("#select").kendoMultiSelect({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: data,
                dataBound: onDataBound,
                filtering: onFiltering,
                select: onSelect,
                change: onChange,
                close: onClose,
                open: onOpen
            }).data("kendoMultiSelect");

            var selectItem = function(ms) {
                var dataItem = ms.dataSource.view()[0];
                var value = ms.value();

                if (dataItem) {
                    value.push(dataItem.value);
                  ms.value(value);
                }
            }

            ms.input
            .on("blur", function() {
                selectItem(ms);
            })
            .on("keydown", function(e) {
                if (e.keyCode === 9) {
                selectItem(ms);
              }
            });
        });
    </script>
    <div class="box">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
    <style>
        .demo-section {
            width: 400px;
        }
    </style>
</div>
```

## See Also

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
