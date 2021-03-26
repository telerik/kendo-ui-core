---
title: Checked Switch
page_title: jQuery Switch Documentation | Checked Switch
description: "Get started with the jQuery Switch by Kendo UI and learn how to apply its checked and unchecked state."
slug: checked_kendoui_switch_widget
position: 2
---

# Checked Switch

The checked state of the Switch depends on the [`checked` configuration option](/api/javascript/ui/switch#checked) or the `checked` attribute of the widget element.

The following example demonstrates how to initialize the Switch from a checked `input`.

    <input type="checkbox" id="switch" checked="checked" />

    <script>
        var switchInstance = $("#switch").kendoSwitch();
    </script>

The following example demonstrates how to initialize a checked Switch by using the jQuery plugin syntax.

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch({
                checked: true
            });
    </script>

## See Also

* [Basic Usage of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/index)
* [Using the API of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/api)
* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)
