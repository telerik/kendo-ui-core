---
title: Templates
page_title: jQuery ToolBar Documentation | Templates
description: "Get started with the jQuery ToolBar by Kendo UI and define custom items with templates."
slug: templates_kendoui_toolbar
position: 3
---

# Templates

The ToolBar allows you to define custom items.

Unlike all other commands, the template command does not need a set type. If a template is provided, the `type` property will be ignored. By default, you have to define both `template` and `overflowTemplate` to specify the way the commandwill be rendered in the command overflow popup. If the command is not intended to appear in the command overflow popup, set its `overflow` property to `"never"`.

> By default, a custom template command without `overflowTemplate` will not be rendered in the command overflow popup&mdasjh;for example, it will not be considered as `overflow: never`.

The following example demonstrates how to add a template command.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    // Specifies what element will be added in the ToolBar wrapper.
                    template: '<img class="mail-icon" src="gmail.png" alt="gmail" />',

                    // Specifies what element will be added to the command overflow popup.
                    overflowTemplate: '<img class="mail-overflow-icon" src="gmail-overflow.png" alt="gmail" />
                }
            ]
        });
    </script>

The following example demonstrates how to add a template command that is going to appear only in the ToolBar wrapper.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    //specifies what element will be added in the ToolBar wrapper
                    template: '<img class="mail-icon" src="gmail.png" alt="gmail" />',
                    overflow: "never"
                }
            ]
        });
    </script>

Custom template commands allow you to add other Kendo UI widgets in the ToolBar. The following example demonstrates how to implement a Kendo UI DropDown widget in the Kendo UI ToolBar.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                // Add the DropDownList element to the ToolBar with a template.
                { template: '<input id="dropdownlist" />', overflow: "never" }
            ]
        });

        // Initialze the DropDownList after the ToolBar.
        $("#dropdownlist").kendoDropDownList({
            dataSource: [{ item: "Item 1", value: 1 }, { item: "Item 2", value: 2 }],
            dataTextField: "item",
            dataValueField: "value"
        });
    </script>

## See Also

* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
