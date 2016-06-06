---
title: Add Custom Items to the Datasource
page_title: Add Custom Items to the Datasource | Kendo UI ComboBox
description: "Learn how to add a custom item to the Kendo UI ComboBox DataSource."
slug: howto_add_custom_item_to_datasource
---

# Add Custom Items to the ComboBox DataSource

The example below demonstrates how to save an entered custom item to the remote dataSource of the Kendo UI ComboBox.

Below are listed the notable steps for you to follow when doing this:

* Configure the ComboBox DataSource for [`create`](/framework/datasource/crud) operations.
* Use the [`change` event](/api/javascript/ui/combobox#events-change) of the ComboBox to detect when custom text is typed.
* In the `change` handler, check what the [index of the selected item](/api/javascript/ui/combobox#methods-select ) is or retrieve the [current data item](/api/javascript/ui/combobox#methods-dataItem).
* If the selected index is `-1` (minus one), or if the data item is `null`, obtain the custom user input with the [`text()`](/api/javascript/ui/combobox#methods-text) method.
* [Add](/api/javascript/data/datasource#methods-add) a new data item to the ComboBox [dataSource](/api/javascript/ui/combobox#fields-dataSource ). This will trigger a request to the remote service if [`autoSync`](/api/javascript/data/datasource#configuration-autoSync) is set to `true`. Otherwise, [`sync()`](/api/javascript/data/datasource#methods-sync) manually.
* Before adding the new data item, attach a [one-time](/intro/widget-basics/events-and-methods#events) [`dataBound`](/api/javascript/ui/combobox#events-dataBound) handler and in that handler, use the [`text()`](/api/javascript/ui/combobox#methods-text) method to re-apply the custom user input. In the example below, this is as an existing data item.

> **Important**
>
> The technique below is not designed to be used and does not work in scenarios where the ComboBox is an editor of anotherdata item of a Kendo UI widget&mdash;for example, a Kendo UI Grid.

###### Example

```html
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

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
