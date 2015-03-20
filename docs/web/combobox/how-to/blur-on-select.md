---
title: Blur the ComboBox after select 
page_title: Blur the ComboBox after select
description: Example that shows how to blur the ComboBox after select
---

# How to blur the ComboBox after select

The example below demonstrates how to blur the ComboBox after select.

#### Example:

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>ComboBox</h4>
      <input id="combobox" style="width: 400px;"/>
    </div>
    <script>
      $(document).ready(function() {
        function onSelect(e) {
          //blur input
          this.input.blur();
        };

        var data = [
          { text: "Item 1", value:"1" },
          { text: "Item 2", value:"2" },
          { text: "Item 3", value:"3" }
        ];

        $("#combobox").kendoComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          select: onSelect
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
