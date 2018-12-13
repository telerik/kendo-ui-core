---
title: Keep Popup Editor Centered on Browser Resize in Grid
description: An example on how to center the edit popup window of the Kendo UI Grid on resize.
type: how-to
page_title: Keep the Edit Popup Always Centered | Kendo UI Grid
slug: grid-center-edit-popup-on-browser-resize
tags: grid, popup, edit, kendo, resize, browser, modal, re-size, window, re-centre,
ticketid: 1138443
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
</table>


## Description

The window of the popup editor in the Grid does not re-center itself when the browser is resized and might also overflow the page and move out of sight.

How can I keep the popup editor centered (like a modal window) when the browser is resized?

## Solution

1. Add a handler on the browser window `onresize` event.
1. Find the Kendo UI Window instance.
1. Center it programmatically by using the [`center()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/center) method.

```
window.onresize = function () {  
    var kendoWindow = $("[data-role='window']");
    if (kendoWindow.length) {    
        var win = $(kendoWindow).data("kendoWindow");
        win.center();
    }
}
```

```dojo
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
