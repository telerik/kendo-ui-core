---
title: Custom Actions
page_title: jQuery Window Documentation | Custom Actions | Kendo UI
description: "Get started with the jQuery Window by Kendo UI and learn how to set custom user actions."
slug: customactions_window
position: 5
---

# Custom Actions

If you supply a non-recognized action name, that name is treated as a custom action.

The Window then renders `k-icon` and `k-i-actionname` CSS classes for the action but does not automatically attach a `click` event handler to it. While the Kendo UI stylesheets provide a `"custom"` icon for custom actions, you can use any of the icon names. To capture and handle the `click` events, follow the standard approach.

      $("#window").kendoWindow({
          actions: ["Custom", "Minimize", "Maximize", "Close"],
          title: "Window Title"
      }).data("kendoWindow").wrapper.find(".k-i-custom").click(function(e) {
          alert("Custom action button clicked");
          e.preventDefault();
      });

## See Also

* [Implementing Custom Actions in the Window (Demo)](https://demos.telerik.com/kendo-ui/window/actions)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
