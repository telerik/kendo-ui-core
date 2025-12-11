---
title: Animations
page_title: Kendo UI for jQuery ActionSheet Documentation - Animations
description: "Get started with the Kendo UI for jQuery ActionSheet and learn how to control the animations when opening or closing the component."
components: ["actionsheet"]
slug: animations_actionsheet_widget
position: 5
---

# Animations

The ActionSheet in [adaptive mode](/api/javascript/ui/actionsheet/configuration/adaptive) supports opening and closing animations. 

By default, the ActionSheet animations are disabled, and the component opens and closes instantly.

You can modify the opening and closing animations through the `open` and `close` options of the `animation` configuration. These properties are effective only when the `adaptive` mode is enabled.

The following example demonstrates how to specify animation effects with duration when the ActionSheet opens and closes.

```dojo
 <button id="open">Open</button>
    <div id="actionsheet"></div>
    <script>
      var actionsheet = $("#actionsheet")
        .kendoActionSheet({
          title: "Select item",
          adaptive: true,
          animation: {
            open: {
              effects: "slideIn:down",
              duration: 1500,
            },
            close: {
              effects: "slideIn:down",
              duration: 1500,
            },
          },
          items: [
            {
              text: "Edit Item",
              icon: "pencil"
            },
            {
              text: "Add to Favorites",
              icon: "heart"
            },
            {
              text: "Upload New",
              icon: "upload"
            },
            {
              text: "Cancel",
              icon: "cancel",
              group: "bottom"
            },
          ],
        })
        .data("kendoActionSheet");

      $('#open').on('click', function(){
        actionsheet.open();
      })
    </script>
```


## See Also

* [Animation of the ActionSheet (Demo)](https://demos.telerik.com/kendo-ui/actionsheet/animation)
* [JavaScript API Reference of the ActionSheet](/api/javascript/ui/actionsheet)
