---
title: Use Windows as Sliding Panes
page_title: Use Windows as Sliding Panes | Kendo UI Window
description: "Learn how Use Kendo UI Window as Sliding Pane."
slug: howto_windowasslidingpane_window
---

# Use Windows as Sliding Panes

You can configure the Kendo UI Window so it acquires the visual effect of a sliding UI component.

The following example demonstrates how to make the Window behave as a sliding pane.

###### Example

```html
<div id="dialog">
  <p>Some content</p>
</div>

<a href="#" id="openWindow" class="k-button">Open</a>

<script>
  $("#dialog").kendoWindow({
    title: "Title",
    width: "60%",
    height: "94%",
    actions: [ "close" ],
    draggable: false,
    resizable: false,
    modal: true,
    position:{
      top: 0,
      left: "40%"
    },
    animation: {
    	open: {
      	effects: "slideIn:left",
        duration: 500
      },
      close: {
      	effects: "slideIn:left",
        reverse: true,
        duration: 500
      },
    },
    visible: false
  });

  $("#openWindow").click(function(){
    var dialog = $("#dialog").getKendoWindow();
    dialog.open();
  })
</script>
```

## See Also

Other articles and how-to examples on the Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})

For more runnable examples on the Kendo UI Window, browse the [**How To** documentation folder]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %}).
