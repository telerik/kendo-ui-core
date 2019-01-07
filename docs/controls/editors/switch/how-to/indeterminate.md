---
title: Set an indeterminate state of the Kendo UI Switch
page_title: Set an indeterminate state | Kendo UI Switch
description: "Learn how to set an indeterminate state of the Kendo UI Switch."
slug: howto_enable_dragging_switch
---

# Indeterminate state

The following example demonstrates how to set an indeterminate state of the Kendo UI Switch. The switch component behaves as a checkbox element. The `indeterminate state` is used only for visual representation, and thus the component will remain either `checked`, or `unchecked`.

###### Example

```html
  <style>
      .k-indeterminate .k-switch-container {
          background-color: #dfdfdf !important;
      }
  </style>

  <input type="checkbox" id="switch" />

  <script>
    var switchButton = $("#switch").kendoSwitch({
        checked: true,
        messages: {
            checked: "Yes",
            unchecked: "No",
        },
        change: function (e) {
            if (!e.checked) {
                if (!e.sender.element.prop("indeterminate")) {
                    e.sender.element.prop("indeterminate", true);
                    e.sender.wrapper.addClass("k-indeterminate");

                    e.sender.setOptions({messages: {checked: "N/A"}});
                    e.preventDefault();
                } else {
                    e.sender.element.prop("indeterminate", false);
                    e.sender.wrapper.removeClass("k-indeterminate");

                    e.sender.setOptions({messages: {checked: "Yes"}});
                }
            }
        }
    }).data("kendoSwitch");

  </script>
```

## See Also

* [Switch JavaScript API Reference](/api/javascript/ui/switch)