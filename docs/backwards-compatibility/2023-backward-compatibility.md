---
title: 2023 Releases
page_title: 2023 Releases - Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2023."
slug: breakingchanges2023_kendoui
position: 0
---

# 2023 Releases

This article lists the breaking or important changes in the 2023 releases of Kendo UI.

## Kendo UI 2023 R1

**ToolBar**

Starting with R1 2023 the tools in the ToolBar are actual widget instances (instead of ToolBar items). As a result, the `click` and `toggle` event arguments objects no longer hold a reference to the ToolBar item (`e.item`). From that release on, the widget instance of the tool can be taken using the `kendo.widgetInstance()` method. When rendered in the OverflowMenu or the popup of a DropDownButton/SplitButton those tools are menu items. Hence, they are not Kendo widgets. A reference to the jQuery elements is still available in those cases in the `e.target` event argument.

```html
    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", togglable: true },
                { type: "button", id: "btn2", text: "Button 2" }
            ],
            click: function(e) {
                console.log("click:");
                console.log(kendo.widgetInstance(e.target));
            },
            toggle: function(e) {
                console.log("toggle: ", e.checked);
                console.log(kendo.widgetInstance(e.target));
            }
        });
    </script>
```

Starting with R1 2023 the ToolBar buttons will always be rendered as `<button>` elements (instead of `<a>`) unless they have a `url` configured in their options. If a `url` is present, those will be rendered as links (`<a>`).

Starting with R1 2023 the ToolBar no longer requires its custom tools to be registered. To explore the new simplified way of defining custom tools in the ToolBar, refer to the [Custom Tools]({% slug custom_tools_kendoui_toolbar %}) documentation article.

**Spreadsheet**

Starting with R1 2023 the default tools in the Home Tab of the Spreadsheet ToolBar have been re-arranged. The new order and grouping aims to better mimic the order of the tools present in MS Excel. In also offers better logical grouping of similar tools in available in the Spreadsheet.
