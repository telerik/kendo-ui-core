---
title: Post to Iframe
page_title: Post to Iframe | Kendo UI Window
description: "Learn how to post to the iframe content of the Kendo UI Window."
slug: howto_posttoiframe_window
---

# Post to Iframe

The example below demonstrates how to post to the iframe content of the Kendo UI Window.

###### Example

```html
    <button id="refresh" class="k-button k-primary">Post content to iframe</button>

    <script>
      $("#refresh").click(function(e) {
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
      });
    </script>
```

## See Also

Articles and other how-to examples on Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
