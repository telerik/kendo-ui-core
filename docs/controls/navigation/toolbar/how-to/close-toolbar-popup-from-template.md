---
title: Close ToolBar Popup Manually
page_title: Close ToolBar Popup Manually | Kendo UI ToolBar
description: "Learn how to close the Kendo UI ToolBar popup manually."
slug: howto_closetoolbarpopupmanually_toolbar
---

# Close ToolBar Popup Manually

The example below demonstrates how to close the Kendo UI ToolBar popup from a button `click` event in a template.

##### Example

```html
   <div id="toolbar"></div>
    </div>

  <script>
    function action() {
      $("#toolbar").data("kendoToolBar").popup.close();
    }

    $("#toolbar").kendoToolBar({
      items: [
        { type: "button", text: "Button" },
        {
          template:"<a class='k-item k-state-default ng-scope' >Test</a>",
          overflowTemplate:"<button onclick='action()' class='btn' >Test</button>",
          overflow: "always"
        }
      ]
    });
  </script>
```

## See Also

Other articles on Kendo UI ToolBar:

* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
* [How to Develop and Register Custom ToolBar Tools]({% slug howto_customtool_toolbar %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_toolbar %})
