---
title: Use custom Window action icons
page_title: Use custom Window action icons
description: Use custom Window action icons
---

# Use custom Window action icons

The example below demonstrates how to use custom icons for the Window's action buttons. There are two options:

* use some of the [built-in Kendo UI icons, which are part of the theme sprite](http://demos.telerik.com/kendo-ui/styling/icons). Note that you can only use the **"normal"** icons
that work with a `k-i-...` CSS class.

* use a custom icon, which is not provided by or related to Kendo UI.

The example below demonstrates both options.
The important thing to note is that the custom Window action name takes part in the generated CSS class of the icon's `span` element in the Window titlebar.
For example an action name `abc` will generate a `span.k-i-abc` element in the titlebar. When using Kendo UI icons, there is no need to write additional CSS code. When using
non-Kendo UI icons, custom CSS is required, so that the generated CSS class is assigned the desired background image.

#### Example:

```html
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
          actions: ["foo", "clock"], // action names generate icons with a match
          title: "Window Title"
        }).data("kendoWindow");

        win.wrapper.find(".k-i-foo").click(function(e) {
          $("#time-foo").html(returnTimeString());
        });
        
        win.wrapper.find(".k-i-clock").click(function(e) {
          $("#time-clock").html(returnTimeString());
        });
        
        function returnTimeString() {
          var d = new Date();
          return kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000");
        }
        
      });
    </script>
```