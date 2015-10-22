---
title: Virtualization of local data  
page_title: Virtualization of local data
description: Example that shows how to implement virtualization of local data
---

# Virtualization of local data

Example that shows how to implement virtualization of local data.

#### Example:

```html
  <div id="example">
      <div>
        <h4>Items</h4>
        <input id="items" style="width: 400px" />
      </div>

      <script>
        $(document).ready(function() {
          var data = [];
          for (var idx = 0; idx < 6000; idx++) {
            data.push({
              text: "item" + idx, value: idx 
            });
          }

          $("#items").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            virtual: {
              itemHeight: 26,
              valueMapper: function(options) {
                options.success([options.value]); //return the value <-> item index mapping;										
              }
            },
            height: 200,
            dataSource: {
              data: data
            }
          });
        });

      </script>
    </div>
```
