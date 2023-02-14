---
title: Prevent POST on Enter Key Press in the ComboBox
page_title: Prevent POST on Enter Key Press in the ComboBox
description: "Learn how to prevent POST on pressing the `Enter` key in a Kendo UI ComboBox widget."
previous_url: /controls/editors/combobox/how-to/prevent-form-post-on-enter, /controls/editors/combobox/how-to/customize/prevent-form-post-on-enter
slug: howto_prevent_post_onpressing_enter_combobox
tags: telerik, kendo, jquery, combobox, prevent, post, on, enter, key, press
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

How can I prevent POST on an `Enter` key press in a Kendo UI ComboBox?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
<div id="example" role="application">
  <form>
      <h4>T-shirt Fabric</h4>
      <input id="fabric" placeholder="Select fabric..." />

      <h4>T-shirt Size</h4>
      <select id="size" placeholder="Select size...">
        <option>X-Small</option>
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
        <option>X-Large</option>
        <option>2X-Large</option>
      </select>

      <br/>
      <button class="k-button" id="get">Post</button>
  </form>
  <script>
      $(document).ready(function() {
          // create ComboBox from input HTML element
          $("#fabric").kendoComboBox({
              dataTextField: "text",
              dataValueField: "value",
              dataSource: [
                  { text: "Cotton", value: "1" },
                  { text: "Polyester", value: "2" },
                  { text: "Cotton/Polyester", value: "3" },
                  { text: "Rib Knit", value: "4" }
              ],
              filter: "contains",
              suggest: true,
              index: 3
          });

          // create ComboBox from select HTML element
          $("#size").kendoComboBox();

          var fabric = $("#fabric").data("kendoComboBox");
          var size = $("#size").data("kendoComboBox");

          function preventPost(e) {
            if (e.keyCode === 13) {
              e.preventDefault();
            }
          }

          fabric.input.keydown(preventPost);
          size.input.keydown(preventPost);
      });
  </script>
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
