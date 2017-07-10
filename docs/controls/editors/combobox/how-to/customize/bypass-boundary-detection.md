---
title: Bypass Boundary Detection
page_title: Bypass Boundary Detection | Kendo UI ComboBox
description: "Learn how to auto-size the popup height in a Kendo UI ComboBox."
previous_url: /controls/editors/combobox/how-to/bypass-boundary-detection
slug: howto_bypass_boudary_detection_combobox
---

# Bypass Boundary Detection

The following example demonstrates how to auto-size the popup height in a Kendo UI ComboBox.

###### Example

```html
<div id="example" role="application">
<div id="tshirt-view" class="demo-section k-header">
  <h2>Customize your Kendo T-shirt</h2>
  <img id="tshirt" src="../content/web/combobox/tShirt.png" />
  <div id="options">
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
      <option>X-Small</option>
      <option>Small</option>
      <option>Medium</option>
      <option>Large</option>
      <option>X-Large</option>
      <option>2X-Large</option>
      <option>X-Small</option>
      <option>Small</option>
      <option>Medium</option>
      <option>Large</option>
      <option>X-Large</option>
      <option>2X-Large</option>
      <option>X-Small</option>
      <option>Small</option>
      <option>Medium</option>
      <option>Large</option>
      <option>X-Large</option>
      <option>2X-Large</option>
    </select>

    <button class="k-button" id="get">Customize</button>
  </div>
</div>
<style scoped>
  .demo-section {
    width: 500px;
    height: 340px;
  }
  .demo-section h2 {
    text-transform: uppercase;
    font-size: 1.2em;
    margin-bottom: 30px;
  }
  .demo-section h4 {
    margin-top: 1.5em;
  }
  #tshirt {
    float: left;
    margin: 0 40px 30px 0;
  }
  #options {
    padding: 20px 0 30px 30px;
  }
  #get {
    margin-top: 25px;
  }
  .k-readonly
  {
    color: gray;
  }
</style>

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
    $("#size").kendoComboBox({
      open: function() {
        this.options.height = getHeight(this);

        this.refresh();
      }
    });

    function getHeight(widget) {
      var offsetTop = widget.wrapper.offset().top;
      var wndHeight = window.innerHeight;

      var height = parseInt(wndHeight - offsetTop - 30);

      if (isNaN(height)) {
        height = 200;  
      }

      return height;
    }

    var fabric = $("#fabric").data("kendoComboBox");
    var select = $("#size").data("kendoComboBox");


    $("#get").click(function() {
      alert('Thank you! Your Choice is:\n\nFabric ID: ' + fabric.value() + ' and Size: ' + select.value());
    });
  });
</script>
</div>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_bindobjectstongmodel_combobox %}).
