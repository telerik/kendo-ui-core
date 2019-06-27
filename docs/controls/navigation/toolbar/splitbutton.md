---
title: SplitButton
page_title: SplitButton | Kendo UI ToolBar
description: "Learn how to configure and use the SplitButton Command Type of the Kendo UI ToolBar widget."
slug: splitbutton_toolbar_widget
position: 5
---

# SplitButton

The SplitButton is a composite control which has a primary (main) button and alternative options that are displayed in a drop-down list which is bound to a secondary button.

In the command overflow popup, the SplitButton is rendered as a flat list of commands. The first one is the primary (main) button, followed by the drop-down items in the order they are defined.

The following example demonstrates how to define a SplitButton in the ToolBar widget.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "splitButton", //setting the command type is mandatory
                    text: "SplitButton", //define the text of the primary button
                    icon: "folder-add", //set icon of the primary button
                    menuButtons: [ //define the drop-down options
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
