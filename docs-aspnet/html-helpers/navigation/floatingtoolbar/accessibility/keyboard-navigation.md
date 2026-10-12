---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Learn how to use the keyboard navigation functionality of the Telerik UI FloatingToolBar component for {{ site.framework }}."
components: ["floatingtoolbar"]
slug: keynav_aspnetcore_floatingtoolbar
position: 2
---

# Keyboard Navigation

The keyboard navigation of the FloatingToolBar is always available. The hosted ToolBar handles the navigation between the tools. When the `Draggable()` option is enabled, the FloatingToolBar also lets users move the toolbar with the keyboard.

## Navigating the Tools

The FloatingToolBar supports the keyboard shortcuts of the hosted ToolBar:

| Shortcut | Behavior |
|----------|----------|
| `Tab` | Moves the focus into and out of the toolbar. |
| `Left Arrow` and `Right Arrow` | Moves the focus to the previous or next tool. |
| `Home` and `End` | Moves the focus to the first or last tool. |
| `Enter` and `Space` | Activates the focused tool. |

For the complete list of ToolBar shortcuts, refer to the [ToolBar keyboard navigation]({% slug keynav_aspnetcore_toolbar %}) article.

## Moving the Toolbar

When `Draggable()` is enabled, the toolbar renders a drag handle that users can focus and use to enter the keyboard Move mode:

| Shortcut | Behavior |
|----------|----------|
| `M` | Enters the Move mode and focuses the drag handle. When the Move mode is active and the drag handle is focused, commits the new position. |
| `Up Arrow`, `Down Arrow`, `Left Arrow`, and `Right Arrow` | In the Move mode, moves the toolbar by 10 pixels in the respective direction. Each movement is announced to screen readers. |
| `Enter` | Commits the new position and exits the Move mode. |
| `Escape` | Restores the position from before the Move mode and exits the Move mode. |

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Draggable(true)
        .AriaLabel("Image editing tools")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Crop").Icon("crop").ShowText(ShowIn.Overflow);
            items.Add().Type(CommandType.Button).Text("Rotate").Icon("rotate").ShowText(ShowIn.Overflow);
            items.Add().Type(CommandType.Separator);
            items.Add().Type(CommandType.Button).Text("Undo").Icon("undo").ShowText(ShowIn.Overflow);
            items.Add().Type(CommandType.Button).Text("Redo").Icon("redo").ShowText(ShowIn.Overflow);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" draggable="true" aria-label="Image editing tools">
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Crop" icon="crop" show-text="ShowIn.Overflow" />
            <item type="CommandType.Button" text="Rotate" icon="rotate" show-text="ShowIn.Overflow" />
            <item type="CommandType.Separator" />
            <item type="CommandType.Button" text="Undo" icon="undo" show-text="ShowIn.Overflow" />
            <item type="CommandType.Button" text="Redo" icon="redo" show-text="ShowIn.Overflow" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

## Focusing the Toolbar

The FloatingToolBar does not define a global shortcut for moving the focus to the toolbar. To add one, call the `focus()` client-side method, which focuses the first focusable tool. The following example focuses the toolbar when the user presses `Alt`+`W`.

```JavaScript
    $(document).on("keydown", function (e) {
        if (e.altKey && e.keyCode === 87) {
            $("#floatingtoolbar").data("kendoFloatingToolBar").focus();
        }
    });
```

## See Also

* [Accessibility in the FloatingToolBar]({% slug htmlhelpers_floatingtoolbar_accessibility %})
