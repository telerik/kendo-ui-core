---
title: Detect wrapper focus event 
page_title: Detect wrapper focus event
description: Example that shows how to detect Kendo UI DropDownList wrapper focus event
---

# How to detect wrapper focus event

Example that shows how to detect Kendo UI DropDownList wrapper focus event

#### Example:

```html
  <input id="ddl1" class="ddl" />
  <input id="ddl2" class="ddl" />
  <input id="ddl3" class="ddl" />
  <input id="ddl4" class="ddl" />
  
  <script>
    $(function() {
      $(".ddl").kendoDropDownList();
      
      $(".ddl").on("focus", function() {
        alert("focus");
      });
    });
  </script>
```
