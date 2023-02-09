---
title: Set the Switch in the Indeterminate State
page_title: Set the Switch in the Indeterminate State
description: "Learn how to set the indeterminate state of the Kendo UI Switch."
slug: howto_set_indeterminate_state_switch
previous_url: /controls/editors/switch/how-to/indeterminate
tags: telerik, kendo, jquery, switch, set, indeterminate, state
component: switch
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Switch for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I set the Switch in an indeterminate state?

## Solution

The Switch behaves as a checkbox element. Its indeterminate state is used only for visual representation and, in this way, the Switch remains either in its checked or unchecked state.

The following example demonstrates how to set the Switch in an indeterminate state.

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

* [Basic Usage of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/index)
* [Using the API of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/api)
* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)
