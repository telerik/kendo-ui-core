---
title: Use Custom Action Icons in the Window
page_title: Use Custom Action Icons in the Window
description: "Learn how to use custom action icons in the Kendo UI Window."
slug: howto_customactionicons_window
previous_url: /controls/layout/window/how-to/use-custom-action-icons
tags: telerik, kendo, jquery, window, use, custom, action, icons
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

How can I use custom icons for the action buttons of a Kendo UI for jQuery Window?

## Solution

To achieve the desired scenario, use any of the following approaches:

* Use some of the [built-in Kendo UI icons, which are part of the theme sprite](https://demos.telerik.com/kendo-ui/styling/icons). Note that you can only use the `"normal"` icons that work with a `k-i-...` CSS class.
* Use a custom icon, which is not provided by or related to Kendo UI.

The example below demonstrates the two options of how to use custom icons for the action buttons of a Kendo UI Window. Note that the custom Window action name takes part in the generated CSS class of the icon's `span` element in the Window title bar. For example, an action name `abc` is going to generate a `span.k-i-abc` element in the title bar. When using Kendo UI icons, there is no need to write additional CSS code. When using non-Kendo UI icons, custom CSS is required, so that the generated CSS class is assigned the desired background image.



```dojo
    <style>

      /* "foo" matches the custom action name */
      .k-i-foo
      {
      	background-color: #f00;
        background-image: url(".place.your.own.icon.here.");
      }

    </style>

    <div id="window">
      <p id="time-foo" style="color:#f00">&nbsp;</p>
      <p id="time-clock" style="color:#00f">&nbsp;</p>
    </div>

    <script>
      $(document).ready(function() {
        var win = $("#window").kendoWindow({
          width: 300,
          actions: ["foo", "clock"], // action names generate icons with corresponding CSS classes
          title: "Window Title"
        }).data("kendoWindow");

        win.wrapper.find(".k-i-foo").parent().click(function(e) {
          $("#time-foo").html(returnTimeString());
        });

        win.wrapper.find(".k-i-clock").parent().click(function(e) {
          $("#time-clock").html(returnTimeString());
        });

        function returnTimeString() {
          var d = new Date();
          return kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000");
        }

      });
    </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
