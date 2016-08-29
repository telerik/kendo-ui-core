---
title: Make Popup Appear in Center
page_title: Make Popup Appear in Center | Kendo UI Window
description: "Learn how to align the a popup to always appear in the center of a Kendo UI Window."
slug: howto_makepopupcenter_window
---

# Make Popup Appear in Center

The Kendo UI Window gains focus when it is opened or initialized through the `visible` parameter. This makes the browser scroll the page to bring the Window into view, which creates alignment issues when a popup is implemented and expected to show in the center of the browser viewport.

To avoid this behavior and to be able to properly position the popup, it is recommended that you initialize the widget with the `visible: false` configuration, and then call the `open()` and `center()` methods.

The example below demonstrates how to position a popup in the center of the browser viewport.

###### Example

```html
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

Other articles and how-to examples on the Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})

For more runnable examples on the Kendo UI Window, browse the [**How To** documentation folder]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %}).
