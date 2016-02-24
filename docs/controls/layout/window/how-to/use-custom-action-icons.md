---
title: Use Custom Action Icons
page_title: Use Custom Action Icons | Kendo UI Window
description: "Learn how to restrict the movement of a Kendo UI Window to a certain area."
slug: howto_customactionicons_window
---

# Use Custom Action Icons

There are two options to use custom icons for the action buttons of a Kendo UI Window:

* Use some of the [built-in Kendo UI icons, which are part of the theme sprite](http://demos.telerik.com/kendo-ui/styling/icons). Note that you can only use the `"normal"` icons that work with a `k-i-...` CSS class.
* Use a custom icon, which is not provided by or related to Kendo UI.

The example below demonstrates the two options of how to use custom icons for the action buttons of a Kendo UI Window. Note that the custom Window action name takes part in the generated CSS class of the icon's `span` element in the Window titlebar. For example, an action name `abc` is going to generate a `span.k-i-abc` element in the titlebar. When using Kendo UI icons, there is no need to write additional CSS code. When using non-Kendo UI icons, custom CSS is required, so that the generated CSS class is assigned the desired background image.

###### Example

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
          actions: ["foo", "clock"], // action names generate icons with corresponding CSS classes
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

## See Also

Articles and other how-to examples on Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Add Close Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
