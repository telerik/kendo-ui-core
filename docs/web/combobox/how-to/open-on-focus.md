---
title: Open on focus
page_title: Open on focus
description: Example that shows how to open the widget's popup on focus
---

# How to open the popup on input focus

The example below demonstrates how to open the widget's popup on input focus

#### Example:

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>Fabrics</h4>
      <input id="fabric" style="width: 400px" />
    </div>
    <script>
    $(document).ready(function() {
        $("#fabric").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Cotton", value: "1" },
                { text: "Polyester", value: "2" },
                { text: "Cotton/Polyester", value: "3" },
                { text: "Rib Knit", value: "4" }
            ]
        });
    });
    </script>

    <script>
      //Open on focus logic
      $(function() {
        $("[data-role=combobox]").each(function() {
          var widget = $(this).getKendoComboBox();
          widget.input.on("focus", function() {
                widget.open();
          });
        });
      });
    </script>
  </div>
```
