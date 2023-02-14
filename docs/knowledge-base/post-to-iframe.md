---
title: Post to the Iframe Content of the Window 
page_title: Post to the Iframe Content of the Window 
description: "Learn how to post to the iframe content of the Kendo UI Window."
slug: howto_posttoiframe_window
previous_url: /controls/layout/window/how-to/post-to-iframe
tags: telerik, kendo, jquery, window, post, to, the, iframe, content, of
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

How can I post to the iframe content of the Kendo UI Window?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
    <button id="refresh">Post content to iframe</button>
    <script>
      $("#refresh").kendoButton({
        themeColor:"primary",
        click:function(e) {
          e.preventDefault();
          var id = "target_iframe";
          var dialog = $("<div><iframe class='k-content-frame' name='" + id + "'></div>").kendoWindow({
            width: "615px",
            title: "Posting to iframe example",
            close: function() { this.destroy() },
            iframe: true
          });
          dialog.data("kendoWindow").center().open();
          $("<form />", {
            action: "http://www.example.com/",
            method: "post",
            target: id
          })
            .hide().appendTo("body")
          // add any data
            .append("<input name='foo' />").find("[name=foo]").val("bar").end()
            .submit().remove();
        }
      })
    </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})

