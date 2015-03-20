---
title: Make visible input readonly
page_title: Make visible input readonly
description: Example that shows how to make readonly visible input of Kendo UI ComboBox
---

# How to make Kendo UI ComboBox visible input readonly

The example below demonstrates how to make readonly visible input of Kendo UI ComboBox.

#### Example:

```html
<div id="example" role="application">
<form>
  <h4>T-shirt Fabric</h4>
  <input id="fabric" placeholder="Select fabric..." />
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

    var fabric = $("#fabric").data("kendoComboBox");

    fabric.input.attr("readonly", true)
    .on("keydown", function(e) { 
      if (e.keyCode === 8) {
        e.preventDefault(); 
      }
    });
  });
</script>
</div>
```
