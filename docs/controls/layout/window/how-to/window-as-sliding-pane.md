---
title: Use Kendo Window as Sliding Pane
page_title: Use Kendo Window as Sliding Pane | Kendo UI Window
description: "Learn how Use Kendo UI Window as Sliding Pane."
slug: howto_windowasslidingpane_window
---

# Use Kendo Window as Sliding Pane

You can see here a simple Kendo Window configuration that will accomplish the visual effect of a sliding UI component in your page.

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
