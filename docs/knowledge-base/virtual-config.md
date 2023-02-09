---
title: Define Virtual Configuration Declaratively in the ComboBox
page_title: Define Virtual Configuration Declaratively in the ComboBox
description: "Learn how to define the virtual configuration option of the Kendo UI ComboBox widget declaratively."
slug: howto_define_virtual_option_combobox
previous_url: /controls/editors/combobox/how-to/mvvm/virtual-config
tags: telerik, kendo, jquery, combobox, define, virtual, confoguration, declaratively
component: combobox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
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

How can I define the `virtual` configuration option of the Kendo UI ComboBox widget declaratively?

## Solution

The following example demonstrates how to define the [`virtual`](/api/javascript/ui/combobox/configuration/virtual) option of the Kendo UI ComboBox widget by using the `data-*` attribute.


```dojo
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
                      read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
                  url: "https://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
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

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
