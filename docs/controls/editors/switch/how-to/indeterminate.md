---
title: Set the Switch in Indeterminate State
page_title: Set the Switch in Indeterminate State | Kendo UI Switch
description: "Learn how to set the indeterminate state of the Kendo UI Switch."
slug: howto_set_indeterminate_state_switch
---

# Set the Switch in Indeterminate State

The Switch behaves as a checkbox element.

The indeterminate state of the Switch is used only for visual representation and, in this way, the Switch remains either in its checked or unchecked state.

The following example demonstrates how to set the Switch in an indeterminate state.

###### Example

```dojo
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
