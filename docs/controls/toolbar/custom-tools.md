---
title: Custom Tools
page_title: jQuery ToolBar Documentation - Custom Tools
description: "Get started with the jQuery ToolBar by Kendo UI and define custom tools."
slug: custom_tools_kendoui_toolbar
position: 4
---

# Custom Tools

The ToolBar allows you to define custom and use custom tools.

The following example demonstrates how to add a custom tool to the component if you are using version 2023 R1 or newer of Kendo UI.

```dojo
    <div id="toolbar"></div>
    <script>
        // we will use this array as data for the DropDownList/ListView
        var source = [
            { text: "Option 1", value: 1 },
            { text: "Option 2", value: 2 },
            { text: "Option 3", value: 3 },
            { text: "Option 4", value: 4 },
            { text: "Option 5", value: 5 }
        ];
        var toolText = "Choose an option";

        $("#toolbar").kendoToolBar({
            items: [{
                // Initialize the standard tool.
                type: "button",
                id: "myButton",
                text: "My Button",
                click: onMyButtonClick
            },
            {
                // Initialize the custom tool with options.
                component: "DropDownList", // Specify the component type that will be used in the ToolBar element.
                // Specify the configuration options of the component.
                componentOptions: {
                    dataSource: source,
                    height: "auto",
                    dataTextField: "text",
                    dataValueField: "value",
                    optionLabel: toolText,
                    change: (e) => { // Do something when the value changes.
                        console.log("Option " + e.sender.value() + " is selected");
                    }
                },
                // Specify the configuration for the OverflowMenu item of the tool.
                overflowComponent: {
                    type: "button",
                    text: toolText,
                },
                click: (e) => {
                    // Initialize the dialog if the OverflowMenu item has been clicked.
                    var dialogEl = $("<div><div class='k-list'></div></div>"),
                        uid = e.target.data("uid"),
                        ddlEl = $("#toolbar").find("[data-uid=" + uid + "] [data-role=dropdownlist]"),
                        ddl = ddlEl.getKendoDropDownList(),
                        selectedValue = ddl.value(),
                        dialog, listView;

                    dialog = $(dialogEl).kendoWindow({
                        title: toolText,
                        width: 280,
                        height: 220,
                        deactivate: () => {
                            // Destroy the components and clear the DOM upon closing the window.
                            listView.destroy();
                            dialog.destroy();
                            dialogEl.remove();
                        }
                    }).data("kendoWindow");

                    listView = dialog.element.find("div").kendoListView({
                        dataSource: source,
                        template: "<div data-value='#=value#' class='k-item'>#= text #</div>",
                        selectable: true,
                        change: (ev) => {
                            var listView = ev.sender,
                                dataItem = listView.dataSource.getByUid(listView.select().data("uid"));

                            // Keep the DDL value in sync.
                            ddl.value(dataItem.value);
                            // Do something when the value changes.
                            console.log("Option " + dataItem.value + " is selected");
                        }
                    }).data("kendoListView");

                    // Keep the ListView value in sync if selection is present in the DDL.
                    if (selectedValue) {
                        listView.select($("[data-value=" + selectedValue + "]"));
                    }

                    dialog.open();
                }
            }]
        });

        function onMyButtonClick(e) {
            console.log("myButton click");
        }
    </script>
```

## See Also

* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
