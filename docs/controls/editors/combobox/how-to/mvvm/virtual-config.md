---
title: Define Virtual Configuration Declaratively
page_title: Define Virtual Configuration Declaratively | Kendo UI ComboBox
description: "Learn how to define the virtual configuration option of the Kendo UI ComboBox widget declaratively."
slug: howto_define_virtual_option_combobox
---

# Define Virtual Configuration Declaratively

The example below demonstrates how to define the [`virtual`](/api/javascript/ui/combobox#configuration-virtual) option of the Kendo UI ComboBox widget by using the `data-*` attribute.

###### Example

```html
    <div id="example">
        <div class="demo-section k-header">
            <h4>Search for shipping name</h4>
            <input id="orders" style="width: 400px"
                   data-role="combobox"
                   data-bind="value: order, source: source"
                   data-text-field="ShipName"
                   data-value-field="OrderID"
                   data-filter="contains"
                   data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
                   data-height="520"
                   />
        </div>

        <script>
            $(document).ready(function() {
                var model = kendo.observable({
                        order: "10548",
                  source: new kendo.data.DataSource({
                    type: "odata",
                    transport: {
                      read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                      model: {
                        fields: {
                          OrderID: { type: "number" },
                          Freight: { type: "number" },
                          ShipName: { type: "string" },
                          OrderDate: { type: "date" },
                          ShipCity: { type: "string" }
                        }
                      }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                  })
                });


                kendo.bind($(document.body), model);
            });

            function orderValueMapper(options) {
                $.ajax({
                  url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                  type: "GET",
                  dataType: "jsonp",
                  data: convertValues(options.value),
                  success: function (data) {
                    options.success(data);
                  }
                })
            }

            function convertValues(value) {
                var data = {};

                value = $.isArray(value) ? value : [value];

                for (var idx = 0; idx < value.length; idx++) {
                    data["values[" + idx + "]"] = value[idx];
                }

                return data;
            }
        </script>

        <style>
            html {
                overflow: hidden;
            }
            .demo-section {
                width: 400px;
            }
            .demo-section h2 {
                text-transform: uppercase;
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            .order-id {
                display: inline-block;
                min-width: 60px;
            }
        </style>
    </div>
```

## See Also

Other articles on Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [How to Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Prevent POST on Enter Key Press]({% slug howto_prevent_post_onpressing_enter_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Blur the ComboBox after Select]({% slug howto_blur_after_select_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
