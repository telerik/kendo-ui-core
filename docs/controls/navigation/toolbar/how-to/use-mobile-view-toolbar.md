---
title: Use the Mobile View of the Toolbar
page_title: Use the Mobile View of the Toolbar | Kendo UI ToolBar
description: "Learn how to use the mobile view of the Kendo UI ToolBar widget."
slug: howto_usemobileview_toolbar
---

# Use the Mobile View of the Toolbar

To enable the mobile view of the ToolBar widget:

1. Add the mobile styles.
2. To configure the position of the tools to be rendered&mdash;`left` or `right`&mdash;use the `align` option.
3. Initialize `kendo.mobile.Application()`.

The example below demonstrates how to use the mobile view of the Toolbar. It is recommended that you open it in Dojo.

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
