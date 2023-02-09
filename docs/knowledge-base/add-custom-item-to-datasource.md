---
title: Add Custom Items to the ComboBox Data Source
page_title: Add Custom Items to the ComboBox Data Source
description: "Learn how to add a custom item to the Kendo UI ComboBox DataSource."
previous_url: /controls/editors/combobox/how-to/add-custom-item-to-datasource, /controls/editors/combobox/how-to/binding/add-custom-item-to-datasource
slug: howto_add_custom_item_to_datasource
tags: telerik, kendo, jquery, combobox, add, custom, items, to, data, source
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

How can I save an entered custom item to the remote data source of the Kendo UI ComboBox?

## Solution

>The suggested approach is not designed to be used and to work in scenarios where the ComboBox is an editor of a Kendo UI `anotherData` widget item such as the Kendo UI Grid.

To achieve the desired scenario:

* Configure the ComboBox DataSource for [`create`](/framework/datasource/crud) operations.
* Use the [`change` event](/api/javascript/ui/combobox/events/change) of the ComboBox to detect when a custom text is typed.
* In the `change` handler, check what the [index of the selected item](/api/javascript/ui/combobox/methods/select ) is or retrieve the [current data item](/api/javascript/ui/combobox/methods/dataitem).
* If the selected index is `-1` (minus one), or if the data item is `null`, obtain the custom user input with the [`text()`](/api/javascript/ui/combobox/methods/text) method.
* [Add](/api/javascript/data/datasource/methods/add) a new data item to the ComboBox [`dataSource`](/api/javascript/ui/combobox/fields/datasource ). This will trigger a request to the remote service if [`autoSync`](/api/javascript/data/datasource/configuration/autosync) is set to `true`. Otherwise, [`sync()`](/api/javascript/data/datasource/methods/sync) manually.
* Before adding the new data item, attach a [one-time](/intro/widget-basics/events-and-methods#events) [`dataBound`](/api/javascript/ui/combobox/events/databound) handler and in that handler, use the [`text()`](/api/javascript/ui/combobox/methods/text) method to re-apply the custom user input. In the example below, this is as an existing data item.


```dojo
<div id="example">

  <input id="combobox" style="width: 240px" />

</div>

<script>

  $(function() {

    $("#combobox").kendoComboBox({
      placeholder: "Select a product e.g. 'Chai'",
      valuePrimitive: true,
      dataTextField: "ProductName",
      dataValueField: "ProductID",
      change: onComboBoxChange,
      dataSource: {
        autoSync: true,
        // batch is set to true, because our remote service expects it. Not required
        batch: true,
        transport: {
          read: {
            url: "//demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp"
          },
          create: {
            url: "//demos.telerik.com/kendo-ui/service/products/create",
            dataType: "jsonp"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
              // this request structure is required by our data service. Related to batch: true
              return { models: kendo.stringify(options.models) };
            }
          }
        },
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductID: { editable: false, nullable: true },
              ProductName: { type: "string" },
            }
          }
        }
      }
    });

    function onComboBoxChange (e) {
      var combo = e.sender;
      // check if new value is a custom one
      if (!combo.dataItem()) {
        // select the newly created dataItem after the data service response is received
        combo.one("dataBound", function(){
          combo.text(combo.text());
        });

        // create a new dataItem. It will be submitted automatically to the remote service (autoSync is true)
        combo.dataSource.add({ ProductName: combo.text() });
      }
    }

  });

</script>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
