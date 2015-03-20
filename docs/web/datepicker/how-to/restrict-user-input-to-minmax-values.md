---
title: Restrict user input to min/max values
page_title: Restrict user input to min/max values
description: Restrict user input to min/max values
---

# Restrict user input to min/max values

The example below demonstrates how to restrict user input to min/max values set via the widget configuration.

#### Example:

```html
    <input id="DOB" value="30/06/2010" />
  	<script>
      $(function() {
        $("#DOB").kendoDatePicker({
          format: "dd/MM/yyyy",
          min: new Date(2000, 10, 10),
          max: new Date(2020, 10, 10),
          change: onDOBChange
        });
      });
    </script>
  
    <script>
        function onDOBChange(e) {
            var dt = e.sender;
          	var value = dt.value();
          	
          	if (value === null) {
              value = kendo.parseDate(dt.element.val(), dt.options.parseFormats);
            }
          
            if (value < dt.min()) {
                dt.value(dt.min());
            }else if (value > dt.max()) {
                dt.value(dt.max());
            }
        }
    </script>
```
