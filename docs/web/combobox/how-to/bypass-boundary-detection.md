---
title: Bypass boundary detection.
page_title: Bypass boundary detection of Kendo UI ComboBox
description: Example that shows how to bypass boundary detection of Kendo UI ComboBox
---

# How to bypass boundary detection of Kendo UI ComboBox

The example below demonstrates how to make readonly visible input of Kendo UI ComboBox.

#### Example:

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
