---
title: Select the First Item on TAB
page_title: Select the First Item on TAB | Kendo UI MultiSelect
description: "Learn how to select the first item from the popup on a TAB keypress in the Kendo UI MultiSelect widget."
slug: howto_select_thefirst_itemon_tab_multiselect
---

# Select the First Item on TAB

The example below demonstrates how to select the first item from the popup on a `Tab` keypress in the Kendo UI MultiSelect widget.

###### Example

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>Select Continents</h4>
        <select id="select"></select>
    </div>
    <script>
        $(document).ready(function() {
            function onDataBound() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: dataBound");
                }
            }

            function onOpen() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: open");
                }
            }

            function onClose() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: close");
                }
            }

            function onChange() {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event: change");
                }
            }

            function onSelect(e) {
                if ("kendoConsole" in window) {
                    var dataItem = this.dataSource.view()[e.item.index()];
                    kendoConsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")" );
                }
            };

            function onFiltering(e) {
                if ("kendoConsole" in window) {
                    kendoConsole.log("event :: filtering");
                }
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

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
