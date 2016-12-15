---
title: Use Mobile View of ToolBar
page_title: Use Mobile View | Kendo UI ToolBar
description: "Learn how to use the mobile view of the Kendo UI ToolBar widget."
slug: howto_usemobileview_toolbar
---

# Use FontAwesome Icons

The example below demonstrates how to enable the mobile view of the ToolBar widget:

1. Add the mobile styles;
2. Use the `aligh` option to configure where tools to be rendered (`left` or `right`);
3. Initialize `kendo.mobile.Application()`.

>tip: Open in Dojo

###### Example

```html
<div id="toolbar"></div>
<script>
  $("#toolbar").kendoToolBar({
    items: [
          { type: "button", text: "Button 1", align: "left" },
          { type: "button", text: "Button 2", align: "left" },
          { type: "button", text: "Button 3" },
          { type: "button", text: "Button 4" }
      ]
  });

  var app = new kendo.mobile.Application(document.body);
</script>
```

## See Also

Other articles on the Kendo UI ToolBar:

* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
* [How to Close ToolBar Popup Manually]({% slug howto_closetoolbarpopupmanually_toolbar %})
* [How to Develop and Register Custom ToolBar Tools]({% slug howto_customtool_toolbar %})
