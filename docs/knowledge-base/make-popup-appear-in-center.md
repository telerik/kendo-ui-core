---
title: Render a Popup in the Center of the Window
page_title: Render a Popup in the Center of the Window
description: "Learn how to align the a popup to always appear in the center of a Kendo UI Window."
slug: howto_makepopupcenter_window
previous_url: /controls/layout/window/how-to/make-popup-appear-in-center
tags: telerik, kendo, jquery, window, render, popup, in, the, center, of, the
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
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show a popup in the center of the Kendo UI for jQuery Window?

## Solution

The Kendo UI Window gains focus when it is opened or initialized through the `visible` parameter. This makes the browser scroll the page to bring the Window into view, which creates alignment issues when a popup is implemented and expected to show in the center of the browser viewport.

To avoid this behavior and to be able to properly position the popup, it is recommended that you initialize the widget with the `visible: false` configuration, and then call the `open()` and `center()` methods.

The example below demonstrates how to position a popup in the center of the browser viewport.



```dojo
    <button>Create and open popup</button>
     <div id="windowForAssign"></div>
     <script>
       $('button').click(createAndShowPopup);
       var kendoWindowAssign = $("#windowForAssign");
       var title = "Sample title";
       var url = "http://jsonplaceholder.typicode.com/posts";

       function createAndShowPopup(){
         kendoWindowAssign.kendoWindow({
           width: "650px",
           modal: true,
           height: '120px',
           iframe: true,
           resizable: false,
           title: title,
           content: url,
           visible: false
         });

         var popup = $("#windowForAssign").data('kendoWindow');
         popup.open();
         popup.center();
       }
     </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})


