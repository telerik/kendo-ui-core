---
title: Submit form on ENTER
page_title: Submit form on ENTER
description: Submit form on ENTER
---

# Submit form on ENTER

The example below demonstrates how to submit a form when ENTER key is pressed.

#### Example:

```html
    <form id="form1" style="border: 1px solid red">
   	    <input id="datepicker" /> 
        <button>Submit</button>
    </form>
  
    <script>
        $(function() {
          var form = $("#form1");
          
          $("#datepicker").kendoDatePicker();
          
          form.on("submit", function(e) {
            e.preventDefault();
                alert("submit!");    
          });
        });
    </script>
```
