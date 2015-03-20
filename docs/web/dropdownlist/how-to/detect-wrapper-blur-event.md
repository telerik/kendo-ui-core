---
title: Detect wrapper blur event 
page_title: Detect wrapper blur event
description: Example that shows how to detect Kendo UI DropDownList wrapper blur event
---

# How to detect wrapper blur event

Example that shows how to detect Kendo UI DropDownList wrapper blur event

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
        function onOpen() {
          kendoConsole.log("event: open");
        };

        function onClose() {
          kendoConsole.log("event: close");
        };

        function onChange() {
          kendoConsole.log("event: change");
        };

        function onSelect(e) {
          if ("kendoConsole" in window) {
            var dataItem = this.dataItem(e.item.index());
            kendoConsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")" );
          }
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
          select: onSelect,
          change: onChange,
          close: onClose,
          open: onOpen
        });

        var wrapper = $("#dropdownlist").data("kendoDropDownList").wrapper;

        wrapper.blur(function() {
          kendoConsole.log("wrapper blur");
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
