---
title: Add Auto-Resizing Splitter
page_title: Add Auto-Resizing Splitter | Kendo UI Window
description: "Learn how to add a Splitter that resizes automatically along with the Kendo UI Window."
slug: howto_addautoresizingsplitter_window
---

# Add Auto-Resizing Splitter

The example below demonstrates how to add a Splitter that resizes automatically along with the Kendo UI Window widget.

###### Example

```html
    <style>
      html
      {
        font: 12px sans-serif;
      }

      #splitter
      {
        border-width: 0;
        height: 100%;
      }

      #win
      {
        padding: 0;
        overflow: hidden;
      }
    </style>
    <div id="win">
      <div id="splitter">
        <div>left pane <br /><br />
          Please resize the Window and watch the Splitter resize automatically.</div>
        <div>right pane</div>
      </div>
    </div>
    <script>
      $("#win").kendoWindow({
        title: "Kendo UI Window",
        modal: true,
        width: 400,
        height: 250
      }).data("kendoWindow").center();

      $("#splitter").kendoSplitter({
        panes: [{},{}]
      });
    </script>
```

## See Also

Other article and how-to examples on the Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})

For more runnable examples on the Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %}).
