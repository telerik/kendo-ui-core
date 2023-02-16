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

Starting with R1 2023 release the ToolBar no longer allows the use of togglable and non-togglable buttons in the same ButtonGroup. If such a configuration is present, all buttons will be rendered and behave as simple (non-togglable) buttons.

Starting with R1 2023 release the ToolBar Overflow menu will open on each click on its button. That is the behavior of the ContextMenu component used in that scenario.

## Kendo UI 2023 R1 SP1

**Editor**

Starting with R1 2023 SP1 the Editor widget features an improved method to register custom Tools. The main difference with the previous implementation is the substitution of the `ToolTemplate` instance with a `ui` configuration object. An example of of the new approach of registering tools could be found in the [Create Custom Editor Tool]({% slug editor-custom-tool %}) KB article.

Starting with R1 2023 SP1 release the Editor no longer allows the use of togglable and non-togglable buttons in the same ButtonGroup of its ToolBar. If such a configuration is present, all buttons will be rendered as simple (non-togglable) buttons.

Starting with R1 2023 SP1 release the `break` pseudo tool is no longer needed in order to separate tools from the same logical group. In order to display such tools separately, you should simply place them in separate arrays in the `tools` configuration:

```dojo
    <textarea id="editor" rows="10" cols="30" style="width:100%; height: 440px;"></textarea>
    $("#editor").kendoEditor({
        tools: [
            ["bold"],
            ["italic"],
            ["underline"],
            ["strikethrough"]
        ]
    });
```

Multiple tools could also be grouped in a group by following the same approach:

```dojo
    <textarea id="editor" rows="10" cols="30" style="width:100%; height: 440px;"></textarea>
    $("#editor").kendoEditor({
        tools: [
            ["bold", "italic"],
            ["underline", "strikethrough"]
        ]
    });
```
