---
title: Search for Items by Dragging to Input
page_title: Search for Items by Dragging to Input | Kendo UI ComboBox
description: "Learn how to suport the search for an external item by dragging it to the input field of the Kendo UI ComboBox widget."
slug: howto_search_items_dragging_toinput_combobox
---

# Search for Items by Dragging to Input

The example below demonstrates how to make a readonly text visible in the input field of the Kendo UI ComboBox widget. To try out the example, select `Chai` from the `Drag: Chai` field, drag it to the input field of the ComboBox and release the mouse.

###### Example

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>Products</h4>
      <div> Drag: Chai </div>
      <input id="products" style="width: 400px" />
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoComboBox({
          placeholder: "Select product",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          filter: "contains",
          autoBind: false,
          minLength: 3,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            }
          }
        });

        //Wire the drop event
        var combobox = $("#products").data("kendoComboBox");

        combobox.input.on("drop", function(e) {
          var input = e.currentTarget;
          var droppedText = e.originalEvent.dataTransfer.getData("text");

          setTimeout(function() {
            input.value = droppedText;
            combobox.search(droppedText);
          });
        });
      });
    </script>

    <style scoped>
      .demo-section {
        width: 400px;
      }
    </style>
  </div>
```

## See Also

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
