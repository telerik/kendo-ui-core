---
title: Select Items on Tab
page_title: Select Items on Tab | Kendo UI ComboBox
description: "Learn how to select an item on pressing `Tab` in the Kendo UI ComboBox widget."
slug: howto_select_items_ontab_combobox
---

# Select Items on Tab

The example below demonstrates how to select an item on pressing `Tab`.

###### Example

```html
  <div id="example">

    <div id="shipping">
      <label for="countries" class="info">Choose shipping countries:</label>

      <input id="countries" />

      <div class="hint">Start typing the name of an European country</div>
    </div>

    <script>
      $(document).ready(function () {
        var data = [
          "Albania Test",
          "Andorra Test",
          "Turkey",
          "Ukraine",
          "United Kingdom 2test",
          "Vatican City 2test"
        ];

        //create AutoComplete UI component
        var combobox = $("#countries").kendoComboBox({
          dataSource: data,
          filter: "contains",
          placeholder: "Type '2t'",
          suggest: true
        }).data("kendoComboBox");

        combobox.input.on("keydown", function(e) {
          var filter = combobox.dataSource.filter() || { filters: [] };

          if (e.keyCode === 9 && filter.filters[0]) { //TAB
            combobox.select(combobox.current().index());
          }
        });
      });
    </script>
    <style scoped>
      .info {
        display: block;
        line-height: 22px;
        padding: 0 5px 5px 0;
        color: #36558e;
      }

      #shipping {
        width: 482px;
        height: 152px;
        padding: 110px 0 0 30px;
        background: url('../content/web/autocomplete/shipping.png') transparent no-repeat 0 0;
        margin: 100px auto;
      }

      .k-autocomplete
      {
        width: 250px;
        vertical-align: middle;
      }

      .hint {
        line-height: 22px;
        color: #aaa;
        font-style: italic;
        font-size: .9em;
        color: #7496d4;
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
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
