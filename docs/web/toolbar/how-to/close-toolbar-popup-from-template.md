---
title: Close toolbar popup manually
page_title: Close toolbar popup manually
description: Close toolbar popup manually
---

# Close Toolbar Popup Manually

The example below demonstrates how to use close the toolbar popup from a button click event in a template.

#### Example:

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
