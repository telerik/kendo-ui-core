---
title: Expand Background of Long List Items
page_title: Expand Background of Long List Items | Kendo UI ComboBox
description: "Learn how to expand the background of long list items in Kendo UI ComboBox, AutoComplete, DropDownList, and MultiSelect widgets."
slug: howto_expand_background_longlist_items_combobox
---

# Expand Background of Long List Items

The example below refers to Kendo UI ComboBox and is applicable to the AutoComplete, DropDownList and MultiSelect widgets as well.

Normally, long items in the dropdown wrap to multiple lines. However, if the list item content is non-wrappable (e.g., a very long word or string with no spaces), a horizontal scrollbar will apppear. In this case, the background of the hover and select states will not expand beyond the 100% width of the dropdown, due to the way HTML elements expand in general. There are two ways to handle the issue.

###### Example

```html
<div id="example" role="application">
    <style>
        /* the first part of the ID matches the ID of the widget */
        #combo1-list .k-item
        {
            display: inline-block;
            min-width: 100%;
        }
    </style>

    <p>Expand backgrounds (widths) of long items only, via CSS:
        <select id="combo1">
            <option>foo</option>
            <option>bar</option>
            <option>baz baz baz baz baz baz bazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</option>
        </select>
    </p>

    <p>Expand backgrounds (widths) of all items, via Javascript:
        <select id="combo2">
            <option>foo</option>
            <option>bar</option>
            <option>baz baz baz baz baz baz bazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</option>
        </select>
    </p>

    <script>
        $(document).ready(function() {
          $("#combo1").kendoComboBox();

          $("#combo2").kendoComboBox({
            open: function(e){
              setTimeout(function(){
                var list = e.sender.list.find("> div > ul");
                var w = list[0].scrollWidth;
                list.children().width(w);
              });
            }
          });
        });
    </script>
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
