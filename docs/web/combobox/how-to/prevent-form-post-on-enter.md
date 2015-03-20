---
title: Prevent from POST on ENTER key press
page_title: Prevent from POST on ENTER key press
description: Example that shows how to prevent from POST on ENTER key press 
---

# How to prevent from POST on ENTER key press 

The example below demonstrates how to prevent from POST on ENTER key press 

#### Example:

```html
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
