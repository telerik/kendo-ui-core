---
title: Add Close Buttons inside Modal Windows
page_title: Add a Close Button inside a Modal Window - jQuery Window
description: "Learn how to add a Close button to a modal Kendo UI for jQuery Window."
slug: howto_addclosebutton_insidemodalwindows_window
previous_url: /controls/layout/window/how-to/add-close-button
tags: telerik, kendo, jquery, window, add, close, button, inside, modal, windows
component: window
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Window for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I add a **Close** button to a modal Kendo UI Window?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
    <div id="window">
      <button id="close">Close</button>
    </div>
    <button id="open">Open window</button>
    <script>
      $(document).ready(function() {
        var wnd = $("#window");
        $("#open").kendoButton({
          click:function(){
            wnd.data("kendoWindow").open();
            $("#open").hide();
          }
        })
        $("#close").kendoButton({
          click:function(){
            $("[data-role=window]").data("kendoWindow").close();
          }
        })
        if (!wnd.data("kendoWindow")) {
          wnd.kendoWindow({
            modal: true,
            title: "Dialog window",
            close: function() {
              $("#open").show();
            },
            visible: false
          });
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Kendo UI for jQuery Window](/api/javascript/ui/window)
* [Post to Iframes in the Window]({% slug howto_posttoiframe_window %})
* [Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [Use Custom Action Icons in the Window]({% slug howto_customactionicons_window %})
