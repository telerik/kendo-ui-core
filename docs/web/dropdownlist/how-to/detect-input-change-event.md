---
title: Detect input change event 
page_title: Detect input change event 
description: Example that shows how to detect input change event 
---

# How to detect input change event 

Example that shows how to detect input change event 

#### Example:

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4 class="title">DropDownList</h4>
      <input id="dropdownlist" style="width: 400px;"/>
    </div>
    <div class="box">                
      <h4>Console log</h4>
      <div class="console"></div>
    </div>
    <script>
      $(document).ready(function() {
        function widgetChange() {
          kendoConsole.log("event: change (widget)");
        };

        function inputChange() {
          kendoConsole.log("event: change (input)");
        };

        var data = [
          {text: "Item1", value:"1"},
          {text: "Item2", value:"2"},
          {text: "Item3", value:"3"}
        ];

        $("#dropdownlist").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          change: widgetChange
        });

        $("#dropdownlist").change(inputChange);
      });
    </script>            
    <style scoped>
      .demo-section {
        width: 400px;
      }
    </style>   
  </div>
```
