---
title: How to keep edit popup centered on browser resize - Kendo UI Grid
description: how to center kendo popup edit window on resize
type: how-to
page_title: Keep the edit popup always centered
slug: grid-center-edit-popup-on-browser-resize
position:
tags: grid, popup, edit, kendo, resize, browser, modal, re-size, window, re-centre,
teampulseid:
ticketid: 1138443
pitsid:
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
 </tr>
</table>


## Description

I have a popup editable Kendo UI Grid. If I have the popup editor open, I notice when I re-size the browser window, the popup window doesn't re-center itself and it may even overflow off of the page out of sight. Is there a way to keep this centered like a modal when the browser is resized?

## Solution

Add a handler on the browser window onresize revent, find the Kendo UI Window instance and centre it programmatically with the [`center()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window#methods-center) method.

```
window.onresize = function () {  
    var kendoWindow = $("[data-role='window']");
    if (kendoWindow.length) {    
        var win = $(kendoWindow).data("kendoWindow");
        win.center();
    }
}
```

```html
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" },
          { command: "edit" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        editable: "popup"
      });
      window.onresize = function () {
        var kendoWindow = $("[data-role='window']");
        if (kendoWindow.length) {
          var win = $(kendoWindow).data("kendoWindow")
          win.center();
        }
      }
    </script>
```
